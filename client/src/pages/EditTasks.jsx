import React from "react";
import TaskHeader from "../components/TaskHeader";
import TaskData from "../components/TaskData";
import Members from "../components/Members";
import { Trash2 } from "lucide-react";

function EditTasks({
  task,
  deleteTask,
  title,
  updateTaskDescription,
  columnId,
  updateTitle,
  setEditModal,
}) {
  return (
    <div className="bg-gray-700 rounded-2xl w-full  p-4 relative">
      <TaskHeader title={title} setEditModal={setEditModal} />

      <div className="flex overflow-auto">
        <TaskData
          updateTitle={updateTitle}
          task={task}
          title={title}
          updateTaskDescription={updateTaskDescription}
          deleteTask={deleteTask}
          columnId={columnId}
        />
      </div>
      <div className="absolute right-5 bottom-5 text-white hover:bg-rose-100 hover:text-rose-500 rounded-2xl transition-colors">
        <Trash2
          size={20}
          onClick={() => {
            (setEditModal({ show: false, task: null }),
              deleteTask(columnId, task.id));
          }}
        />
      </div>
    </div>
  );
}

export default EditTasks;
