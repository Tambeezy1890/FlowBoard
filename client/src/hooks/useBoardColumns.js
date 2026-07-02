import { useEffect, useState } from "react";

export function useBoardColumns({ activeBoard, tasks }) {
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    if (!activeBoard) return;

    const taskList = tasks || [];

    setColumns(
      (activeBoard.columns || []).map((column) => {
        const columnTasks = taskList
          .filter((task) => task.column === column._id)
          .map((task) => ({
            id: task._id,
            _id: task._id,
            title: task.title,
            description: task.description,
            completed: task.completed,
            order: task.order,
            column: task.column,
          }));

        return {
          id: column._id,
          _id: column._id,
          title: column.title,
          order: column.order,
          tasks: columnTasks.sort((a, b) => a.order - b.order),
        };
      })
    );
  }, [activeBoard, tasks]);

  return { columns, setColumns };
}
