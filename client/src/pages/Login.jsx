import {
  ArrowRight,
  Eye,
  EyeClosed,
  KeyRound,
  Loader2,
  Mail,
} from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "../context/authContext";
import Dashboard from "./Dashboard";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const { loginUser, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await loginUser(data);

    if (response?.success) {
      setTimeout(() => navigate("/dashboard"), 1200);
    }
  };

  return (
    <>
      <Dashboard />

      <div className="fixed inset-0 z-1000 flex items-center justify-center bg-slate-950/80 backdrop-blur-md px-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-700/70 bg-slate-950 p-6 shadow-2xl shadow-blue-950/40">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400 ring-1 ring-blue-400/30">
              <KeyRound size={26} strokeWidth={1.5} />
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-slate-400">
              Log in to continue managing your boards.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-300">
                Email
              </label>

              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                  strokeWidth={1.5}
                />

                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-10 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-slate-300">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs font-medium text-blue-400 hover:text-blue-300"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <KeyRound
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                  size={18}
                  strokeWidth={1.5}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-10 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? (
                    <EyeClosed size={18} strokeWidth={1.5} />
                  ) : (
                    <Eye size={18} strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center rounded-xl bg-blue-500 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Login"
              )}
            </button>

            <Link
              to="/register"
              className="group flex items-center justify-center gap-1 pt-2 text-sm text-slate-400"
            >
              Not registered?
              <span className="font-semibold text-blue-400">
                Create account
              </span>
              <ArrowRight
                size={16}
                className="transition group-hover:translate-x-1"
              />
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
