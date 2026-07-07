import { io } from "../../../../server.js";
import { ApiError } from "../../../util/ApiError.js";
import { asyncHandler } from "../../../util/fetch.js";
import Board from "../../boards/models/board.model.js";
import Task from "../models/task.model.js";

export const getTasks = asyncHandler(async (req, res, next) => {
  const { boardId } = req.params;
  const { column } = req.query;

  const filter = {
    board: boardId,
  };

  if (column) {
    filter.column = column;
  }

  const tasks = await Task.find(filter).populate(
    "createdBy",
    "username avatarColor avatarUrl"
  );

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
  }).populate("createdBy", "username avatarColor avatarUrl");

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
    $or: [{ owner: req.user._id }, { members: req.user._id }],
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
  const populatedTask = await Task.findById(task._id).populate(
    "createdBy",
    "username avatarColor avatarUrl"
  );
  io.to(boardId).emit("task:create", {
    boardId,
    task: populatedTask,
  });
  io.to(boardId).emit("notification:new", {
    type: "task:create",
    message: `${req.user.username} created a new task`,
    boardId,
    senderId: req.user._id.toString(),
    createdAt: new Date(),
  });
  res.status(201).json({
    success: true,
    data: populatedTask,
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
      $or: [{ owner: req.user._id }, { members: req.user._id }],
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
    },
    {
      $set: updatedFields,
    },
    {
      returnDocument: "after",
      runValidators: true,
    }
  ).populate("createdBy", "username avatarColor avatarUrl");
  if (!updatedTask) {
    throw new ApiError(400, "Failed to update task");
  }

  io.to(boardId).emit("task:update", {
    boardId,
    task: updatedTask,
  });
  io.to(boardId).emit("notification:new", {
    type: "task:update",
    message: `${req.user.username} updated a task`,
    boardId,
    senderId: req.user._id.toString(),
    createdAt: new Date(),
  });
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
  io.to(boardId).emit("task:delete", {
    boardId,
    task: deletedTask,
  });
  io.to(boardId).emit("notification:new", {
    type: "task:delete",
    message: `${req.user.username} deleted a task`,
    boardId,
    senderId: req.user._id.toString(),
    createdAt: new Date(),
  });
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
    $or: [{ owner: req.user._id }, { members: req.user._id }],
    "columns._id": column,
  });

  if (!board) {
    throw new ApiError(404, "Board or column not found");
  }

  const movedTask = await Task.findOneAndUpdate(
    {
      _id: taskId,
      board: boardId,
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
  ).populate("createdBy", "username avatarColor avatarUrl");

  if (!movedTask) {
    throw new ApiError(404, "Task not found");
  }
  io.to(boardId).emit("task:move", {
    boardId,
    task: movedTask,
  });
  io.to(boardId).emit("notification:new", {
    type: "task:move",
    message: `${req.user.username} moved a task`,
    boardId,
    senderId: req.user._id.toString(),
    createdAt: new Date(),
  });
  return res.status(200).json({
    success: true,
    data: movedTask,
  });
});
