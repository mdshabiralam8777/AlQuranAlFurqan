/**
 * chaptersRouter — proxies Quran chapter (Surah) endpoints.
 *
 * Routes:
 *   GET /api/chapters          → list all 114 Surahs
 *   GET /api/chapters/:id      → single Surah by number
 *   GET /api/chapters/:id/info → extended info / introduction text
 */

import { Router, Request, Response, NextFunction } from 'express';
import { proxyClient } from '../middleware/authProxy';

export const chaptersRouter = Router();

// GET /api/chapters
chaptersRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data } = await proxyClient.get('/chapters', {
      params: { language: req.query.language ?? 'en' },
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/chapters/:id
chaptersRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data } = await proxyClient.get(`/chapters/${req.params.id}`, {
      params: { language: req.query.language ?? 'en' },
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// GET /api/chapters/:id/info
chaptersRouter.get('/:id/info', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data } = await proxyClient.get(`/chapters/${req.params.id}/info`, {
      params: { language: req.query.language ?? 'en' },
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});
