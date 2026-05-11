import { Router } from "express";

import { createPoll } from "./poll.controller.js";

import { authMiddleware } from "../../common/middleware/auth.middleware.js";

const router = Router();

router.post("/create",authMiddleware,createPoll);

export default router;