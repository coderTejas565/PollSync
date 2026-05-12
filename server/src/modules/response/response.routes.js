import { Router } from "express";

import { submitResponse } from "./response.controller.js";

import { optionalAuthMiddleware } from "../../common/middleware/optionalAuth.middleware.js";

const router = Router();

router.post(
  "/:pollId",
  optionalAuthMiddleware,
  submitResponse
);

export default router;