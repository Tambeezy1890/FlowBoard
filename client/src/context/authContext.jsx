import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(() => {
    if (user === undefined) {
      setUser(authService.getUser);
    }
  }, []);
  const loginUser = async (userData) => {
    setLoading(true);
    try {
      const response = await authService.login(userData);
      localStorage.setItem("access-token", response["access-token"]);
      localStorage.setItem("User", JSON.stringify(response.user));
      setUser(response.user);
      toast.success("Login successful");
      return response;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to login";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  const registerUser = async (userData) => {
    setLoading(true);
    try {
      const response = await authService.register(userData);
      toast.success("Registration successful");
      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to register user";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };
  const value = {
    loginUser,
    user,
    loading,
    registerUser,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
