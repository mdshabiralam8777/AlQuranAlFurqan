/**
 * qfConfig — reads env vars and returns typed config for the Quran Foundation API.
 *
 * Environment variables:
 *   QF_CLIENT_ID      — OAuth2 client ID
 *   QF_CLIENT_SECRET  — OAuth2 client secret (server-side only, never log)
 *   QF_ENV            — 'prelive' | 'production' (default: 'prelive')
 */

import "dotenv/config";

type QfEnv = "prelive" | "production";

interface QfConfig {
  env: QfEnv;
  clientId: string;
  clientSecret: string;
  authBaseUrl: string;
  apiBaseUrl: string;
}

const ENV_URLS: Record<QfEnv, { authBaseUrl: string; apiBaseUrl: string }> = {
  prelive: {
    authBaseUrl: "https://prelive-oauth2.quran.foundation",
    // NOTE: The Content API requires the /content/api/v4 prefix on the prelive host.
    apiBaseUrl: "https://apis-prelive.quran.foundation/content/api/v4",
  },
  production: {
    authBaseUrl: "https://oauth2.quran.foundation",
    apiBaseUrl: "https://apis.quran.foundation/content/api/v4",
  },
};

let _config: QfConfig | null = null;

export function getQfConfig(): QfConfig {
  if (_config) return _config;

  const clientId = process.env.QF_CLIENT_ID;
  const clientSecret = process.env.QF_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error(
      "Missing Quran Foundation API credentials. Request access: https://api-docs.quran.foundation/request-access",
    );
  }

  const rawEnv = process.env.QF_ENV ?? "prelive";
  const env: QfEnv = rawEnv === "production" ? "production" : "prelive";

  _config = {
    env,
    clientId,
    clientSecret,
    ...ENV_URLS[env],
  };

  return _config;
}
