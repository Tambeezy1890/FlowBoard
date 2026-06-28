import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./authContext";
import { boardService } from "../services/api";
import toast from "react-hot-toast";

const BoardContext = createContext();

export const useBoard = () => useContext(BoardContext);

export const BoardProvider = ({ children }) => {
  const [activeBoard, setActiveBoard] = useState();
  const [boards, setBoards] = useState([]);
  const [loadingBoard, setLoadingBoard] = useState(false);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;
    if (!user) return;

    const getBoards = async () => {
      setLoadingBoard(true);
      try {
        const response = await boardService.getBoards();
        setBoards(response.data);

        if (response.data.length > 0) {
          setActiveBoard(response.data[0]);
          console.log(boards);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingBoard(false);
      }
    };

    getBoards();
  }, [user, loading]);

  const createBoard = async (boardData) => {
    setLoadingBoard(true);
    try {
      const response = await boardService.createBoard(boardData);

      const newBoard = response.data;

      setBoards((prev) => [...prev, newBoard]);
      setActiveBoard(newBoard);

      return newBoard;
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBoard(false);
    }
  };
  const createColumn = async (columnData, boardId) => {
    setLoadingBoard(true);
    try {
      const response = await boardService.createColumn(columnData, boardId);

      const updatedColumns = response.data.columns;

      setBoards((prev) =>
        prev.map((board) =>
          board._id === boardId
            ? {
                ...board,
                columns: updatedColumns,
              }
            : board
        )
      );

      setActiveBoard((prev) =>
        prev?._id === boardId
          ? {
              ...prev,
              columns: updatedColumns,
            }
          : prev
      );

      return updatedColumns;
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingBoard(false);
    }
  };
  const deleteBoard = async (boardId) => {
    try {
      const response = await boardService.deleteBoard(boardId);
      setBoards((prevBoards) => {
        const remainingBoards = prevBoards.filter(
          (board) => board._id !== boardId
        );

        setActiveBoard(remainingBoards[0] || null);

        return remainingBoards;
      });

      toast.success(response.message);
      return response;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to get board";
      toast.error(message);
      console.error(err);
    }
  };
  const value = {
    loadingBoard,
    activeBoard,
    setActiveBoard,
    boards,
    setBoards,
    createBoard,
    createColumn,
    deleteBoard,
  };
  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};
