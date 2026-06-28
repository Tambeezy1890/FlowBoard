import axios from "axios";
import { ChevronsDown } from "lucide-react";

const api = axios.create({
  baseURL: "http://localhost:5050",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");

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
  async (error) => {
    const originalRequest = error.config;

    const isRefreshRoute = originalRequest?.url?.includes(
      "/auth/refresh-token"
    );

    if (isRefreshRoute) {
      localStorage.clear();
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshResponse = await api.post("/api/v1/auth/refresh-token");

      const newAccessToken = refreshResponse.data.accessToken;

      localStorage.setItem("access-token", newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    }

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
export const boardService = {
  createBoard: async (data) => {
    try {
      const response = await api.post("/api/v1/boards", data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  getBoards: async () => {
    const response = await api.get("/api/v1/boards");
    return response.data;
  },
  getBoard: async (boardId) => {
    try {
      const response = await api.get(`/api/v1/boards/${boardId}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  createColumn: async (columns, boardId) => {
    try {
      const response = await api.post(
        `/api/v1/boards/${boardId}/columns`,
        columns
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
  deleteBoard: async (boardId) => {
    try {
      const response = await api.delete(`/api/v1/boards/${boardId}`);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  },
};

export const taskService = {
  createTask: async () => {
    try {
    } catch (err) {
      console.error(err);
    }
  },
};
