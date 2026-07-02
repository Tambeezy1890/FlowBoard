import { Ellipsis, Minimize2, Plus, StickyNotePlus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import TaskCard from "../task/TaskCard";
import EditTasks from "../../pages/TaskModal";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDebounce } from "../../hooks/useDebounce";
import BoardMenu from "./BoardMenu";

function BoardColumn({
  column,
  addTask,
  count,
  title,
  columnId,
  deleteTask,
  deleteColumn,
  updateColumnTitle,
  editModal,
  updateTaskStatus,
  setEditModal,
}) {
  const [card, setCard] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [editTitle, setEditTitle] = useState({
    edit: false,
    title: column.title,
  });

  const [collapse, setCollapse] = useState(false);
  const hasUserTyped = useRef(false);
  const debouncedValue = useDebounce(editTitle.title, 5000);

  useEffect(() => {
    if (!hasUserTyped.current) return;
    if (!debouncedValue.trim()) return;
    if (debouncedValue.trim() === column.title) return;

    updateColumnTitle(column.id, debouncedValue.trim());
  }, [debouncedValue]);
  const saveColumnTitle = () => {
    const cleanTitle = editTitle.title.trim();

    if (!cleanTitle) {
      setEditTitle({
        edit: false,
        title: column.title,
      });
      return;
    }

    if (cleanTitle !== column.title) {
      updateColumnTitle(column.id, cleanTitle);
    }

    setEditTitle({
      edit: false,
      title: cleanTitle,
    });
  };
  const handleCardChange = (e) => {
    setCard(e.target.value);
  };

  const handleTitleChange = (e) => {
    hasUserTyped.current = true;

    setEditTitle((prev) => ({
      ...prev,
      title: e.target.value,
    }));
  };
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="relative">
      {showMenu && (
        <div
          className="w-full fixed min-h-screen flex items-center justify-center bg-black/60  inset-0 backdrop-blur-[2px] z-10"
          onClick={() => {
            setShowMenu(false);
          }}
        >
          <div className="p-6 w-full " onClick={(e) => e.stopPropagation()}>
            <BoardMenu column={column} deleteColumn={deleteColumn} />
          </div>
        </div>
      )}

      <div
        className={` bg-black ${collapse ? "max-w-12 w-full overflow-hidden relative" : "max-w-60 w-full"} p-2 rounded-xl text-white `}
        ref={setNodeRef}
      >
        <div className="flex flex-col gap-2 ">
          <div className="flex justify-between ">
            <div
              className=""
              onClick={() => {
                setEditTitle({
                  edit: true,
                  title: column.title,
                });
              }}
            >
              {editTitle.edit ? (
                <input
                  autoFocus
                  value={editTitle.title}
                  className="w-full bg-slate-800 text-white outline-none rounded px-1"
                  onChange={handleTitleChange}
                  onBlur={saveColumnTitle}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      saveColumnTitle();
                    }

                    if (e.key === "Escape") {
                      setEditTitle({
                        edit: false,
                        title: column.title,
                      });
                    }
                  }}
                />
              ) : (
                <h2
                  className={`text-white ${collapse ? "mr-10 mt-4 rotate-90" : ""}`}
                >
                  {column.title}
                </h2>
              )}
            </div>
            <div className="flex gap-2 items-center">
              {/* conditonal value */}
              <p>{count}</p>

              <Minimize2
                className={`rotate-45 ${collapse ? "absolute top-2 left-2 z-1000" : ""}`}
                size={18}
                onClick={() => setCollapse(!collapse)}
              />
              <Ellipsis onClick={() => setShowMenu(true)} size={18} />
            </div>
          </div>
          <SortableContext
            items={column.tasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {column.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                columnId={columnId}
                setEditModal={setEditModal}
                updateTaskStatus={updateTaskStatus}
              />
            ))}
          </SortableContext>

          <div className="flex justify-between items-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addTask(column.id, card);
                setCard("");
              }}
              className="flex"
            >
              <Plus type="submit" />
              <input
                type="text"
                placeholder="Add a card"
                value={card}
                onChange={handleCardChange}
              />
            </form>

            <div>
              <StickyNotePlus size={18} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardColumn;
