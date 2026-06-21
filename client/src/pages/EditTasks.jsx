import React from "react";
import TaskHeader from "../components/TaskHeader";
import TaskData from "../components/TaskData";
import Members from "../components/Members";

function EditTasks({
  task,
  title,
  updateTaskDescription,
  columnId,
  updateTitle,
  setEditModal,
}) {
  return (
    <div className="bg-gray-700 rounded-2xl w-full  p-4">
      <TaskHeader title={title} setEditModal={setEditModal} />

      <div className="flex overflow-auto">
        <TaskData
          updateTitle={updateTitle}
          task={task}
          title={title}
          updateTaskDescription={updateTaskDescription}
          columnId={columnId}
        />
      </div>
    </div>
  );
}

export default EditTasks;
