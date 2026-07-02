import { Router } from "express";
import { protectMiddleware } from "../../../middleware/protect.js";
import {
  acceptInvite,
  createBoard,
  deleteBoard,
  getBoard,
  getBoards,
  sendInvite,
  updateBoard,
} from "../controller/board.controller.js";
import columnRoute from "./column.route.js";
import taskRoute from "../../tasks/route/task.route.js";

const boardRoute = Router();

boardRoute.use(protectMiddleware);

boardRoute.get("/boards", getBoards);
boardRoute.get("/boards/:id", getBoard);

boardRoute.post("/boards", createBoard);

boardRoute.patch("/boards/:id", updateBoard);
boardRoute.delete("/boards/:id", deleteBoard);

boardRoute.post("/boards/:boardId/invite", sendInvite);
boardRoute.post("/boards/:token/accept", acceptInvite);

boardRoute.use("/boards/:boardId/columns", columnRoute);
boardRoute.use("/boards/:boardId/tasks", taskRoute);

export default boardRoute;
