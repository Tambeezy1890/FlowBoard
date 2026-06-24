import { Router } from "express";
import {
  generateNewAccessToken,
  getUser,
  loginUser,
  registerUser,
} from "../controller/auth.controller.js";
import { protectMiddleware } from "../middleware/protect.js";

const authRoute = Router();

authRoute.post("/login", loginUser);
authRoute.post("/register", registerUser);
authRoute.get("/user", protectMiddleware, getUser);
authRoute.post("/generate-token", protectMiddleware, generateNewAccessToken);
export default authRoute;
