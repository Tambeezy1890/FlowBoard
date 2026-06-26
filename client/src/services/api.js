import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authoization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const authService = {
  login: async (userData) => {
    try {
      const response = await api.post("/api/v1/auth/login", userData);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  },
  getUser: () => {
    return JSON.parse(localStorage.getItem("User"));
  },
  register: async (userData) => {
    try {
      const response = await api.post("/api/v1/auth/register", userData);
      return response.data;
    } catch (err) {}
  },
};
export const taskService = {
  createBoard: async (data) => {
    const response = await api.post("/api/v1/boards", data);
    return response.data;
  },
  createTask: async () => {},
};
