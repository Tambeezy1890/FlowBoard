import React, { useState } from "react";
import {
  ArrowRight,
  Eye,
  EyeClosed,
  KeyRound,
  Loader2,
  Mail,
  User,
} from "lucide-react";
import { useAuth } from "../context/authContext";
import { Link } from "react-router-dom";
function Register() {
  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const [error, setError] = useState("");
  const { registerUser, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
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
              </div>
              <div className="relative ">
                <div className="flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="outline-none ring-1 ring-slate-300 hover:ring-indigo-500 focus-within:ring-indigo-300 w-full pl-11 transition-colors"
                    value={data.password}
                    onChange={(e) => handleChange(e)}
                    name="password"
                    required
                  />
                  <KeyRound
                    className="absolute translate-y-1 ml-1 top-0"
                    size={18}
                    strokeWidth={1}
                  />

                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 mr-2"
                  >
                    {showPassword ? (
                      <EyeClosed size={18} strokeWidth={1} />
                    ) : (
                      <Eye size={18} strokeWidth={1} />
                    )}
                  </div>
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
                    type={showPassword ? "text" : "password"}
                    className="outline-none ring-1 ring-slate-300 hover:ring-indigo-500 focus-within:ring-indigo-300 w-full pl-11 transition-colors"
                    value={data.confirmPassword}
                    onChange={(e) => handleChange(e)}
                    name="confirmPassword"
                    required
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
                    required
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
              <button
                className="bg-slate-900 text-white w-full px-2 py-2 rounded-lg hover:bg-slate-700 transition-colors disabled:opacity-7"
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin text-indigo-800" />
                ) : (
                  "Register"
                )}
              </button>
              <Link
                className="flex item-center justify-center mt-2 group tracking-widest"
                to="/login"
              >
                <p className="text-[12px]">
                  Already have an account?{" "}
                  <span className="font-bold text-indigo-600">Login</span>
                </p>
                <ArrowRight
                  size={18}
                  strokeWidth={1}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
