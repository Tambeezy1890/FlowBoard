import { Router } from "express";
import {
  createColumn,
  deleteColumn,
  updateColumn,
} from "../controller/column.controller.js";
import { body } from "express-validator";
import validateRequest from "../../../middleware/validate.middleware.js";

const columnRoute = Router({ mergeParams: true });

const columnValidator = [
  body("columns")
    .isArray({ min: 1 })
    .withMessage("Columns must be a non-empty array"),

  body("columns.*").isObject().withMessage("Each column must be an object"),

  body("columns.*.title")
    .exists({ checkFalsy: true })
    .withMessage("Column title is required")
    .isString()
    .withMessage("Column title must be a string")
    .trim()
    .notEmpty()
    .withMessage("Column title cannot be empty"),

  body("columns.*.order")
    .exists()
    .withMessage("Column order is required")
    .isInt({ min: 0 })
    .withMessage("Column order must be a number >= 0"),
];

columnRoute.post("/", columnValidator, validateRequest, createColumn);
columnRoute.patch("/:columnId", columnValidator, validateRequest, updateColumn);
columnRoute.delete("/:columnId", deleteColumn);

export default columnRoute;
