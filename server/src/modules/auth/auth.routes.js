import { Router } from "express";
import prisma from "../../common/lib/prisma.js";

const router = Router();

router.get("/test-db", async (req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

export default router;