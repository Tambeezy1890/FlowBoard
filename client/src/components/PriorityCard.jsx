import {
  Ellipsis,
  Minimize2,
  Plus,
  StickyNotePlus,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Task from "./Task";
import EditTasks from "../pages/EditTasks";
import { useDroppable } from "@dnd-kit/core";

function PriorityCard({
  column,
  addTask,
  count,
  title,
  updateTaskDescription,
  columnId,
  updateTitle,
  deleteTask,
}) {
  const [card, setCard] = useState("");
  const handleChange = (e) => {
    setCard(e.target.value);
  };

  const [editModal, setEditModal] = useState({
    show: false,
    task: null,
  });
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  useEffect(() => {}, [editModal]);
  return (
    <div className="">
      {editModal.show && (
        <div
          className="w-full fixed min-h-screen flex items-center justify-center bg-black/60  inset-0 backdrop-blur-[2px]"
          onClick={() => {
            setEditModal({
              show: false,
              task: null,
            });
          }}
        >
          <div className="p-6 w-full " onClick={(e) => e.stopPropagation()}>
            <EditTasks
              task={editModal.task}
              title={title}
              updateTaskDescription={updateTaskDescription}
              columnId={columnId}
              updateTitle={updateTitle}
              setEditModal={setEditModal}
            />
          </div>
        </div>
      )}
      <div
        className="bg-black max-w-60 w-full p-2 rounded-xl text-white"
        ref={setNodeRef}
      >
        <div className="flex flex-col gap-2 ">
          <div className="flex justify-between ">
            <h2 className="text-white">{column.title}</h2>
            <div className="flex gap-2 items-center">
              {/* conditonal value */}
              <p>{count}</p>

              <Minimize2 className="rotate-45" size={18} />
              <Ellipsis size={18} />
            </div>
          </div>

          {column.tasks.map((task) => (
            <div key={task.id}>
              <Task
                task={task}
                deleteTask={deleteTask}
                columnId={columnId}
                setEditModal={setEditModal}
              />
            </div>
          ))}

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
