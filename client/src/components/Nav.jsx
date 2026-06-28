import { Calendar, Columns3, Inbox, LayoutDashboard, Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { boardService } from "../services/api";
import { useBoard } from "../context/BoardContext";

function Nav({
  setNewBoard,
  setShowBoard,
  setShowSidebar,
  showSidebar,
  showBoard,
}) {
  const [menu, setMenu] = useState(false);

  const { setActiveBoard, boards } = useBoard();

  return (
    <>
      {menu && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setMenu(false)}
        >
          <div
            className="w-full max-w-md max-h-[70vh] overflow-y-auto rounded-2xl bg-slate-900 border border-slate-700 p-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between">
              <h2 className="text-white text-lg font-semibold mb-3">
                Switch Boards
              </h2>
              <div
                className="flex items-start text-white text-[10px]"
                onClick={() => setNewBoard(true)}
              >
                <Plus size={16} />
                <p>Create New Board</p>
              </div>
            </div>

            <div className="space-y-2">
              {boards.map((board) => (
                <button
                  key={board._id}
                  onClick={() => {
                    setActiveBoard(board);
                    setMenu(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/40 text-white border border-indigo-400/30"
                >
                  {board.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <div
        className="text-sm text-white fixed
left-1/2
bottom-[calc(100vh-91%)]
-transform
-translate-x-1/2 z-100 bg-slate-800 p-2 rounded-xl "
      >
        <div className="flex gap-4">
          <div
            className={`${showSidebar ? "bg-blue-700/50 text-cyan-400" : "text-white"}  flex items-center gap-1 text-sm rounded-2xl p-1`}
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <Inbox size={20} strokeWidth={1} />
            Inbox
          </div>
          <div className=" text-white flex items-center gap-1 text-sm rounded-2xl p-1">
            <Calendar size={20} strokeWidth={1} />
            Planner
          </div>
          <div
            className={`${showBoard ? "bg-blue-700/50 text-cyan-400" : "text-white"}  flex items-center gap-1 text-sm rounded-2xl p-1`}
            onClick={() => setShowBoard(!showBoard)}
          >
            <LayoutDashboard size={20} strokeWidth={1} />
            Board
          </div>
          <div
            className="text-white flex items-center gap-1 text-sm rounded-2xl px-2 text"
            onClick={() => setMenu(!menu)}
          >
            <Columns3 size={20} strokeWidth={1} />
            <p className="text-[12px] text-nowrap">Switch Boards</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Nav;
