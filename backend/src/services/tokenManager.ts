/**
 * TokenManager — OAuth2 Client Credentials token cache with stampede prevention.
 *
 * - Tokens are valid for 1 hour (3600s). We refresh 60s early as a buffer.
 * - Client Credentials flow does NOT use refresh tokens — we simply request
 *   a new token when the current one expires.
 * - Stampede prevention: if multiple requests call getToken() concurrently
 *   while the token is stale, only ONE HTTP request is made. All callers
 *   await the same in-flight promise.
 */

import axios from 'axios';
import { getQfConfig } from '../config/qfConfig';

interface TokenCache {
  token: string;
  expiresAt: number; // Unix ms
}

class TokenManager {
  private cache: TokenCache | null = null;
  private inFlight: Promise<string> | null = null;

  async getToken(): Promise<string> {
    // Serve from cache if still valid
    if (this.cache && Date.now() < this.cache.expiresAt) {
      return this.cache.token;
    }

    // Stampede prevention — reuse the in-flight request if one is already running
    if (this.inFlight) {
      return this.inFlight;
    }

    this.inFlight = this.fetchToken().finally(() => {
      this.inFlight = null;
    });

    return this.inFlight;
  }

  /** Force-evict the cached token (called on 401 upstream response) */
  evict(): void {
    this.cache = null;
  }

  private async fetchToken(): Promise<string> {
    const { clientId, clientSecret, authBaseUrl } = getQfConfig();

    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

    const response = await axios.post<{ access_token: string; expires_in: number }>(
      `${authBaseUrl}/oauth2/token`,
      'grant_type=client_credentials&scope=content',
      {
        headers: {
          Authorization: `Basic ${basicAuth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    const { access_token, expires_in } = response.data;

    // Cache with 60s buffer before actual expiry
    this.cache = {
      token: access_token,
      expiresAt: Date.now() + (expires_in - 60) * 1000,
    };

    return access_token;
  }
}

// Export a singleton instance
export const tokenManager = new TokenManager();
