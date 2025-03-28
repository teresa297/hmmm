import React from "react";
import { Link } from "react-router-dom";

const ViewScheduledInterviews = () => {
  const interviews = [
    { jobTitle: "Software Engineer", dateTime: "2025-04-01 10:00 AM", mode: "Online", status: "Confirmed" },
    { jobTitle: "Data Analyst", dateTime: "2025-04-02 02:30 PM", mode: "Offline", status: "Pending" }
  ];

  return (
    <div className="container">
      <h2>Your Scheduled Interviews</h2>
      {interviews.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Date & Time</th>
              <th>Mode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((interview, index) => (
              <tr key={index}>
                <td>{interview.jobTitle}</td>
                <td>{interview.dateTime}</td>
                <td>{interview.mode}</td>
                <td>{interview.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No scheduled interviews.</p>
      )}
      <Link to="/employerdashboard">
      <a href="/dashboard" className="btn btn-secondary">Back to Dashboard</a>
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
  .btn-secondary {
    display: inline-block;
    margin-top: 20px;
    padding: 8px 12px;
    background-color: #6c757d;
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }
  .btn-secondary:hover {
    background-color: #545b62;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default ViewScheduledInterviews;
