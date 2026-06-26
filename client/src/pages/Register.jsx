import React, { useState } from "react";
import { Eye, KeyRound, Mail, User } from "lucide-react";
import { useAuth } from "../context/authContext";
function Register() {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [error, setError] = useState("");
  const { registerUser } = useAuth();

  const handleChange = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      setError("Security keys provided do not match");
      return;
    }
    registerUser(data);
  };
  return (
    <div className="bg-slate-900/90 h-screen backdrop-blur-sm fixed inset-0 z-1000">
      <div className="flex items-center justify-center h-[calc(100vh-30%)]">
        <div className="max-w-md w-full bg-slate-400 p-2 rounded-xl shadow-sm shadow-indigo-500 space-y-8">
          <div className="flex items-center justify-center flex-col">
            <h1 className="text-2xl text-indigo-900 text-shadow-2xs font-black tracking-wide">
              Signup Form
            </h1>
            <p className="text-sm tracking-widest text-slate-600 font-medium">
              Register to access the dashboard
            </p>
          </div>
          {error && (
            <div className="bg-rose-400 w-full text-sm text-rose-500">
              {error}
            </div>
          )}

          <form className="space-y-1" onSubmit={(e) => handleRegister(e)}>
            <div className=" relative border-b border-slate-500 pt-6 pb-2">
              <label className="absolute top-0 text-[12px] text-slate-300 font-medium">
                Email
              </label>
              <div className="relative ">
                <div className="flex items-center">
                  <input
                    type="text"
                    className="outline-none ring-1 ring-slate-300 hover:ring-indigo-500 focus-within:ring-indigo-300 w-full pl-11 transition-colors"
                    value={data.email}
                    onChange={(e) => handleChange(e)}
                    name="email"
                  />
                  <Mail
                    className="absolute translate-y-1 ml-1 top-0"
                    size={18}
                    strokeWidth={1}
                  />
                </div>
              </div>
            </div>
            <div className=" relative border-b border-slate-500 pt-6 pb-2 ">
              <div className="flex justify-between">
                <label className="absolute top-0 text-[12px] text-slate-300 font-medium ">
                  Password
                </label>
              </div>
              <div className="relative ">
                <div className="flex items-center">
                  <input
                    type="password"
                    className="outline-none ring-1 ring-slate-300 hover:ring-indigo-500 focus-within:ring-indigo-300 w-full pl-11 transition-colors"
                    value={data.password}
                    onChange={(e) => handleChange(e)}
                    name="password"
                  />
                  <KeyRound
                    className="absolute translate-y-1 ml-1 top-0"
                    size={18}
                    strokeWidth={1}
                  />
                  <Eye
                    className="absolute right-0 mr-2"
                    size={18}
                    strokeWidth={1}
                  />
                </div>
              </div>
            </div>
            <div className=" relative border-b border-slate-500 pt-6 pb-2 ">
              <div className="flex justify-between">
                <label className="absolute top-0 text-[12px] text-slate-300 font-medium ">
                  Confirm Password
                </label>
              </div>
              <div className="relative ">
                <div className="flex items-center">
                  <input
                    type="password"
                    className="outline-none ring-1 ring-slate-300 hover:ring-indigo-500 focus-within:ring-indigo-300 w-full pl-11 transition-colors"
                    value={data.confirmPassword}
                    onChange={(e) => handleChange(e)}
                    name="confirmPassword"
                  />
                  <KeyRound
                    className="absolute translate-y-1 ml-1 top-0"
                    size={18}
                    strokeWidth={1}
                  />
                </div>
              </div>
            </div>
            <div className=" relative border-b border-slate-500 pt-6 pb-2 ">
              <div className="flex justify-between">
                <label className="absolute top-0 text-[12px] text-slate-300 font-medium ">
                  Username
                </label>
              </div>
              <div className="relative ">
                <div className="flex items-center">
                  <input
                    type="text"
                    className="outline-none ring-1 ring-slate-300 hover:ring-indigo-500 focus-within:ring-indigo-300 w-full pl-11 transition-colors"
                    value={data.username}
                    onChange={(e) => handleChange(e)}
                    name="username"
                  />
                  <User
                    className="absolute translate-y-1 ml-1 top-0"
                    size={18}
                    strokeWidth={1}
                  />
                </div>
              </div>
            </div>
            <div className="px-2 mt-2">
              <button className="bg-slate-900 text-white w-full px-2 py-2 rounded-lg hover:bg-slate-700 transition-colors">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
