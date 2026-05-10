import { Router } from "express";

const router = Router();

router.get("/test", (req, res) => {
  res.json({
    message: "Poll route working",
  });
});

export default router;