export const addTask = async (columnId, taskTitle) => {
  if (!taskTitle.trim()) return;

  const cols = columns.find((col) => col.id === columnId);

  await createTask(activeBoard._id, {
    title: taskTitle.trim(),
    column: columnId,
    order: cols.tasks.length,
  });
};
export const addColumn = async (title) => {
  if (!title.trim()) return;
  if (!activeBoard?._id) return;
  const order = activeBoard.columns?.length || 0;

  await createColumn(
    {
      columns: [
        {
          title: title.trim(),
          order,
        },
      ],
    },
    activeBoard._id
  );
};

export const updateTaskDescription = async (columnId, taskId, description) => {
  await updateTask(activeBoard._id, taskId, {
    column: columnId,
    description: description,
  });
  updateModalTask(taskId, { description });
  setColumns((prev) =>
    prev.map((column) =>
      column.id === columnId
        ? {
            ...column,
            tasks: column.tasks.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    description,
                  }
                : task
            ),
          }
        : column
    )
  );
};
export const updateTaskStatus = async (columnId, taskId, completed) => {
  await updateTask(activeBoard._id, taskId, {
    column: columnId,
    completed: completed,
  });
  updateModalTask(taskId, { completed });
  setColumns((prev) =>
    prev.map((column) =>
      column.id === columnId
        ? {
            ...column,
            tasks: column.tasks.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    completed,
                  }
                : task
            ),
          }
        : column
    )
  );
};
export const updateTaskTitle = async (columnId, taskId, newTitle) => {
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
export const handleDeleteTask = async (columnId, taskId) => {
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
