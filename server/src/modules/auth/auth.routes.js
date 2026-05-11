import router from "../poll/poll.routes.js";
import {
  signup,
  login,
  refreshAccessToken,
  logout,
} from "./auth.controller.js";
import { authMiddleware } from "../../common/middleware/auth.middleware.js";

router.get(
  "/me",
  authMiddleware,
  (req, res) => {
    res.json({
      success: true,
      user: req.user,
    });
  }
);

router.post("/signup", signup);
router.post("/login", login);

router.post("/refresh", refreshAccessToken);

router.post("/logout", logout);

export default router