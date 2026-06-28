import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { BoardProvider } from "./context/BoardContext.jsx";
import { TaskProvider } from "./context/TaskContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <BoardProvider>
          <TaskProvider>
            <App />
          </TaskProvider>
        </BoardProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
