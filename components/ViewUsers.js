import React from "react";
import { Link } from "react-router-dom";

const ViewUsers = () => {
  const users = [
    { id: 1, username: "john_doe", email: "john@example.com", userType: "Admin" },
    { id: 2, username: "jane_smith", email: "jane@example.com", userType: "User" },
    { id: 3, username: "alice_johnson", email: "alice@example.com", userType: "Moderator" }
  ];

  return (
    <div className="container">
      <h1>All Users</h1>
      <table className="table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>User Type</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.userType}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/admindashboard">
        <button className="btn" onClick={() => alert("Returning to Dashboard")}>Back to Dashboard</button>
      </Link>
    </div>
  );
};

// Inline CSS
const styles = `
  .container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  .table th, .table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  .table th {
    background-color: #f4f4f4;
  }
  .btn {
    display: inline-block;
    margin-top: 20px;
    padding: 8px 12px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }
  .btn:hover {
    background-color: #0056b3;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default ViewUsers;
