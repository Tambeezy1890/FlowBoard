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
  const updateTask = async (boardId, taskId, taskData) => {
    try {
      const response = await taskService.updateTask(boardId, taskId, taskData);
      const updatedTask = response.data;

      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? updatedTask : task))
      );

      toast.success("Task updated");
      return updatedTask;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to create a task";
      toast.error(message);
    }
  };
  const moveTask = async (boardId, taskId, taskData) => {
    try {
      const response = await taskService.moveTask(boardId, taskId, taskData);
      const updatedTask = response.data;

      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId
            ? {
                ...task,
                ...updatedTask,
                column: taskData.column,
                order: taskData.order,
              }
            : task
        )
      );

      toast.success("Task moved");
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || "Failed to move task";
      toast.error(message);
    }
  };
  const value = {
    tasks,
    createTask,
    deleteTask,
    updateTask,
    moveTask,
    setTasks,
  };
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};
