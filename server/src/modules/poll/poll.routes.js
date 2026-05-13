import { Router } from "express";

import { createPoll, getPublicPoll, getPollAnalytics, getMyPolls, publishPoll, getPublicResults } from "./poll.controller.js";

import { authMiddleware } from "../../common/middleware/auth.middleware.js";



const router = Router();


router.post("/",authMiddleware,createPoll);

router.get("/:pollId/analytics",authMiddleware,getPollAnalytics);

router.get("/me",authMiddleware,getMyPolls)

router.patch("/:pollId/publish",authMiddleware,publishPoll);

router.get("/:slug/results",getPublicResults)

router.get("/:slug", getPublicPoll);

export default router;