import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5050",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    localStorage.clear();
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (userData) => {
    try {
      const response = await api.post("/api/v1/auth/login", userData);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  getUser: () => {
    return JSON.parse(localStorage.getItem("User"));
  },
  register: async (userData) => {
    try {
      const response = await api.post("/api/v1/auth/register", userData);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
};
export const taskService = {
  createBoard: async (data) => {
    try {
      const response = await api.post("/api/v1/boards", data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  getBoards: async () => {
    try {
      const response = await api.get("/api/v1/boards");
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  getBoard: async (boardId) => {
    try {
      const response = await api.get(`/api/v1/boards/${boardId}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  createTask: async () => {
    try {
    } catch (err) {
      console.error(err);
    }
  },
};
