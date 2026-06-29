import axios from "axios";
const baseURL = import.meta.env.DEV
  ? "http://localhost:5050"
  : "https://flowboard-production-4eff.up.railway.app";

const api = axios.create({
  baseURL,
  withCredentials: true,
});

const clearAuthAndLogout = () => {
  localStorage.removeItem("access-token");
  localStorage.removeItem("User");

  // force app to reset all React state/context
  window.location.href = "/login";
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let refreshQueue = [];

const processQueue = (error, token = null) => {
  refreshQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  refreshQueue = [];
};

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

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isRefreshRoute = originalRequest.url?.includes(
      "/api/v1/auth/refresh-token"
    );

    const isAuthRoute =
      originalRequest.url?.includes("/api/v1/auth/login") ||
      originalRequest.url?.includes("/api/v1/auth/register");

    if (isRefreshRoute) {
      clearAuthAndLogout();
      return Promise.reject(error);
    }

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      isAuthRoute
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push({ resolve, reject });
      })
        .then((newToken) => {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    isRefreshing = true;

    try {
      const refreshResponse = await api.post("/api/v1/auth/refresh-token");

      const newAccessToken = refreshResponse.data?.accessToken;

      if (!newAccessToken) {
        throw new Error("Refresh succeeded but no access token returned");
      }

      localStorage.setItem("access-token", newAccessToken);

      api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      processQueue(null, newAccessToken);

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearAuthAndLogout();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
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
  deleteBoard: async (boardId) => {
    try {
      const response = await api.delete(`/api/v1/boards/${boardId}`);
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
  updateColumn: async (boardId, columnId, columnData) => {
    const response = await api.patch(
      `/api/v1/boards/${boardId}/columns/${columnId}`,
      columnData
    );
    return response.data;
  },
  deleteColumn: async (columnId, boardId) => {
    const response = await api.delete(
      `/api/v1/boards/${boardId}/columns/${columnId}`
    );
    return response.data;
  },
};

export const taskService = {
  createTask: async (boardId, taskData) => {
    const response = await api.post(
      `/api/v1/boards/${boardId}/tasks`,
      taskData
    );
    return response.data;
  },
  getTasks: async (boardId) => {
    const response = await api.get(`/api/v1/boards/${boardId}/tasks`);
    return response.data;
  },
  getTask: async (boardId, taskId) => {
    const response = await api.get(`/api/v1/boards/${boardId}/tasks/${taskId}`);
    return response.data;
  },
  deleteTask: async (boardId, taskId) => {
    const response = await api.delete(
      `/api/v1/boards/${boardId}/tasks/${taskId}`
    );
    return response.data;
  },
  updateTask: async (boardId, taskId, taskData) => {
    const response = await api.patch(
      `/api/v1/boards/${boardId}/tasks/${taskId}`,
      taskData
    );
    return response.data;
  },
  moveTask: async (boardId, taskId, taskData) => {
    const response = await api.patch(
      `/api/v1/boards/${boardId}/tasks/${taskId}/move`,
      taskData
    );
    return response.data;
  },
};
