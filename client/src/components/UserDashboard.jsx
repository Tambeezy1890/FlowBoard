import React, { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import PriorityCard from "./PriorityCard";
import { DndContext } from "@dnd-kit/core";

function UserDashboard() {
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id;
    const targetColumnId = over.id;

    setColumns((prev) => {
      let movedTask = null;
      let sourceColumnId = null;

      const columnsWithoutTask = prev.map((column) => {
        const taskExists = column.tasks.some((task) => task.id === taskId);

        if (!taskExists) return column;

        sourceColumnId = column.id;
        movedTask = column.tasks.find((task) => task.id === taskId);

        return {
          ...column,
          tasks: column.tasks.filter((task) => task.id !== taskId),
        };
      });

      if (!movedTask || sourceColumnId === targetColumnId) return prev;

      return columnsWithoutTask.map((column) =>
        column.id === targetColumnId
          ? {
              ...column,
              tasks: [...column.tasks, movedTask],
            }
          : column
      );
    });
  };
  const initialColumns = [
    { id: "today", title: "Today", tasks: [] },
    { id: "week", title: "This Week", tasks: [] },
    { id: "later", title: "Later", tasks: [] },
  ];
  const [columns, setColumns] = useState(() => {
    const savedColumns = localStorage.getItem("trello-columns");
    if (savedColumns) {
      return JSON.parse(savedColumns);
    }
    return initialColumns;
  });

  useEffect(() => {
    localStorage.setItem("trello-columns", JSON.stringify(columns));
  }, [columns]);

  const addTask = (columnId, taskTitle) => {
    setColumns((prev) =>
      prev.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: [
                ...column.tasks,
                {
                  id: Date.now(),
                  title: taskTitle,
                  description: "",
                },
              ],
            }
          : column
      )
    );
  };

  const updateTaskDescription = (columnId, taskId, description) => {
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
  const updateTitle = (columnId, taskId, newTitle) => {
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
  const deleteTask = (columnId, taskId) => {
    console.log(taskId);
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
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="bg-purple-600 h-screen rounded-2xl scrollbar-thin  ">
        <div className="sticky top-0">
          <DashboardHeader />
        </div>
        <div className="overflow-x-auto overflow-y-auto px-2 h-[calc(100%-140px)]">
          <div className="flex gap-4 items-start">
            {columns.map((card) => (
              <PriorityCard
                key={card.id}
                column={card}
                addTask={addTask}
                count={card.tasks?.length}
                title={card.title}
                updateTaskDescription={updateTaskDescription}
                columnId={card.id}
                updateTitle={updateTitle}
                deleteTask={deleteTask}
              />
            ))}
          </div>
        </div>
      </div>
    </DndContext>
  );
}

export default UserDashboard;
