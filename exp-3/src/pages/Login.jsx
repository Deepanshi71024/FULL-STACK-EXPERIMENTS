import { useState } from "react";

function Login({ onLogin }) {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("Viewer");

  const [error, setError] =
    useState("");

  const handleLogin = (e) => {

    e.preventDefault();

    if (!username || !password) {
      setError(
        "Please enter username and password"
      );
      return;
    }

    // Mock JWT payload
    const payload = {
      username,
      role,
      exp: Date.now() + 60 * 60 * 1000,
    };

    const token = btoa(
      JSON.stringify(payload)
    );

    onLogin({
      username,
      role,
      token,
      exp: payload.exp,
    });
  };

  const demoLogin = (
    demoUser,
    demoRole
  ) => {

    const payload = {
      username: demoUser,
      role: demoRole,
      exp: Date.now() + 60 * 60 * 1000,
    };

    const token = btoa(
      JSON.stringify(payload)
    );

    onLogin({
      username: demoUser,
      role: demoRole,
      token,
      exp: payload.exp,
    });
  };

  return (
    <div className="login-container">

      <div className="login-box">

        <h1>🔐 Login</h1>

        <p className="subtitle">
          Role-Based Authentication
        </p>

        <form onSubmit={handleLogin}>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >
            <option value="Admin">
              Admin
            </option>

            <option value="Editor">
              Editor
            </option>

            <option value="Viewer">
              Viewer
            </option>
          </select>

          {error && (
            <p className="error">
              {error}
            </p>
          )}

          <button
            className="primary"
            type="submit"
          >
            Login
          </button>

        </form>

        <hr />

        <h3>Quick Demo Login</h3>

        <button
          onClick={() =>
            demoLogin("AdminUser", "Admin")
          }
        >
          👑 Login as Admin
        </button>

        <button
          onClick={() =>
            demoLogin("EditorUser", "Editor")
          }
        >
          ✏️ Login as Editor
        </button>

        <button
          onClick={() =>
            demoLogin("ViewerUser", "Viewer")
          }
        >
          👁️ Login as Viewer
        </button>

      </div>

    </div>
  );
}

export default Login;