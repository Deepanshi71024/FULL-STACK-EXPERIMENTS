import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  allowedRoles,
}) {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Session expiry
  if (
    user.exp &&
    Date.now() > user.exp
  ) {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="container">
        <div className="error-page">
          <h1>403</h1>

          <h2>Access Denied</h2>

          <p>
            You don't have permission to
            access this page.
          </p>
        </div>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;