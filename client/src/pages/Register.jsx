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
  const [showPassword, setShowPassword] = useState(false);

  const { registerUser, loading } = useAuth();

  const handleChange = (e) => {
    setError("");
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    await registerUser(data);
  };

  const inputClass =
    "w-full rounded-xl border border-slate-700 bg-slate-900 px-10 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20";

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-700/70 bg-slate-950 p-6 shadow-2xl shadow-blue-950/40">
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400 ring-1 ring-blue-400/30">
            <User size={26} strokeWidth={1.5} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white">
            Create account
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Sign up and start building your boards.
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-xl border border-rose-400/30 bg-rose-500/10 px-3 py-2 text-sm text-rose-300">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="relative">
            <User
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
              required
              placeholder="Username"
              className={inputClass}
            />
          </div>

          <div className="relative">
            <Mail
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              required
              placeholder="Email address"
              className={inputClass}
            />
          </div>

          <div className="relative">
            <KeyRound
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className={inputClass}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <KeyRound
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
              size={18}
            />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm password"
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl bg-blue-500 py-3 text-sm font-semibold text-white transition hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              "Create account"
            )}
          </button>

          <Link
            to="/login"
            className="group flex items-center justify-center gap-1 pt-2 text-sm text-slate-400"
          >
            Already have an account?
            <span className="font-semibold text-blue-400">Login</span>
            <ArrowRight
              size={16}
              className="transition group-hover:translate-x-1"
            />
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
