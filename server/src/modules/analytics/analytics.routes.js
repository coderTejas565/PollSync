import { Router } from "express";

import { getPollAnalytics } from "./analytics.controller.js";

import { authMiddleware } from "../../common/middleware/auth.middleware.js";


router.get("/:pollId/analytics",authMiddleware,getPollAnalytics);