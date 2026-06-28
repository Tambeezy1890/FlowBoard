import { createContext, useContext, useEffect, useState } from "react";
import { taskService } from "../services/api";
import toast from "react-hot-toast";
import { useBoard } from "./BoardContext";

const TaskContext = createContext();

export const useTask = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const { activeBoard } = useBoard();

  useEffect(() => {
    if (!activeBoard) return;

    const loadTasks = async () => {
      const response = await taskService.getTasks(activeBoard._id);

      setTasks(response.data);
    };

    loadTasks();
  }, [activeBoard]);
  const createTask = async (boardId, taskData) => {
    try {
      const response = await taskService.createTask(boardId, taskData);
      setTasks((prev) => [...prev, response.data]);
      toast.success("Task created");
      return response;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to create a task";
      toast.error(message);
    }
  };
  const deleteTask = async (boardId, taskId) => {
    const resposne = await taskService.getTask(boardId, taskId);
    console.log(resposne);
    try {
      const response = await taskService.deleteTask(boardId, taskId);

      toast.success("Task deleted");
      return response;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to create a task";
      toast.error(message);
    }
  };
  const value = { tasks, createTask, deleteTask };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
