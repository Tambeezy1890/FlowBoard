import React from "react";

function BoardMenu({ column, deleteColumn }) {
  return (
    <div className="fixed right-5 top-10 bg-slate-600 rounded-lg p-2 z-1000">
      <div className="flex flex-col">
        <button
          onClick={() => deleteColumn(column.id)}
          className="text-red-400 border-b border-slate-300"
        >
          Delete Column
        </button>
        <button className="text-white border-b border-slate-300">
          Edit column
        </button>
        <button className="text-white border-b border-slate-300">Resize</button>
        <button className="text-white border-b border-slate-300">
          Add column
        </button>
        <button className="text-white border-b border-slate-300">
          Move column
        </button>
      </div>
    </div>
  );
}

export default BoardMenu;
