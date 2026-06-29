import express from "express";
import { DB_URI, PORT } from "./src/config/config.js";
import connectDatabase from "./src/config/databases/mongodb.js";
import errorMiddleware from "./src/middleware/error.middleware.js";
import authRoute from "./src/modules/auth/route/auth.route.js";
import boardRoute from "./src/modules/boards/route/board.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://flow-board-lemon.vercel.app",
];
const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Server is live");
});

app.use("/api/v1/auth", authRoute);
app.use("/api/v1", boardRoute);

app.use(errorMiddleware);

export default app;
