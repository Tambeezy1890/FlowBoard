import React from "react";
import Dashboard from "./Dashboard";
import { useBoard } from "../context/BoardContext";

import { useNavigate, useParams } from "react-router-dom";
function Invite() {
  const { acceptInviteLink } = useBoard();
  const { token } = useParams();
  const navigate = useNavigate();

  const handleJoinGroup = async () => {
    const response = await acceptInviteLink(token);

    if (response?.success) {
      navigate("/dashboard");
    }
  };
  return (
    <>
      <Dashboard />
      <div className="bg-slate-900/90 h-screen fixed inset-0 z-1000 flex items-center justify-center">
        <div className="max-w-md w-full bg-indigo-900 py-5 px-2 rounded-md border-indigo-50 border text-white">
          <h2 className="text-center text-xl tracking-tight mb-4">
            You've been invited to join a group
          </h2>

          <button
            className="mt-4 w-full bg-emerald-300 rounded-2xl py-2 text-black"
            onClick={handleJoinGroup}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}

export default Invite;
