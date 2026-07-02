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
    const handleUpdateColumn = ({ boardId, board }) => {
      setBoards((prev) =>
        prev.map((item) => (item._id === boardId ? board : prev))
      );
      setActiveBoard((prev) => (prev?._id === boardId ? board : prev));
    };
    const handleDeleteColumn = ({ boardId, board, columnId }) => {
      setBoards((prev) =>
        prev.map((item) =>
          item._id === boardId
            ? {
                ...item,
                columns: item.columns.filter(
                  (column) => column._id !== columnId
                ),
              }
            : item
        )
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
    const replaceTask = ({ boardId, task }) => {
      console.log("task:", task);

      setTasks((prev) =>
        prev.map((item) => (item._id === task._id ? task : item))
      );
    };
    const handleDeleteTask = ({ boardId, task }) => {
      setTasks((prev) => prev.filter((item) => item._id !== task._id));
    };

    socket.on("column:create", handleCreateColumn);
    socket.on("column:update", handleUpdateColumn);
    socket.on("column:delete", handleDeleteColumn);
    socket.on("task:create", handleCreateTask);
    socket.on("task:update", replaceTask);
    socket.on("task:delete", handleDeleteTask);
    socket.on("task:move", replaceTask);

    return () => {
      socket.off("column:create", handleCreateColumn);
      socket.off("column:update", handleUpdateColumn);
      socket.off("column:delete", handleDeleteColumn);
      socket.off("task:create", handleCreateTask);
      socket.off("task:update", replaceTask);
      socket.off("task:delete", handleDeleteTask);
      socket.off("task:move", replaceTask);
      socket.emit("leave-board", activeBoard._id);
    };
  }, [activeBoard?._id, setActiveBoard, setBoards]);
};
