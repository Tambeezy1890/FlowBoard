import { io } from "../../../../server.js";
import { ApiError } from "../../../util/ApiError.js";
import { asyncHandler } from "../../../util/fetch.js";
import Board from "../models/board.model.js";
import crypto from "crypto";
export const getBoard = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const board = await Board.findOne({
    _id: id,
    owner: req.user._id,
    members: req.user._id,
  });

  if (!board) {
    throw new ApiError(404, "Board not found");
  }

  res.status(200).json({ success: true, data: board });
});

export const getBoards = asyncHandler(async (req, res) => {
  const boards = await Board.find({
    $or: [{ owner: req.user._id }, { members: req.user._id }],
  });

  res.status(200).json({ success: true, data: boards });
});

export const createBoard = asyncHandler(async (req, res) => {
  const { title, columns } = req.body;

  const newBoard = await Board.create({
    owner: req.user._id,
    members: req.user._id,
    title,
    columns,
  });

  res.status(201).json({
    success: true,
    data: newBoard,
  });
});

export const updateBoard = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const allowedFields = ["title", "columns"];
  const fields = {};

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      fields[field] = req.body[field];
    }
  }

  if (Object.keys(fields).length === 0) {
    throw new ApiError(400, "No valid fields provided");
  }

  const board = await Board.findOneAndUpdate(
    { _id: id, owner: req.user._id },
    { $set: fields },
    { returnDocument: "after", runValidators: true }
  );

  if (!board) {
    throw new ApiError(404, "Board not found");
  }
  io.to(id).emit("board:update", {
    boardId: id,
    board: board,
  });
  res.status(200).json({
    success: true,
    data: board,
  });
});

export const deleteBoard = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const board = await Board.findOneAndDelete({
    _id: id,
    owner: req.user._id,
  });

  if (!board) {
    throw new ApiError(404, "Board not found");
  }

  res.status(200).json({
    success: true,
    message: "Board deleted successfully",
  });
});

export const sendInvite = asyncHandler(async (req, res, next) => {
  const { boardId } = req.params;

  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const board = await Board.findOneAndUpdate(
    {
      _id: boardId,
      owner: req.user._id,
    },
    {
      inviteToken: hashedToken,
      inviteTokenExpires: Date.now() + 1000 * 60 * 60 * 24,
    },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
  if (!board) {
    throw new ApiError(400, "Failed to find board or verify user");
  }
  const url = `http://localhost:5173/dashboard/${token}/accept`;
  return res.status(200).json({
    success: true,
    url: url,
  });
});
export const acceptInvite = asyncHandler(async (req, res, next) => {
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const board = await Board.findOneAndUpdate(
    {
      inviteToken: hashedToken,
      inviteTokenExpires: { $gt: Date.now() },
      owner: { $ne: req.user._id },
    },
    {
      $addToSet: {
        members: req.user._id,
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
  if (!board) {
    throw new ApiError(400, "Failed to add member to board");
  }
  io.to(board._id).emit("member:joined");
  return res
    .status(200)
    .json({ success: true, message: "Added to the group", board: board });
});
