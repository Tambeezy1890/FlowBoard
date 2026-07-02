import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Invite from "./pages/Invite";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { Navigate, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          className: "",
          duration: 4000,
          style: {
            background: "#fff",
            color: "#000",
          },

          success: {
            duration: 3000,
            iconTheme: {
              primary: "green",
              secondary: "white",
            },
          },

          error: {
            duration: 3000,
            iconTheme: {
              primary: "red",
              secondary: "white",
            },
          },
        }}
        className="z-1000"
      />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/:token/accept"
          element={
            <ProtectedRoute>
              <Invite />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
