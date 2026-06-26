import { Eye, KeyRound, Mail } from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await loginUser(data);
    console.log(response);
    if (response.success) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  };
  return (
    <>
      <Dashboard />
      <div className="bg-slate-900/90 h-screen backdrop-blur-sm fixed inset-0 z-1000">
        <div className="flex items-center justify-center h-[calc(100vh-30%)]">
          <div className="max-w-md w-full bg-slate-400 p-2 rounded-xl shadow-sm shadow-indigo-500 space-y-8">
            <div className="flex items-center justify-center flex-col">
              <h1 className="text-2xl text-indigo-900 text-shadow-2xs font-black tracking-wide">
                Login Form
              </h1>
              <p className="text-sm tracking-widest text-slate-600 font-medium">
                Login to access the dashboard
              </p>
            </div>

            <form className="space-y-1" onSubmit={(e) => handleLogin(e)}>
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
                      name="email"
                      onChange={(e) => handleChange(e)}
                      required
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
                  <button className="absolute right-0 top-0 text-[12px] text-slate-300 font-medium hover:text-indigo-400 transition-colors">
                    Forgot password
                  </button>
                </div>
                <div className="relative ">
                  <div className="flex items-center">
                    <input
                      type="password"
                      className="outline-none ring-1 ring-slate-300 hover:ring-indigo-500 focus-within:ring-indigo-300 w-full pl-11 transition-colors"
                      value={data.password}
                      name="password"
                      onChange={(e) => handleChange(e)}
                      required
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
              <div className="px-2 mt-2">
                <button
                  type="submit"
                  className="bg-slate-900 text-white w-full px-2 py-2 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
