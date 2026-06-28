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
import { useBoard } from "../context/BoardContext";
import toast from "react-hot-toast";

function Board({ setNewBoard }) {
  const [columns, setColumns] = useState([]);
  const [menu, setMenu] = useState(false);

  const { activeBoard, createColumn, deleteBoard } = useBoard();

  useEffect(() => {
    if (!activeBoard) return;

    setColumns((prevColumns) => {
      return (activeBoard.columns || []).map((column) => {
        const existingColumn = prevColumns.find(
          (prev) => prev._id === column._id
        );

        return {
          id: column._id,
          _id: column._id,
          title: column.title,
          order: column.order,
          tasks: existingColumn?.tasks || [],
        };
      });
    });
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
  const addColumn = async (title) => {
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
  const handleDelete = async () => {
    const response = await deleteBoard(activeBoard._id);
  };
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );
  return (
    <>
      {menu && (
        <div
          className="fixed inset-0 z-1000 bg-slate-900/60 flex justify-end items-start pt-4 pr-2 text-white"
          onClick={() => setMenu(false)}
        >
          <div className="max-w-md w-full bg-indigo-600 p-2 flex rounded-xl flex-col">
            <h1>Options</h1>
            <ul className="bg-slate-500/30 p-2 rounded-sm shadow-inner">
              <li className="my-2" onClick={() => handleDelete()}>
                Delete Board
              </li>
              <li className="my-2" onClick={() => setNewBoard(true)}>
                Create New Board
              </li>
              <li className="my-2">Update Board</li>
            </ul>
          </div>
        </div>
      )}
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
            <DashboardHeader setMenu={setMenu} />
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
    </>
  );
}

export default Board;
