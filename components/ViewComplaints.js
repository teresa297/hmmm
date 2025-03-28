import React, { useState } from "react";
import { Link } from "react-router-dom";

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([
    { id: 1, userType: "Customer", userName: "John Doe", description: "Late delivery", status: "Pending" },
    { id: 2, userType: "Employee", userName: "Jane Smith", description: "System crash", status: "In Progress" }
  ]);

  const handleStatusChange = (id, newStatus) => {
    setComplaints((prevComplaints) =>
      prevComplaints.map((complaint) =>
        complaint.id === id ? { ...complaint, status: newStatus } : complaint
      )
    );
  };

  return (
    <div className="container">
      <h1>All Complaints</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Complaint ID</th>
            <th>User Type</th>
            <th>User Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((complaint) => (
            <tr key={complaint.id}>
              <td>{complaint.id}</td>
              <td>{complaint.userType}</td>
              <td>{complaint.userName}</td>
              <td>{complaint.description}</td>
              <td>{complaint.status}</td>
              <td>
                <select
                  value={complaint.status}
                  onChange={(e) => handleStatusChange(complaint.id, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/admindashboard">
        <button className="back-btn" onClick={() => alert("Returning to Dashboard")}>Back to Dashboard</button>
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
  .back-btn {
    margin-top: 20px;
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
  }
  .back-btn:hover {
    background-color: #0056b3;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default ComplaintsPage;
