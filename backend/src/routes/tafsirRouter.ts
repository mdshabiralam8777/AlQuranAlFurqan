/**
 * tafsirRouter — proxies Tafsir (exegesis) endpoints.
 *
 * Routes:
 *   GET /api/tafsir/list                            → all available tafsirs
 *   GET /api/tafsir/:tafsir_id/by_ayah/:ayah_key
 *   GET /api/tafsir/:tafsir_id/by_chapter/:chapter_number
 */

import { Router, Request, Response, NextFunction } from 'express';
import { proxyClient } from '../middleware/authProxy';

export const tafsirRouter = Router();

function forwardParams(req: Request): Record<string, unknown> {
  return { ...req.query };
}

// List all available tafsirs
tafsirRouter.get('/list', async (req, res: Response, next: NextFunction) => {
  try {
    const { data } = await proxyClient.get('/resources/tafsirs', {
      params: forwardParams(req),
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// Tafsir for a single Āyah
tafsirRouter.get(
  '/:tafsir_id/by_ayah/:ayah_key',
  async (req, res: Response, next: NextFunction) => {
    try {
      const { data } = await proxyClient.get(
        `/quran/tafsirs/${req.params.tafsir_id}/by_ayah/${req.params.ayah_key}`,
        { params: forwardParams(req) },
      );
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
);

// Tafsir for a full chapter
tafsirRouter.get(
  '/:tafsir_id/by_chapter/:chapter_number',
  async (req, res: Response, next: NextFunction) => {
    try {
      const { data } = await proxyClient.get(
        `/quran/tafsirs/${req.params.tafsir_id}/by_chapter/${req.params.chapter_number}`,
        { params: forwardParams(req) },
      );
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
);
