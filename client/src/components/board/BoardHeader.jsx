import { Ellipsis, ListFilter, Lock, Star, UserPlus2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useBoard } from "../../context/BoardContext";
import toast from "react-hot-toast";
import Avatar from "../Avatar";
import { useAuth } from "../../context/authContext";

function BoardHeader({ setMenu, invite, setInvite }) {
  const { activeBoard } = useBoard();
  const { user } = useAuth();
  return (
    <header className="w-full mb-4 px-4 py-2 rounded-3xl bg-linear-to-br from-violet-500 via-purple-300 to-fuchsia-100 shadow-sm border border-white/30">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-950 truncate">
            {activeBoard?.title || "Untitled Board"}
          </h1>

          <p className="hidden sm:block text-sm text-slate-700/80 mt-1">
            Manage tasks, lists, and collaborators
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Avatar user={user} size="sm" />

          <button className="h-10 w-10 grid place-items-center rounded-xl bg-white/35 hover:bg-white/55 transition">
            <ListFilter size={20} strokeWidth={1.8} />
          </button>

          <div className="hidden lg:flex items-center gap-2">
            <button className="h-10 w-10 grid place-items-center rounded-xl bg-white/35 hover:bg-white/55 transition">
              <Star size={19} strokeWidth={1.8} />
            </button>

            <button className="h-10 w-10 grid place-items-center rounded-xl bg-white/35 hover:bg-white/55 transition">
              <Lock size={19} strokeWidth={1.8} />
            </button>
          </div>

          <button
            onClick={() => setInvite(true)}
            className="h-10 px-3 sm:px-4 flex items-center gap-2 rounded-xl bg-white/70 hover:bg-white text-slate-900 font-medium shadow-sm transition"
          >
            <UserPlus2 size={19} strokeWidth={1.8} />
            <span className="hidden sm:inline">Share</span>
          </button>

          <div className="h-8 w-px bg-slate-900/20 hidden sm:block" />

          <button
            onClick={() => setMenu(true)}
            className="h-10 w-10 grid place-items-center rounded-xl bg-white/35 hover:bg-white/55 transition"
          >
            <Ellipsis size={21} strokeWidth={1.8} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default BoardHeader;
