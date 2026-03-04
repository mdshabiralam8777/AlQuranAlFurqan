/**
 * errorHandler — centralized Express error middleware.
 * Converts upstream axios errors and application errors into a
 * standardized JSON response shape.
 *
 * Error shape:
 * {
 *   "success": false,
 *   "error": {
 *     "code": "UPSTREAM_ERROR",
 *     "message": "...",
 *     "upstreamStatus": 404   // only present for upstream failures
 *   }
 * }
 */

import { Request, Response, NextFunction } from 'express';
import { AxiosError } from 'axios';

export interface AppError extends Error {
  statusCode?: number;
  code?: string;
}

export function errorHandler(
  err: AppError | AxiosError,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  // Handle axios upstream errors
  if ((err as AxiosError).isAxiosError) {
    const axiosErr = err as AxiosError;
    const upstreamStatus = axiosErr.response?.status ?? 502;

    res.status(upstreamStatus >= 500 ? 502 : upstreamStatus).json({
      success: false,
      error: {
        code: 'UPSTREAM_ERROR',
        message: 'Upstream API request failed.',
        upstreamStatus,
      },
    });
    return;
  }

  // Handle known application errors
  const statusCode = (err as AppError).statusCode ?? 500;
  const code = (err as AppError).code ?? 'INTERNAL_ERROR';

  res.status(statusCode).json({
    success: false,
    error: {
      code,
      message: err.message ?? 'An unexpected error occurred.',
    },
  });
}
