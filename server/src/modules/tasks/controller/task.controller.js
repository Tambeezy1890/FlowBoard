import { ApiError } from "../../../util/ApiError.js";
import { asyncHandler } from "../../../util/fetch.js";
import Board from "../../boards/models/board.model.js";
import Task from "../models/task.model.js";

export const getTasks = asyncHandler(async (req, res, next) => {
  const { boardId } = req.params;
  const { column } = req.query;

  const filter = {
    board: boardId,
    createdBy: req.user._id,
  };

  if (column) {
    filter.column = column;
  }

  const tasks = await Task.find(filter).sort({ order: 1 });

  res.status(200).json({
    success: true,
    data: tasks,
  });
});
export const getTask = asyncHandler(async (req, res, next) => {
  const { boardId, taskId } = req.params;

  const task = await Task.findOne({
    _id: taskId,
    board: boardId,
    createdBy: req.user._id,
  });

  if (!task) {
    throw new ApiError(404, "Task not found");
  }

  return res.status(200).json({ success: true, data: task });
});
export const createTask = asyncHandler(async (req, res, next) => {
  const { boardId } = req.params;
  const {
    column,
    title,
    description = "",
    order,
    completed = false,
  } = req.body;

  if (!column || !title || order === undefined) {
    throw new ApiError(400, "Column, title and order are required");
  }

  const board = await Board.findOne({
    _id: boardId,
    team: req.user._id,
    "columns._id": column,
  });

  if (!board) {
    throw new ApiError(404, "Board or column not found");
  }

  const task = await Task.create({
    board: boardId,
    column,
    createdBy: req.user._id,
    title,
    description,
    order,
    completed,
  });

  res.status(201).json({
    success: true,
    data: task,
  });
});

export const updateTask = asyncHandler(async (req, res, next) => {
  const { boardId, taskId } = req.params;
  const { column } = req.body;
  const validFields = ["title", "description", "order", "completed"];
  const updatedFields = {};
  for (let field of validFields) {
    if (req.body[field] !== undefined) {
      updatedFields[field] = req.body[field];
    }
  }
  if (Object.keys(updatedFields).length === 0) {
    throw new ApiError(400, "No fields provided to update");
  }
  if (column) {
    const board = await Board.findOne({
      _id: boardId,
      team: req.user._id,
      "columns._id": column,
    });

    if (!board) {
      throw new ApiError(404, "Board or column not found");
    }
  }

  const updatedTask = await Task.findOneAndUpdate(
    {
      _id: taskId,
      board: boardId,
      column: column,
      createdBy: req.user._id,
    },
    {
      $set: updatedFields,
    },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );
  if (!updatedTask) {
    throw new ApiError(400, "Failed to update task");
  }
  return res.status(200).json({ success: true, data: updatedTask });
});

export const deleteTask = asyncHandler(async (req, res, next) => {
  const { boardId, taskId } = req.params;

  const deletedTask = await Task.findOneAndDelete({
    _id: taskId,
    board: boardId,
    createdBy: req.user._id,
  });
  if (!deletedTask) {
    throw new ApiError(400, "Failed to find task");
  }
  return res.status(200).json({ success: true, data: deletedTask });
});

export const moveTask = asyncHandler(async (req, res, next) => {
  const { boardId, taskId } = req.params;
  const { column, order } = req.body;

  if (!column || order === undefined) {
    throw new ApiError(400, "Column and order are required");
  }

  const board = await Board.findOne({
    _id: boardId,
    team: req.user._id,
    "columns._id": column,
  });

  if (!board) {
    throw new ApiError(404, "Board or column not found");
  }

  const movedTask = await Task.findOneAndUpdate(
    {
      _id: taskId,
      board: boardId,
      createdBy: req.user._id,
    },
    {
      $set: {
        column,
        order,
      },
    },
    {
      returnDocument: "after",
      runValidators: true,
    }
  );

  if (!movedTask) {
    throw new ApiError(404, "Task not found");
  }

  return res.status(200).json({
    success: true,
    data: movedTask,
  });
});
