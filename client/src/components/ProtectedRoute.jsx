import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (!user)
    return (
      <div className="h-screen bg-slate-900 py-4">
        <div className="max-w-md w-full mx-auto ">
          <div className="flex flex-col justify-center bg-slate-400 p-4 rounded-xl">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-black text-rose-600 uppercase tracking-tight">
                Failed to access resource
              </h1>
            </div>
            <div className="bg-slate-300 py-2 mt-4 shadow-inner rounded-sm">
              <p className="text-md text-slate-600  w-full text-center rounded-2xl">
                User is undefined
              </p>
              <p className="text-sm text-slate-400 text-center">
                Please login in again
              </p>
            </div>
            <div className="mt-8">
              <Link to="/login">
                <button className="w-full bg-indigo-500 rounded-2xl text-white py-2">
                  Return to login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <>
      {loading && (
        <div className="h-screen bg-slate-900">
          <div className="flex h-full items-center justify-center">
            <div className="border-t border-b border-indigo-400 rounded-2xl w-16 h-16 animate-spin"></div>
          </div>
        </div>
      )}
      {children}
    </>
  );
}

export default ProtectedRoute;
