function Dashboard({ user }) {

  const permissions = {
    Admin: [
      "View Dashboard",
      "View Content",
      "Create Content",
      "Edit Content",
      "Delete Content",
      "Manage Users",
    ],

    Editor: [
      "View Dashboard",
      "View Content",
      "Create Content",
      "Edit Content",
    ],

    Viewer: [
      "View Dashboard",
      "View Content",
    ],
  };

  return (
    <div className="container">

      <h1>Dashboard</h1>

      <div className="welcome-card">

        <div className="avatar">
          {user.username
            .charAt(0)
            .toUpperCase()}
        </div>

        <div>
          <h2>
            Welcome, {user.username}! 👋
          </h2>

          <p>
            You are logged in as{" "}
            <strong>{user.role}</strong>.
          </p>
        </div>

      </div>

      <div className="stats">

        <div className="stat-card">
          <h3>🔐</h3>
          <p>Authentication</p>
          <strong>JWT</strong>
        </div>

        <div className="stat-card">
          <h3>👤</h3>
          <p>Your Role</p>
          <strong>{user.role}</strong>
        </div>

        <div className="stat-card">
          <h3>🛡️</h3>
          <p>Access</p>
          <strong>Authorized</strong>
        </div>

      </div>

      <div className="card">

        <h2>Your Permissions</h2>

        <ul className="permission-list">

          {permissions[user.role].map(
            (permission) => (
              <li key={permission}>
                ✅ {permission}
              </li>
            )
          )}

        </ul>

      </div>

    </div>
  );
}

export default Dashboard;