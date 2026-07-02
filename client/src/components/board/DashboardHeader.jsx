import { Ellipsis, ListFilter, Lock, Star, UserPlus2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useBoard } from "../../context/BoardContext";
import toast from "react-hot-toast";

function DashboardHeader({ setMenu, invite, setInvite }) {
  const { activeBoard } = useBoard();
  return (
    <>
      <div
        className="bg-linear-to-br
from-violet-600
via-purple-300
to-fuchsia-100 w-full py-2 mb-3 px-2 "
      >
        <div className="flex justify-between">
          <div>
            <h1>{activeBoard.title}</h1>
          </div>
          <div className="flex items-center gap-2 ">
            <div className="w-6 h-6 rounded-full bg-blue-400"></div>
            <ListFilter size={20} strokeWidth={1} />
            <div className=" gap-2 items-center hidden md:flex">
              <Star size={20} strokeWidth={1} />
              <Lock size={20} strokeWidth={1} />
              <div
                className="flex items-center"
                onClick={() => setInvite(true)}
              >
                <UserPlus2 size={20} strokeWidth={1} />
                Share
              </div>
            </div>
            <Ellipsis size={20} strokeWidth={1} onClick={() => setMenu(true)} />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardHeader;
