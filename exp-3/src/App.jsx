import { useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Editor from "./pages/Editor";
import Viewer from "./pages/Viewer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const navigate = useNavigate();

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);

    setUser(userData);
    navigate("/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
    navigate("/login");
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;

    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>

      {user && (
        <nav className="navbar">

          <h2>🔐 RBAC Portal</h2>

          <div className="nav-links">

            <Link to="/dashboard">
              Dashboard
            </Link>

            {user.role === "Admin" && (
              <Link to="/admin">
                👥 Users
              </Link>
            )}

            {(user.role === "Admin" ||
              user.role === "Editor") && (
              <Link to="/editor">
                ✏️ Editor
              </Link>
            )}

            <Link to="/viewer">
              👁️ Viewer
            </Link>

            <button onClick={toggleDarkMode}>
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>

            <button
              className="logout"
              onClick={logout}
            >
              Logout
            </button>

          </div>

        </nav>
      )}

      <Routes>

        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLogin={login} />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Admin",
                "Editor",
                "Viewer",
              ]}
            >
              <Dashboard user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editor"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Admin",
                "Editor",
              ]}
            >
              <Editor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/viewer"
          element={
            <ProtectedRoute
              allowedRoles={[
                "Admin",
                "Editor",
                "Viewer",
              ]}
            >
              <Viewer />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/login" />}
        />

      </Routes>

    </div>
  );
}

export default App;