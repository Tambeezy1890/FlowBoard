import React from "react";

function BoardMenu({ column, deleteColumn, setCollapse, setShowMenu }) {
  return (
    <div className="fixed right-5 top-10 bg-slate-600/60 rounded-lg p-2 z-1000 mt-15">
      <div className="flex flex-col gap-2">
        <button
          onClick={() => deleteColumn(column.id)}
          className="text-red-600 bg-rose-600/20 border-b border-slate-300 p-2 rounded-lg"
        >
          Delete Column
        </button>
        <button className="text-white bg-indigo-600 p-2 rounded-lg border-b border-slate-300">
          Edit column
        </button>
        <button
          className="text-white border-b border-slate-300 bg-indigo-600 p-2 rounded-lg"
          onClick={() => {
            (setCollapse((prev) => !prev), setShowMenu((prev) => !prev));
          }}
        >
          Resize
        </button>
        <button className="text-white border-b border-slate-300 bg-indigo-600 p-2 rounded-lg">
          Add column
        </button>
        <button className="text-white border-b border-slate-300 bg-indigo-600 p-2 rounded-lg">
          Move column
        </button>
      </div>
    </div>
  );
}

export default BoardMenu;
