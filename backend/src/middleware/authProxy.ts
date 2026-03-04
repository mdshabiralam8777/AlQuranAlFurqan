/**
 * authProxy — creates an axios instance that transparently injects
 * the OAuth2 Bearer token and handles 401 with a single token eviction + retry.
 */

import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import { getQfConfig } from "../config/qfConfig";
import { tokenManager } from "../services/tokenManager";

export function createAuthProxyClient(): AxiosInstance {
  const { apiBaseUrl } = getQfConfig();

  const client = axios.create({
    baseURL: apiBaseUrl,
    timeout: 15_000,
  });

  // Request interceptor — inject x-auth-token + x-client-id
  // NOTE: The Quran Foundation API does NOT use Authorization: Bearer.
  // It requires x-auth-token (the OAuth2 access token) and x-client-id.
  client.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const { clientId } = getQfConfig();
      const token = await tokenManager.getToken();
      config.headers["x-auth-token"] = token;
      config.headers["x-client-id"] = clientId;
      return config;
    },
  );

  // Response interceptor — on 401/403, evict token and retry ONCE
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retried?: boolean;
      };

      if (
        (error.response?.status === 401 || error.response?.status === 403) &&
        !originalRequest._retried
      ) {
        originalRequest._retried = true;
        tokenManager.evict();
        const { clientId } = getQfConfig();
        const freshToken = await tokenManager.getToken();
        originalRequest.headers["x-auth-token"] = freshToken;
        originalRequest.headers["x-client-id"] = clientId;
        return client(originalRequest);
      }

      return Promise.reject(error);
    },
  );

  return client;
}

// Shared singleton client — all routes use this
export const proxyClient = createAuthProxyClient();
