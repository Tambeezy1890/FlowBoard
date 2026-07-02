export function useBoardTasks({
  activeBoard,
  columns,
  setColumns,
  createTask,
  updateTask,
  deleteTask,
  updateModalTask,
}) {
  const addTask = async (columnId, taskTitle) => {
    if (!taskTitle.trim()) return;

    const col = columns.find((col) => col.id === columnId);
    if (!col || !activeBoard?._id) return;

    await createTask(activeBoard._id, {
      title: taskTitle.trim(),
      column: columnId,
      order: col.tasks.length,
    });
  };

  const updateTaskDescription = async (columnId, taskId, description) => {
    await updateTask(activeBoard._id, taskId, {
      column: columnId,
      description,
    });

    updateModalTask(taskId, { description });

    setColumns((prev) =>
      prev.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.map((task) =>
                task.id === taskId ? { ...task, description } : task
              ),
            }
          : column
      )
    );
  };

  const updateTaskStatus = async (columnId, taskId, completed) => {
    await updateTask(activeBoard._id, taskId, {
      column: columnId,
      completed,
    });

    updateModalTask(taskId, { completed });

    setColumns((prev) =>
      prev.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.map((task) =>
                task.id === taskId ? { ...task, completed } : task
              ),
            }
          : column
      )
    );
  };

  const updateTaskTitle = async (columnId, taskId, newTitle) => {
    await updateTask(activeBoard._id, taskId, {
      column: columnId,
      title: newTitle,
    });

    updateModalTask(taskId, { title: newTitle });

    setColumns((prev) =>
      prev.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.map((task) =>
                task.id === taskId ? { ...task, title: newTitle } : task
              ),
            }
          : column
      )
    );
  };

  const handleDeleteTask = async (columnId, taskId) => {
    await deleteTask(activeBoard._id, taskId);

    setColumns((prev) =>
      prev.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: column.tasks.filter((task) => task.id !== taskId),
            }
          : column
      )
    );
  };

  return {
    addTask,
    updateTaskDescription,
    updateTaskStatus,
    updateTaskTitle,
    handleDeleteTask,
  };
}
