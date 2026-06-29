import express from "express";
import { DB_URI, PORT } from "./src/config/config.js";
import connectDatabase from "./src/config/databases/mongodb.js";
import errorMiddleware from "./src/middleware/error.middleware.js";
import authRoute from "./src/modules/auth/route/auth.route.js";
import boardRoute from "./src/modules/boards/route/board.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());
const allowedRoutes = ["http://localhost:5173", process.env.CLIENT_URL];
app.use(
  cors({
    methods: ["GET", "POST", "PATCH", "DELETE"],
    origin: (origin, callback) => {
      if (!origin || allowedRoutes.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("Server is live");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1", boardRoute);

app.use(errorMiddleware);

export default app;
