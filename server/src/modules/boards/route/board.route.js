import { Router } from "express";
import { protectMiddleware } from "../../../middleware/protect.js";
import {
  createBoard,
  deleteBoard,
  getBoard,
  getBoards,
  updateBoard,
} from "../controller/board.controller.js";
import columnRoute from "./column.route.js";

const boardRoute = Router();

boardRoute.use(protectMiddleware);

boardRoute.get("/boards", getBoards);
boardRoute.get("/boards/:id", getBoard);

boardRoute.post("/boards", createBoard);

boardRoute.patch("/boards/:id", updateBoard);
boardRoute.delete("/boards/:id", deleteBoard);

boardRoute.use("/boards/:boardId/columns", columnRoute);

export default boardRoute;
