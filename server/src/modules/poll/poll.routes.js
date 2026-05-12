import { Router } from "express";

import { createPoll } from "./poll.controller.js";

import { authMiddleware } from "../../common/middleware/auth.middleware.js";

import { getPublicPoll } from "./poll.controller.js";


const router = Router();


router.post("/create",authMiddleware,createPoll);

router.get("/:slug", getPublicPoll);

export default router;