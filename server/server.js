import app from "./app.js";
import connectDatabase from "./src/config/databases/mongodb.js";
import { PORT } from "./src/config/config.js";
import http from "http";
import { Server } from "socket.io";

const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  console.log(`Socket ${socket.id} connected`);
  socket.on("join-board", (boardId) => {
    socket.join(boardId);
    console.log(`${socket.id} joined board: ${boardId}`);
  });
  socket.on("leave-board", (boardId) => {
    socket.leave(boardId);
    console.log(`${socket.id} disconnected from board: ${boardId}`);
  });
  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
  });
});
const startServer = async () => {
  try {
    await connectDatabase();

    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();
