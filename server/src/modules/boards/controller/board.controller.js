import { ApiError } from "../../../util/ApiError.js";
import { asyncHandler } from "../../../util/fetch.js";
import Board from "../models/board.model.js";
export const getBoard = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const board = await Board.findOne({
    _id: id,
    team: req.user._id,
  });

  if (!board) {
    throw new ApiError(404, "Board not found");
  }

  res.status(200).json({ success: true, data: board });
});

export const getBoards = asyncHandler(async (req, res) => {
  const boards = await Board.find({ team: req.user._id });

  res.status(200).json({ success: true, data: boards });
});

export const createBoard = asyncHandler(async (req, res) => {
  const { title, columns } = req.body;

  const newBoard = await Board.create({
    team: req.user._id,
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
    { _id: id, team: req.user._id },
    { $set: fields },
    { new: true, runValidators: true }
  );

  if (!board) {
    throw new ApiError(404, "Board not found");
  }

  res.status(200).json({
    success: true,
    data: board,
  });
});

export const deleteBoard = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const board = await Board.findOneAndDelete({
    _id: id,
    team: req.user._id,
  });

  if (!board) {
    throw new ApiError(404, "Board not found");
  }

  res.status(200).json({
    success: true,
    message: "Board deleted successfully",
  });
});
