import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Nav from "../components/Nav";
import Board from "../components/Board";
import { useAuth } from "../context/authContext";
import { useBoard } from "../context/BoardContext";
import { Columns } from "lucide-react";
function Dashboard() {
  const [newBoard, setNewBoard] = useState();
  const [showSidebar, setShowSidebar] = useState(true);
  const [showBoard, setShowBoard] = useState(true);
  const [data, setData] = useState({
    title: "",
  });
  const {
    activeBoard,
    setActiveBoard,
    boards,
    setBoards,
    createBoard,
    loadingBoard,
  } = useBoard();
  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleCreateBoard = async (e) => {
    e.preventDefault();

    await createBoard(data);

    setData({
      title: "",
    });

    setNewBoard(false);
  };

  return (
    <>
      {newBoard && (
        <div
          className="bg-transparent backdrop-blur-sm h-screen fixed inset-0 z-1000 pt-4 text-center"
          onClick={() => setNewBoard(false)}
        >
          <div
            className="max-w-md w-full mx-auto bg-indigo-700 rounded-2xl text-white space-y-2 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h1 className="text-2xl">Create a new board</h1>
            </div>
            <form onSubmit={(e) => handleCreateBoard(e)}>
              <div>
                <h1>Board Title</h1>
                <label>Title</label>
                <input
                  autoFocus
                  type="text"
                  name="title"
                  value={data.title}
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <button
                className="max-w-md px-4  py-2 bg-indigo-500 rounded-2xl hover:bg-indigo-300"
                type="submit"
              >
                Create Board
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="bg-gray-900 h-screen px-4 py-2 overflow-hidden relative">
        <Navbar />
        <div className="flex gap-3">
          <div
            className={`${showSidebar ? "flex-2" : "hidden"} md:flex-1 w-full resize-none`}
          >
            <Sidebar />
          </div>

          {boards.length > 0 ? (
            <div
              className={`${showBoard ? "flex-3" : "hidden"} w-full h-screen overflow-hidden bg-slate-900 rounded-2xl shrink`}
            >
              <Board setNewBoard={setNewBoard} />
            </div>
          ) : (
            <div className="flex-1 w-full h-screen overflow-hidden flex items-center justify-center">
              <button
                className="text-3xl bg-indigo-400 p-2 rounded-xl mb-[20%] hover:bg-indigo-300 text-slate-100"
                onClick={() => setNewBoard(true)}
              >
                Create New Board
              </button>
            </div>
          )}
        </div>
        <Nav
          setNewBoard={setNewBoard}
          setShowBoard={setShowBoard}
          setShowSidebar={setShowSidebar}
          showSidebar={showSidebar}
          showBoard={showBoard}
        />
      </div>
    </>
  );
}

export default Dashboard;
