import express from "express";
import { DB_URI, PORT } from "./src/config/config.js";
import connectDatabase from "./src/config/databases/mongodb.js";
import errorMiddleware from "./src/middleware/error.middleware.js";
import authRoute from "./src/modules/auth/route/auth.route.js";
import boardRoute from "./src/modules/boards/route/board.route.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is live");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1", boardRoute);

app.use(errorMiddleware);

export default app;
