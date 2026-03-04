# Implementation Plan — Express Backend Proxy
## Al Quran Al Furqan

### Goal

Stand up a production-ready, TypeScript Express server that:

1. Securely authenticates with the Quran Foundation API (OAuth2 Client Credentials, pre-prod).
2. Caches and auto-refreshes the Bearer token (1-hour TTL) — including stampede prevention.
3. Exposes a clean `/api/*` proxy that the React Native app calls directly.
4. Covers **Content APIs v4** and stubbed **User-related API v1** routes (no user auth/login yet).

> ⚠️ **Client Secret never touches the mobile bundle.** The app only speaks to `http://localhost:3001/api/*` (dev) or the deployed proxy URL. The secret lives in `.env` on the server only.

---

## API Reference

|                    | Pre-Production                                                           |
| ------------------ | ------------------------------------------------------------------------ |
| OAuth2             | `https://prelive-oauth2.quran.foundation`                                |
| API Base           | `https://apis-prelive.quran.foundation`                                  |
| Token lifetime     | 3600 s (1 hour) — no refresh token; re-request when expired              |
| Token endpoint     | `POST /oauth2/token` with `grant_type=client_credentials&scope=content`  |
| Auth header format | `Authorization: Bearer <token>`                                          |
| Client ID          | `5066601d-8301-4b5b-a1e4-45caf11e34af`                                   |
| Client Secret      | stored in `.env` only — never commit                                     |

---

## Backend Directory Structure (`backend/`)

> This is a **new directory** inside the existing monorepo. It runs as a separate `npm` workspace / process — completely independent from the Expo app.

```
backend/
├── src/
│   ├── config/
│   │   └── qfConfig.ts           # Env-driven config: clientId, secret, baseURLs
│   ├── services/
│   │   └── tokenManager.ts       # OAuth2 token cache + stampede prevention
│   ├── routes/
│   │   ├── chaptersRouter.ts     # /api/chapters
│   │   ├── versesRouter.ts       # /api/verses
│   │   ├── audioRouter.ts        # /api/audio
│   │   ├── tafsirRouter.ts       # /api/tafsir
│   │   ├── translationsRouter.ts # /api/translations
│   │   └── userRouter.ts         # /api/user/* (stubbed — future auth)
│   ├── middleware/
│   │   ├── authProxy.ts          # Attaches Bearer token to outgoing requests
│   │   └── errorHandler.ts       # Standardized error responses
│   └── index.ts                  # App entry: Express init, route mounting, listen
├── .env.example
├── .env                          # gitignored
├── package.json
└── tsconfig.json
```

---

## File-by-File Breakdown

### `backend/src/config/qfConfig.ts`
- Reads `QF_CLIENT_ID`, `QF_CLIENT_SECRET`, `QF_ENV` (`prelive` | `production`) from `process.env`.
- Exports `getQfConfig()` returning `{ env, clientId, clientSecret, authBaseUrl, apiBaseUrl }`.
- Throws with an explicit error message if credentials are missing on startup.

### `backend/src/services/tokenManager.ts`
- `TokenManager` singleton with **stampede prevention** (in-flight promise is reused if multiple requests hit refresh concurrently).
- Caches token + expiry: `expiresAt = Date.now() + (expires_in - 60) * 1000` (60s buffer).
- Exposes `getToken(): Promise<string>`.
- Token request: `POST /oauth2/token` with `grant_type=client_credentials&scope=content` via HTTP Basic auth.

### `backend/src/middleware/authProxy.ts`
- `axios` instance that injects `Authorization: Bearer <token>` on every outgoing request.
- Handles `401` → evicts token + one retry before propagating the error.

### `backend/src/routes/chaptersRouter.ts`
| Proxy Route | Upstream |
|---|---|
| `GET /api/chapters` | `GET /chapters` |
| `GET /api/chapters/:id` | `GET /chapters/:id` |
| `GET /api/chapters/:id/info` | `GET /chapters/:id/info` |

### `backend/src/routes/versesRouter.ts`
| Proxy Route | Notes |
|---|---|
| `GET /api/verses/by_chapter/:chapter_number` | Supports query params: `words`, `translations`, `tafsirs`, `page`, `per_page` |
| `GET /api/verses/by_juz/:juz_number` | |
| `GET /api/verses/by_page/:page_number` | |
| `GET /api/verses/by_key/:verse_key` | e.g. `2:255` |
| `GET /api/verses/random` | |

### `backend/src/routes/audioRouter.ts`
| Proxy Route | Notes |
|---|---|
| `GET /api/audio/reciters` | List all reciters |
| `GET /api/audio/recitations` | List recitation styles |
| `GET /api/audio/recitations/:recitation_id/by_chapter/:chapter_number` | Full chapter audio |
| `GET /api/audio/recitations/:recitation_id/by_ayah/:ayah_key` | Single ayah audio |

### `backend/src/routes/tafsirRouter.ts`
| Proxy Route | Notes |
|---|---|
| `GET /api/resources/tafsirs` | List all available tafsirs |
| `GET /api/quran/tafsirs/:tafsir_id/by_ayah/:ayah_key` | |
| `GET /api/quran/tafsirs/:tafsir_id/by_chapter/:chapter_number` | |

### `backend/src/routes/translationsRouter.ts`
| Proxy Route | Notes |
|---|---|
| `GET /api/resources/translations` | List all available translations |
| `GET /api/quran/translations/:translation_id/by_chapter/:chapter_number` | |
| `GET /api/quran/translations/:translation_id/by_ayah/:ayah_key` | |

### `backend/src/routes/userRouter.ts`
All routes return `501 Not Implemented` for now:
```json
{
  "success": false,
  "error": {
    "code": "NOT_IMPLEMENTED",
    "message": "User APIs require authentication (Phase 6)."
  }
}
```

### `backend/src/middleware/errorHandler.ts`
Standardized error shape across all routes:
```json
{
  "success": false,
  "error": { "code": "UPSTREAM_ERROR", "message": "...", "upstreamStatus": 404 }
}
```

### `backend/src/index.ts`
- Express app with `cors`, `helmet`, `morgan`, `express.json()`.
- Mounts all routers under `/api`.
- Registers `errorHandler` as the final middleware.
- Listens on `PORT` env var (default `3001`).

---

## Environment Variables

### `backend/.env.example`
```env
QF_CLIENT_ID=your_client_id
QF_CLIENT_SECRET=your_client_secret
QF_ENV=prelive
PORT=3001
```

### Mobile App `.env.local`
```env
EXPO_PUBLIC_API_BASE_URL=http://localhost:3001/api
```
> ⚠️ For physical device testing, replace `localhost` with your machine's LAN IP: `http://192.168.x.x:3001/api`

---

## Verification (Manual curl)

After `cd backend && npm run dev`:

```bash
# All 114 Surahs
curl http://localhost:3001/api/chapters | jq '.chapters | length'
# → 114

# Single Surah
curl http://localhost:3001/api/chapters/1 | jq '.chapter.name_arabic'
# → "الفاتحة"

# Verses for Al-Fatiha
curl "http://localhost:3001/api/verses/by_chapter/1?words=true" | jq '.verses | length'
# → 7

# Audio reciters
curl http://localhost:3001/api/audio/reciters | jq '.[0]'

# User stub (expect 501)
curl http://localhost:3001/api/user/bookmarks
# → { "success": false, "error": { "code": "NOT_IMPLEMENTED" } }
```

---

## npm Scripts (inside `backend/`)

```bash
npm run dev     # ts-node-dev with hot reload
npm run build   # tsc → dist/
npm start       # node dist/index.js
npm test        # jest
```
