import { Router } from "express";
import {
  createColumn,
  deleteColumn,
  updateColumn,
} from "../controller/column.controller.js";

const columnRoute = Router({ mergeParams: true });

columnRoute.post("/", createColumn);
columnRoute.patch("/:columnId", updateColumn);
columnRoute.delete("/:columnId", deleteColumn);

export default columnRoute;
