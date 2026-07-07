import {
  Bell,
  Blocks,
  CircleQuestionMark,
  Megaphone,
  Search,
} from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Avatar from "../Avatar";
import { useAuth } from "../../context/authContext";

function Navbar({ notifications = [], setNotifications }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 px-4 bg-slate-950/95 backdrop-blur border-b border-white/10 text-white">
      <div className="h-full max-w-7xl mx-auto flex items-center gap-4">
        <button className="h-10 w-10 grid place-items-center rounded-xl hover:bg-white/10 transition">
          <Blocks size={22} />
        </button>

        <div className="relative hidden md:block w-full max-w-xs">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            className="w-full h-11 pl-10 pr-3 rounded-xl bg-slate-900 border border-slate-600 text-sm outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition"
            placeholder="Search"
          />
        </div>

        <button className="h-11 px-4 rounded-xl bg-blue-500 hover:bg-blue-400 font-medium shadow-sm transition">
          Create
        </button>

        <div className="hidden sm:inline-flex h-11 min-w-max px-4 rounded-xl bg-pink-500 items-center justify-center font-semibold text-sm whitespace-nowrap">
          12 Days left
        </div>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <button className="h-10 w-10 hidden sm:grid place-items-center rounded-xl hover:bg-white/10 transition">
            <Megaphone size={20} strokeWidth={1.7} />
          </button>

          <button
            onClick={() => setNotifications?.([])}
            className="relative h-10 w-10 grid place-items-center rounded-xl hover:bg-white/10 transition"
          >
            <Bell size={20} strokeWidth={1.7} />

            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-pink-500 text-white text-[11px] font-bold flex items-center justify-center border border-slate-950">
                {notifications.length}
              </span>
            )}
          </button>

          <button className="h-10 w-10 hidden sm:grid place-items-center rounded-xl hover:bg-white/10 transition">
            <CircleQuestionMark size={20} strokeWidth={1.7} />
          </button>

          <Avatar user={user} size="sm" />

          <button
            className="h-11 px-4 rounded-xl bg-rose-200 text-rose-600 font-semibold hover:bg-rose-100 transition"
            onClick={() => {
              localStorage.clear();
              toast.success("Logged out");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
