/**
 * versesRouter — proxies verse (Āyah) endpoints.
 * Passes all query params (words, translations, tafsirs, page, per_page, etc.)
 * directly through to the upstream API.
 *
 * Routes:
 *   GET /api/verses/by_chapter/:chapter_number
 *   GET /api/verses/by_juz/:juz_number
 *   GET /api/verses/by_page/:page_number
 *   GET /api/verses/by_hizb/:hizb_number
 *   GET /api/verses/by_key/:verse_key        (e.g. 2:255)
 *   GET /api/verses/random
 */

import { Router, Request, Response, NextFunction } from 'express';
import { proxyClient } from '../middleware/authProxy';

export const versesRouter = Router();

/** Helper — forward all query params to the upstream request */
function forwardParams(req: Request): Record<string, unknown> {
  return { ...req.query };
}

versesRouter.get('/by_chapter/:chapter_number', async (req, res: Response, next: NextFunction) => {
  try {
    const { data } = await proxyClient.get(
      `/verses/by_chapter/${req.params.chapter_number}`,
      { params: forwardParams(req) },
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
});

versesRouter.get('/by_juz/:juz_number', async (req, res: Response, next: NextFunction) => {
  try {
    const { data } = await proxyClient.get(
      `/verses/by_juz/${req.params.juz_number}`,
      { params: forwardParams(req) },
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
});

versesRouter.get('/by_page/:page_number', async (req, res: Response, next: NextFunction) => {
  try {
    const { data } = await proxyClient.get(
      `/verses/by_page/${req.params.page_number}`,
      { params: forwardParams(req) },
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
});

versesRouter.get('/by_hizb/:hizb_number', async (req, res: Response, next: NextFunction) => {
  try {
    const { data } = await proxyClient.get(
      `/verses/by_hizb/${req.params.hizb_number}`,
      { params: forwardParams(req) },
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
});

versesRouter.get('/by_key/:verse_key', async (req, res: Response, next: NextFunction) => {
  try {
    const { data } = await proxyClient.get(
      `/verses/by_key/${req.params.verse_key}`,
      { params: forwardParams(req) },
    );
    res.json(data);
  } catch (err) {
    next(err);
  }
});

versesRouter.get('/random', async (req, res: Response, next: NextFunction) => {
  try {
    const { data } = await proxyClient.get('/verses/random', {
      params: forwardParams(req),
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});
