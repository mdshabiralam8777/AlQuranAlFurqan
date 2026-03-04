/**
 * userRouter — User-related API stubs.
 * All routes return 501 Not Implemented until OAuth2 user auth is wired (Phase 6).
 */

import { Router, Request, Response } from 'express';

export const userRouter = Router();

const NOT_IMPLEMENTED = {
  success: false,
  error: {
    code: 'NOT_IMPLEMENTED',
    message: 'User APIs require user authentication (Phase 6). Coming soon.',
  },
};

userRouter.all('*', (_req: Request, res: Response) => {
  res.status(501).json(NOT_IMPLEMENTED);
});
