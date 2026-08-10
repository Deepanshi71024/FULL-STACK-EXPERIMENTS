import { useState } from "react";

function Admin() {

  const [users, setUsers] =
    useState([
      {
        id: 1,
        name: "AdminUser",
        role: "Admin",
      },
      {
        id: 2,
        name: "EditorUser",
        role: "Editor",
      },
      {
        id: 3,
        name: "ViewerUser",
        role: "Viewer",
      },
    ]);

  const [newUser, setNewUser] =
    useState("");

  const [newRole, setNewRole] =
    useState("Viewer");

  const addUser = () => {

    if (!newUser.trim()) {
      return;
    }

    setUsers([
      ...users,
      {
        id: Date.now(),
        name: newUser,
        role: newRole,
      },
    ]);

    setNewUser("");
  };

  const deleteUser = (id) => {

    setUsers(
      users.filter(
        (user) => user.id !== id
      )
    );
  };

  return (
    <div className="container">

      <h1>👥 Admin Panel</h1>

      <div className="card">

        <h2>Add New User</h2>

        <input
          type="text"
          placeholder="Username"
          value={newUser}
          onChange={(e) =>
            setNewUser(e.target.value)
          }
        />

        <select
          value={newRole}
          onChange={(e) =>
            setNewRole(e.target.value)
          }
        >
          <option>Admin</option>
          <option>Editor</option>
          <option>Viewer</option>
        </select>

        <button
          className="primary"
          onClick={addUser}
        >
          ➕ Add User
        </button>

      </div>

      <div className="card">

        <h2>Users</h2>

        <table>

          <thead>
            <tr>
              <th>Username</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {users.map((user) => (

              <tr key={user.id}>

                <td>{user.name}</td>

                <td>
                  <span
                    className={`role ${user.role.toLowerCase()}`}
                  >
                    {user.role}
                  </span>
                </td>

                <td>

                  <button
                    className="danger"
                    onClick={() =>
                      deleteUser(user.id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Admin;