import {
  Bell,
  Blocks,
  CircleQuestionMark,
  Megaphone,
  Search,
  Star,
} from "lucide-react";
import React from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="mb-3 px-2 text-white ">
      <div className="flex ">
        <div className="flex-1 text-white">
          <Blocks size={18} />
        </div>
        <div className="flex-3 ">
          <div className="relative flex gap-3 items-center ">
            <input
              type="text"
              className="border border-gray-500 pl-6 text-white text-sm py-1 outline-none focus-within:border-indigo-400 focus:text-indigo-200 placeholder:text-sm rounded-sm shadow-inner w-full hidden md:block"
              placeholder="Search"
            />
            <Search className="absolute left-1 text-white" size={16} />
            <div className="bg-blue-400 rounded-sm px-2 py-1 ml-8 md:ml-0">
              Create
            </div>
            <div className=" text-[10px] px-2 py-2 bg-pink-400 rounded-sm text-nowrap ">
              12 Days left
            </div>
            <div className="flex gap-4 items-center w-full justify-end md:justify-normal">
              <Megaphone size={18} strokeWidth={1} />
              <Bell size={18} strokeWidth={1} />
              <CircleQuestionMark size={18} strokeWidth={1} />
              <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          <button
            className="mx-w-sm bg-rose-200 text-rose-600 px-2 rounded-md"
            onClick={() => {
              (localStorage.clear(),
                toast.success("Logged out"),
                navigate("/login"));
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
