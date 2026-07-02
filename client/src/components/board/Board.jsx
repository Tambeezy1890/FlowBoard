import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import BoardColumn from "./BoardColumn";
import { useBoardColumns } from "../../hooks/useBoardColumns";
import { DndContext } from "@dnd-kit/core";
import { useTaskDragAndDrop } from "../../hooks/useTaskDragAndDrop";
import { useBoard } from "../../context/BoardContext";
import { useBoardTasks } from "../../hooks/useBoardTasks";
import { useTask } from "../../context/TaskContext";
import TaskModal from "../../pages/TaskModal";
import AddColumnForm from "./AddColumnForm";
import { useTaskModal } from "../../hooks/useTaskModal";

function Board({ setNewBoard, invite, setInvite }) {
  const [menu, setMenu] = useState(false);

  const { createTask, tasks, deleteTask, updateTask, moveTask } = useTask();
  const {
    activeBoard,
    createColumn,
    deleteBoard,
    deleteColumn,
    updateColumn,
    boards,
  } = useBoard();

  const { columns, setColumns } = useBoardColumns({
    activeBoard,
    tasks,
  });
  const { editModal, setEditModal, closeTaskModal, updateModalTask } =
    useTaskModal();

  const { sensors, handleDragOver, handleDragEnd } = useTaskDragAndDrop({
    columns,
    setColumns,
    activeBoard,
    moveTask,
  });

  const {
    addTask,
    updateTaskDescription,
    updateTaskStatus,
    updateTaskTitle,
    handleDeleteTask,
  } = useBoardTasks({
    activeBoard,
    columns,
    setColumns,
    createTask,
    updateTask,
    deleteTask,
    updateModalTask,
  });

  const handleDeleteColumn = async (columnId) => {
    await deleteColumn(columnId, activeBoard._id);
    setColumns((prev) => prev.filter((column) => column.id !== columnId));
  };

  const updateColumnTitle = async (columnId, newTitle) => {
    if (!newTitle.trim()) return;

    await updateColumn(activeBoard._id, columnId, {
      title: newTitle.trim(),
    });

    setColumns((prev) =>
      prev.map((column) =>
        column.id === columnId ? { ...column, title: newTitle.trim() } : column
      )
    );
  };
  const handleDeleteBoard = async () => {
    await deleteBoard(activeBoard._id);
  };

  return (
    <>
      {editModal.show && (
        <div
          className="w-full fixed min-h-screen flex items-center justify-center bg-black/60  inset-0 backdrop-blur-[2px] z-1000"
          onClick={closeTaskModal}
        >
          <div className="p-6 w-full " onClick={(e) => e.stopPropagation()}>
            <TaskModal
              task={editModal.task}
              title={editModal.task.title}
              updateTaskDescription={updateTaskDescription}
              columnId={editModal.task.column}
              updateTitle={updateTaskTitle}
              deleteTask={handleDeleteTask}
              setEditModal={setEditModal}
              updateTaskStatus={updateTaskStatus}
            />
          </div>
        </div>
      )}
      {menu && (
        <div
          className="fixed inset-0 z-1000 bg-slate-900/60 flex justify-end items-start pt-4 pr-2 text-white"
          onClick={() => setMenu(false)}
        >
          <div className="max-w-md w-full bg-indigo-600 p-2 flex rounded-xl flex-col">
            <h1>Options</h1>
            <ul className="bg-slate-500/30 p-2 rounded-sm shadow-inner">
              <li className="my-2" onClick={() => handleDeleteBoard()}>
                Delete Board
              </li>
              <li className="my-2" onClick={() => setNewBoard(true)}>
                Create New Board
              </li>
              <li className="my-2">Update Board</li>
              <li className="my-2">Delete Columns</li>
            </ul>
          </div>
        </div>
      )}
      <DndContext
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        sensors={sensors}
      >
        <div
          className="bg-linear-to-br
from-violet-500
via-purple-500
to-fuchsia-400  h-[calc(100vh-100px)] rounded-2xl border-slate-400 scrollbar-thin   "
        >
          <div className="sticky top-0">
            <DashboardHeader
              setMenu={setMenu}
              invite={invite}
              setInvite={setInvite}
            />
          </div>
          <div className="overflow-x-auto overflow-y-auto px-2 h-[calc(100%-140px)]">
            <div className="flex gap-4 items-start">
              {columns.map((card) => (
                <BoardColumn
                  setEditModal={setEditModal}
                  editModal={editModal}
                  key={card.id}
                  column={card}
                  addTask={addTask}
                  count={card.tasks?.length}
                  title={card.title}
                  columnId={card.id}
                  deleteTask={handleDeleteTask}
                  deleteColumn={handleDeleteColumn}
                  updateColumnTitle={updateColumnTitle}
                  updateTaskStatus={updateTaskStatus}
                />
              ))}
              <AddColumnForm addColumn={addColumn} />
            </div>
          </div>
        </div>
      </DndContext>
    </>
  );
}

export default Board;
