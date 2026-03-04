/**
 * translationsRouter — proxies translation endpoints.
 *
 * Routes:
 *   GET /api/translations/list                                 → all available translations
 *   GET /api/translations/:translation_id/by_chapter/:chapter_number
 *   GET /api/translations/:translation_id/by_ayah/:ayah_key
 */

import { NextFunction, Request, Response, Router } from "express";
import { proxyClient } from "../middleware/authProxy";

export const translationsRouter = Router();

function forwardParams(req: Request): Record<string, unknown> {
  return { ...req.query };
}

// List all available translations
translationsRouter.get(
  "/list",
  async (req, res: Response, next: NextFunction) => {
    try {
      const { data } = await proxyClient.get("/resources/translations", {
        params: forwardParams(req),
      });
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
);

// Translation for a full chapter
translationsRouter.get(
  "/:translation_id/by_chapter/:chapter_number",
  async (req, res: Response, next: NextFunction) => {
    try {
      const { data } = await proxyClient.get(
        `/translations/${req.params.translation_id}/by_chapter/${req.params.chapter_number}`,
        { params: forwardParams(req) },
      );
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
);

// Translation for a single Āyah
translationsRouter.get(
  "/:translation_id/by_ayah/:ayah_key",
  async (req, res: Response, next: NextFunction) => {
    try {
      const { data } = await proxyClient.get(
        `/translations/${req.params.translation_id}/by_ayah/${req.params.ayah_key}`,
        { params: forwardParams(req) },
      );
      res.json(data);
    } catch (err) {
      next(err);
    }
  },
);
