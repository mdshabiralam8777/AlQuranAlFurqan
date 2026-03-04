/**
 * audioRouter — proxies audio recitation endpoints.
 *
 * Routes:
 *   GET /api/audio/reciters
 *   GET /api/audio/recitations
 *   GET /api/audio/recitations/:recitation_id/by_chapter/:chapter_number
 *   GET /api/audio/recitations/:recitation_id/by_ayah/:ayah_key
 *   GET /api/audio/chapter/:chapter_id/reciter/:reciter_id   (chapter-level audio file)
 */

import { Router, Request, Response, NextFunction } from 'express';
import { proxyClient } from '../middleware/authProxy';

export const audioRouter = Router();

function forwardParams(req: Request): Record<string, unknown> {
  return { ...req.query };
}

// List all reciters (verse-by-verse)
audioRouter.get('/reciters', async (req, res: Response, next: NextFunction) => {
  try {
    const { data } = await proxyClient.get('/resources/recitations', {
      params: forwardParams(req),
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// List recitation styles
audioRouter.get('/recitations', async (req, res: Response, next: NextFunction) => {
  try {
    const { data } = await proxyClient.get('/resources/recitations', {
      params: forwardParams(req),
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

// Verse-by-verse audio files for a full chapter
audioRouter.get(
  '/recitations/:recitation_id/by_chapter/:chapter_number',
  async (req, res: Response, next: NextFunction) => {
    try {
      const { data } = await proxyClient.get(
        `/recitations/${req.params.recitation_id}/by_chapter/${req.params.chapter_number}`,
        { params: forwardParams(req) },
      );
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
);

// Verse-by-verse audio for a single Āyah
audioRouter.get(
  '/recitations/:recitation_id/by_ayah/:ayah_key',
  async (req, res: Response, next: NextFunction) => {
    try {
      const { data } = await proxyClient.get(
        `/recitations/${req.params.recitation_id}/by_ayah/${req.params.ayah_key}`,
        { params: forwardParams(req) },
      );
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
);

// Full chapter audio file (single MP3 per reciter)
audioRouter.get(
  '/chapter/:chapter_id/reciter/:reciter_id',
  async (req, res: Response, next: NextFunction) => {
    try {
      const { data } = await proxyClient.get(
        `/chapter_recitations/${req.params.reciter_id}/${req.params.chapter_id}`,
        { params: forwardParams(req) },
      );
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
);
