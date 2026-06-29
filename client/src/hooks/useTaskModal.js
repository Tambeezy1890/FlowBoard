import { useState } from "react";

export function useTaskModal() {
  const [editModal, setEditModal] = useState({
    show: false,
    task: null,
  });

  const openTaskModal = (task) => {
    setEditModal({
      show: true,
      task,
    });
  };

  const closeTaskModal = () => {
    setEditModal({
      show: false,
      task: null,
    });
  };

  const updateModalTask = (taskId, updates) => {
    setEditModal((prev) =>
      prev.task?.id === taskId
        ? {
            ...prev,
            task: {
              ...prev.task,
              ...updates,
            },
          }
        : prev
    );
  };

  return {
    editModal,
    setEditModal,
    openTaskModal,
    closeTaskModal,
    updateModalTask,
  };
}
