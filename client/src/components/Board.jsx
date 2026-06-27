import React, { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import PriorityCard from "./PriorityCard";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import AddColumn from "./AddColumn";

function Board({ activeBoard }) {
  const initialColumns = [
    { id: "today", title: "Today", tasks: [] },
    { id: "week", title: "This Week", tasks: [] },
    { id: "later", title: "Later", tasks: [] },
  ];
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    if (!activeBoard) return;

    const formattedColumns = activeBoard.columns.map((column) => ({
      id: column._id,
      _id: column._id,
      title: column.title,
      order: column.order,
      tasks: [],
    }));

    setColumns(formattedColumns);
  }, [activeBoard]);

  const findColumnId = (columns, id) => {
    if (columns.some((column) => column.id === id)) return id;

    return columns.find((column) => column.tasks.some((task) => task.id === id))
      ?.id;
  };

  const handleDragOver = ({ active, over }) => {
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    setColumns((prev) => {
      const sourceColumnId = findColumnId(prev, activeId);
      const targetColumnId = findColumnId(prev, overId);

      if (!sourceColumnId || !targetColumnId) return prev;
      if (sourceColumnId === targetColumnId) return prev;

      const sourceColumn = prev.find((col) => col.id === sourceColumnId);
      const targetColumn = prev.find((col) => col.id === targetColumnId);

      const activeTask = sourceColumn.tasks.find(
        (task) => task.id === activeId
      );
      if (!activeTask) return prev;

      return prev.map((column) => {
        if (column.id === sourceColumnId) {
          return {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== activeId),
          };
        }

        if (column.id === targetColumnId) {
          return {
            ...column,
            tasks: [...targetColumn.tasks, activeTask],
          };
        }

        return column;
      });
    });
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    setColumns((prev) => {
      const activeColumnId = findColumnId(prev, activeId);
      const overColumnId = findColumnId(prev, overId);

      if (!activeColumnId || !overColumnId) return prev;
      if (activeColumnId !== overColumnId) return prev;

      const column = prev.find((col) => col.id === activeColumnId);

      const oldIndex = column.tasks.findIndex((task) => task.id === activeId);
      const newIndex = column.tasks.findIndex((task) => task.id === overId);

      if (oldIndex === newIndex) return prev;

      return prev.map((col) =>
        col.id === activeColumnId
          ? {
              ...col,
              tasks: arrayMove(col.tasks, oldIndex, newIndex),
            }
          : col
      );
    });
  };

  const addTask = (columnId, taskTitle) => {
    if (!taskTitle.trim()) return;

    setColumns((prev) =>
      prev.map((column) =>
        column.id === columnId
          ? {
              ...column,
              tasks: [
                ...column.tasks,
                {
                  id: String(Date.now()),
                  title: taskTitle.trim(),
                  description: "",
                },
              ],
            }
          : column
      )
    );
  };
  const addColumn = (title) => {
    if (!title.trim()) return;

    setColumns((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        title: title.trim(),
        tasks: [],
      },
    ]);
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
  const deleteColumn = (columnId) => {
    setColumns((prev) => prev.filter((column) => column.id !== columnId));
  };
  const updateColumnTitle = (columnId, newTitle) => {
    if (!newTitle.trim()) return;

    setColumns((prev) =>
      prev.map((column) =>
        column.id === columnId
          ? {
              ...column,
              title: newTitle,
            }
          : column
      )
    );
  };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      sensors={sensors}
    >
      <div
        className="bg-linear-to-br
from-violet-500
via-purple-500
to-fuchsia-400  h-[calc(100vh-100px)] rounded-2xl border-slate-400 scrollbar-thin   "
      >
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
                deleteColumn={deleteColumn}
                updateColumnTitle={updateColumnTitle}
              />
            ))}
            <AddColumn addColumn={addColumn} />
          </div>
        </div>
      </div>
    </DndContext>
  );
}

export default Board;
