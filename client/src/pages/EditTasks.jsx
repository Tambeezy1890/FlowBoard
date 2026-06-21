import React from "react";
import TaskHeader from "../components/TaskHeader";
import TaskData from "../components/TaskData";
import Members from "../components/Members";

function EditTasks({ task, title }) {
  return (
    <div className="bg-gray-700 rounded-2xl w-full  p-4">
      <TaskHeader title={title} />

      <div className="flex overflow-auto">
        <TaskData task={task} />
      </div>
    </div>
  );
}

export default EditTasks;
