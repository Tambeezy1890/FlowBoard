import { ApiError } from "../../../util/ApiError.js";
import { asyncHandler } from "../../../util/fetch.js";
import {
  generateTokensAndSendResponse,
  verifyRefreshToken,
} from "../../../util/jwt.token.js";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
export const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password, username } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    throw new ApiError(400, "User already exists");
  }

  const newUser = await User.create({ email, password, username });

  return res.status(201).json({ success: true, message: "User created" });
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "Invalid credentials");
  }
  const verifyPassword = await bcrypt.compare(password, user.password);
  if (!verifyPassword) {
    throw new ApiError(400, "Invalid credentials");
  }
  return generateTokensAndSendResponse(user, res);
});

export const getUser = asyncHandler(async (req, res, next) => {
  const user = req.user;
  return res.status(200).json({
    success: true,
    user: {
      email: user.email,
      name: user.username,
      createdAt: user.createdAt,
    },
  });
});

export const generateNewAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies?.["refresh-token"];

  if (!refreshToken) {
    throw new ApiError(401, "Refresh token missing");
  }

  const decoded = verifyRefreshToken(refreshToken);

  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new ApiError(401, "Invalid refresh token");
  }

  return generateTokensAndSendResponse(user, res);
});
