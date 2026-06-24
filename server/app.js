import express from "express";
import { DB_URI, PORT } from "./src/config/config.js";
import connectDatabase from "./src/config/databases/mongodb.js";
import errorMiddleware from "./src/middleware/error.middleware.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is live");
});

app.use("/auth", () => null);

app.use(errorMiddleware);

export default app;
