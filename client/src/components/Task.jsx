import { Check, Eye, Trash2 } from "lucide-react";
import React from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Task({ task, columnId, setEditModal }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div className="bg-slate-700 p-2 mb-2" ref={setNodeRef} style={style}>
      <div className="flex items-center gap-2 mb-2 justify-between">
        <div className="flex gap-2 items-center">
          <Check className="bg-emerald-300 rounded-full" size={18} />
          <p>{task.title}</p>
        </div>

        <button
          ref={setActivatorNodeRef}
          {...attributes}
          {...listeners}
          className="cursor-grab mr-2"
        >
          ⠿
        </button>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEditModal({
              show: true,
              task,
            });
          }}
        >
          <Eye size={18} />
        </button>

        <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
      </div>
    </div>
  );
}

export default Task;
