import { useEffect } from "react";
import { socket } from "../services/socket";

export const useBoardSocket = ({
  activeBoard,
  setActiveBoard,
  setBoards,
  setTasks,
}) => {
  useEffect(() => {
    if (!activeBoard) return;
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit("join-board", activeBoard._id);

    const handleCreateColumn = ({ boardId, board }) => {
      setBoards((prev) =>
        prev.map((item) => (item._id === boardId ? board : item))
      );

      setActiveBoard((prev) => (prev?._id === boardId ? board : prev));
    };

    const handleCreateTask = ({ boardId, task }) => {
      if (boardId !== activeBoard._id) return;

      setTasks((prev) => {
        const alreadyExists = prev.some((item) => item._id === task._id);

        if (alreadyExists) return prev;

        return [...prev, task];
      });
    };

    socket.on("column-created", handleCreateColumn);
    socket.on("task-created", handleCreateTask);

    return () => {
      socket.off("column-created", handleCreateColumn);
      socket.off("task-created", handleCreateTask);
      socket.emit("leave-board", activeBoard._id);
    };
  }, [activeBoard?._id, setActiveBoard, setBoards]);
};
