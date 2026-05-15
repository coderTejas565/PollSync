import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/auth.routes.js";
import pollRoutes from "./modules/poll/poll.routes.js";
import responseRoutes from "./modules/response/response.routes.js";

const app = express();

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      process.env.PRODUCTION_CLIENT_URL,
    ],

    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({
    message: "PollSync API running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/polls", pollRoutes);
app.use("/api/responses", responseRoutes);

export default app;