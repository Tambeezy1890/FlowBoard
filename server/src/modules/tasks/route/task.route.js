import { Router } from "express";
import { protectMiddleware } from "../../../middleware/protect.js";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  moveTask,
  updateTask,
} from "../controller/task.controller.js";

const taskRoute = Router({ mergeParams: true });
taskRoute.use(protectMiddleware);

taskRoute.get("/:taskId", getTask);
taskRoute.get("/", getTasks);
taskRoute.post("/", createTask);
taskRoute.patch("/:taskId", updateTask);
taskRoute.patch("/:taskId/move", moveTask);
taskRoute.delete("/:taskId", deleteTask);

export default taskRoute;
