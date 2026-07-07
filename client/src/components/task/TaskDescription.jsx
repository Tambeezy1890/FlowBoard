import { ListSortDescending } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";

function TaskDescription({ task, updateTaskDescription, columnId }) {
  const [description, setDescription] = useState(task.description || "");
  const debouncedDescription = useDebounce(description, 5000);
  const hasUserTyped = useRef(false);

  useEffect(() => {
    if (!hasUserTyped.current) return;

    updateTaskDescription(columnId, task._id, debouncedDescription);
  }, [debouncedDescription]);
  const saveDescription = () => {
    const cleanDescription = description.trim();

    setEditing(false);

    if (!cleanTitle) {
      setValue(setDescription(cleanDescription));
      return;
    }

    if (cleanDescription === description) return;

    updateTaskDescription(columnId, task._id, cleanDescription);
  };

  return (
    <div className="mt-4">
      <div className="flex text-white gap-3">
        <ListSortDescending /> Description
      </div>

      <div className="border border-slate-200 mt-4 ml-4 p-4">
        <textarea
          value={description}
          onChange={(e) => {
            hasUserTyped.current = true;
            setDescription(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              return saveDescription();
            }
          }}
          placeholder="Add a more detailed description"
          rows={4}
          cols={60}
          className="w-full bg-transparent outline-none resize-none text-slate-300"
        />
      </div>
    </div>
  );
}

export default TaskDescription;
