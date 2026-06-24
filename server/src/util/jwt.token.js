import jwt from "jsonwebtoken";
import {
  EXPIRES_IN,
  JWT_SECRET,
  REFRESH_EXPIRES_IN,
  REFRESH_SECRET,
} from "../config/config";
export const generateTokensAndSendResponse = (user, res) => {
  const accessToken = jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: EXPIRES_IN,
  });

  const refreshToken = jwt.sign({ id: user._id }, REFRESH_SECRET, {
    expiresIn: REFRESH_EXPIRES_IN,
  });

  res.cookie("refresh-token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    accessToken,
    user: {
      id: user._id,
      email: user.email,
      name: user.username,
      createdAt: user.createdAt,
    },
  });
};
export const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, REFRESH_SECRET);
};
