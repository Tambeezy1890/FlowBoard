import { ListSortDescending } from "lucide-react";
import React, { useState } from "react";
function Description({ task, updateTaskDescription, columnId }) {
  const [description, setDescription] = useState(task.description || "");

  const handleChange = (e) => {
    const newDescription = e.target.value;

    setDescription(newDescription);
    updateTaskDescription(columnId, task.id, newDescription);
  };

  return (
    <div className="mt-4">
      <div className="flex text-white gap-3">
        <ListSortDescending /> Description
      </div>

      <div className="border border-slate-200 mt-4 ml-4 p-4">
        <textarea
          value={description}
          onChange={handleChange}
          placeholder="Add a more detailed description"
          rows={4}
          cols={60}
          className="w-full bg-transparent outline-none resize-none"
        />
      </div>
    </div>
  );
}

export default Description;
