import { ApiError } from "../../../util/ApiError.js";
import { asyncHandler } from "../../../util/fetch.js";
import { verifyAccessToken } from "../../../util/jwt.token.js";
import Team from "../models/user.model.js";

export const protectMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  let token;

  if (authHeader?.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Missing access token");
  }

  const decoded = verifyAccessToken(token);

  const user = await Team.findById(decoded.id).select("-password");

  if (!user) {
    throw new ApiError(401, "Invalid or stolen token");
  }

  req.user = user;
  next();
});
