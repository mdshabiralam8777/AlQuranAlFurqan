/**
 * index.ts — Express app entry point for the Al Quran Al Furqan backend proxy.
 *
 * Startup order:
 *  1. Load .env
 *  2. Validate credentials via getQfConfig() — throws if missing
 *  3. Mount all routers under /api
 *  4. Register error handler as final middleware
 *  5. Listen on PORT
 */

import cors from "cors";
import "dotenv/config";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { getQfConfig } from "./config/qfConfig";
import { errorHandler } from "./middleware/errorHandler";
import { audioRouter } from "./routes/audioRouter";
import { chaptersRouter } from "./routes/chaptersRouter";
import { tafsirRouter } from "./routes/tafsirRouter";
import { translationsRouter } from "./routes/translationsRouter";
import { userRouter } from "./routes/userRouter";
import { versesRouter } from "./routes/versesRouter";

// Validate credentials on startup — fails fast with a clear error
const config = getQfConfig();
console.log(`🕌  Al Quran Al Furqan Backend — env: ${config.env}`);
console.log(`🔗  API base: ${config.apiBaseUrl}`);

const app = express();

// ─── Global Middleware ──────────────────────────────────────────────────────
app.use(helmet());
app.use(
  cors({
    // In production, lock this down to your mobile app's domain / Expo tunnel URL
    origin: "*",
    methods: ["GET"],
  }),
);
app.use(morgan("dev"));
app.use(express.json());

// ─── Health Check ────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ success: true, status: "ok", env: config.env });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use("/api/chapters", chaptersRouter);
app.use("/api/verses", versesRouter);
app.use("/api/audio", audioRouter);
app.use("/api/tafsir", tafsirRouter);
app.use("/api/translations", translationsRouter);
app.use("/api/user", userRouter);

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: { code: "NOT_FOUND", message: "Route not found." },
  });
});

// ─── Centralized Error Handler (must be last) ─────────────────────────────────
app.use(errorHandler);

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = parseInt(process.env.PORT ?? "3001", 10);
const HOST = "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`✅  Backend proxy running on http://${HOST}:${PORT}`);
  console.log(`   • GET /health`);
  console.log(`   • GET /api/chapters`);
  console.log(`   • GET /api/verses/by_chapter/:id`);
  console.log(`   • GET /api/audio/reciters`);
  console.log(`   • GET /api/tafsir/list`);
  console.log(`   • GET /api/translations/list`);
  console.log(`   • ALL /api/user/* → 501 Not Implemented`);
});
