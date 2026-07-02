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
  const [inviteLink, setInviteLink] = useState();
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
    console.log(columnData);
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
  const deleteColumn = async (columnId, boardId) => {
    try {
      const response = await boardService.deleteColumn(columnId, boardId);
      toast.success("Column deleted");
      return response;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to delete column";
      toast.error(message);
    }
  };
  const updateColumn = async (boardId, columnId, columnData) => {
    try {
      const response = await boardService.updateColumn(
        boardId,
        columnId,
        columnData
      );

      toast.success("Column updated");
      return response;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to update column";
      toast.error(message);
    }
  };
  const getInviteLink = async () => {
    try {
      const response = await boardService.invite(activeBoard._id);
      setInviteLink(response.url);
      return response.url;
    } catch (err) {
      setInviteLink(null);
      const message =
        err.response?.data?.message || "Failed to generate invite link";
      toast.error(message);
    }
  };
  const acceptInviteLink = async (token) => {
    try {
      const response = await boardService.join(token);

      const boardsResponse = await boardService.getBoards();
      setBoards(boardsResponse.data);

      if (boardsResponse.data.length > 0) {
        setActiveBoard(boardsResponse.data[0]);
      }
      toast.success(response.message);
      return response;
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to generate invite link";
      toast.error(message);
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
    deleteColumn,
    updateColumn,
    getInviteLink,
    acceptInviteLink,
  };
  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};
