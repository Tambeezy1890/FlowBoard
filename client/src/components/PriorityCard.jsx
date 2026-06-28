import { Ellipsis, Minimize2, Plus, StickyNotePlus } from "lucide-react";
import React, { useState } from "react";
import Task from "./Task";
import EditTasks from "../pages/EditTasks";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DropdownMenu from "./DropdownMenu";

function PriorityCard({
  column,
  addTask,
  count,
  title,
  updateTaskDescription,
  columnId,
  updateTitle,
  deleteTask,
  deleteColumn,
  updateColumnTitle,
}) {
  const [card, setCard] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [editTitle, setEditTitle] = useState({
    edit: false,
    title: column.title,
  });
  const handleChange = (e) => {
    setCard(e.target.value);
  };
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;

    setEditTitle((prev) => ({
      ...prev,
      title: newTitle,
    }));

    updateColumnTitle(column.id, newTitle);
  };

  const [editModal, setEditModal] = useState({
    show: false,
    task: null,
  });
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="relative">
      {showMenu && (
        <div
          className="w-full fixed min-h-screen flex items-center justify-center bg-black/60  inset-0 backdrop-blur-[2px] z-1000"
          onClick={() => {
            setShowMenu(false);
          }}
        >
          <div className="p-6 w-full " onClick={(e) => e.stopPropagation()}>
            <DropdownMenu column={column} deleteColumn={deleteColumn} />
          </div>
        </div>
      )}
      {editModal.show && (
        <div
          className="w-full fixed min-h-screen flex items-center justify-center bg-black/60  inset-0 backdrop-blur-[2px]"
          onClick={() => {
            setEditModal({
              show: false,
              task: null,
            });
            setShowMenu(false);
          }}
        >
          <div className="p-6 w-full " onClick={(e) => e.stopPropagation()}>
            <EditTasks
              task={editModal.task}
              title={title}
              updateTaskDescription={updateTaskDescription}
              columnId={columnId}
              updateTitle={updateTitle}
              deleteTask={deleteTask}
              setEditModal={setEditModal}
            />
          </div>
        </div>
      )}
      <div
        className="bg-black max-w-60 w-full p-2 rounded-xl text-white "
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
                  onBlur={() =>
                    setEditTitle({
                      edit: false,
                      title: column.title,
                    })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setEditTitle({
                        edit: false,
                        title: column.title,
                      });
                    }
                  }}
                />
              ) : (
                <h2 className="text-white">{column.title}</h2>
              )}
            </div>
            <div className="flex gap-2 items-center">
              {/* conditonal value */}
              <p>{count}</p>

              <Minimize2 className="rotate-45" size={18} />
              <Ellipsis onClick={() => setShowMenu(true)} size={18} />
            </div>
          </div>
          <SortableContext
            items={column.tasks.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            {column.tasks.map((task) => (
              <Task
                key={task.id}
                task={task}
                columnId={columnId}
                setEditModal={setEditModal}
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
                onChange={(e) => handleChange(e)}
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

export default PriorityCard;
