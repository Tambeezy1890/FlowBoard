import { ApiError } from "../../../util/ApiError.js";
import { asyncHandler } from "../../../util/fetch.js";
import Board from "../models/board.model.js";

export const updateColumn = asyncHandler(async (req, res) => {
  const { boardId, columnId } = req.params;
  const { title, order } = req.body;

  const updates = {};
  if (title !== undefined) updates["columns.$.title"] = title;
  if (order !== undefined) updates["columns.$.order"] = order;

  if (Object.keys(updates).length === 0) {
    throw new ApiError(400, "No valid fields provided");
  }

  const updatedBoard = await Board.findOneAndUpdate(
    {
      _id: boardId,
      team: req.user._id,
      "columns._id": columnId,
    },
    { $set: updates },
    {
      runValidators: true,
      new: true,
    }
  );

  if (!updatedBoard) {
    throw new ApiError(404, "Board or column not found");
  }

  res.status(200).json({ success: true, data: updatedBoard });
});
export const deleteColumn = asyncHandler(async (req, res, next) => {
  const { boardId, columnId } = req.params;
  const { title, order } = req.body;
  const deletedColumn = await Board.findOneAndUpdate(
    {
      _id: boardId,
      team: req.user._id,
    },
    {
      $pull: {
        columns: {
          _id: columnId,
        },
      },
    },
    { new: true }
  );
  if (!deletedColumn) {
    throw new ApiError(404, "Board not found");
  }
  return res
    .status(200)
    .json({ success: true, message: "Column deleted successfully" });
});
export const createColumn = asyncHandler(async (req, res, next) => {
  const { title, order } = req.body;
  const { boardId } = req.params;

  const created = await Board.findOneAndUpdate(
    {
      _id: boardId,
      team: req.user._id,
    },
    {
      $push: {
        columns: {
          title,
          order,
        },
      },
    },
    { new: true, runValidators: true }
  );
  if (!created) {
    throw new ApiError(404, "Board not found");
  }

  res.status(201).json({
    success: true,
    data: created,
  });
});
