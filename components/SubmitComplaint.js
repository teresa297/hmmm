import React, { useState, useEffect } from "react";

const SubmitComplaint = () => {
  // State for complaint description (form input)
  const [complaintDescription, setComplaintDescription] = useState("");
  // State for storing submitted complaints (each complaint has id, description, and status)
  const [complaints, setComplaints] = useState([]);
  // State for flash messages (e.g., to show submission success)
  const [flashMessages, setFlashMessages] = useState([]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!complaintDescription) return;
    // Create a new complaint with a unique id (here, incremental)
    const newComplaint = {
      id: complaints.length + 1,
      description: complaintDescription,
      status: "Pending"
    };
    setComplaints([...complaints, newComplaint]);
    // Add a flash message
    setFlashMessages([
      ...flashMessages,
      { category: "success", message: "Complaint submitted successfully!" }
    ]);
    // Clear the form field
    setComplaintDescription("");
  };

  // Automatically clear flash messages after 3 seconds
  useEffect(() => {
    if (flashMessages.length > 0) {
      const timer = setTimeout(() => {
        setFlashMessages([]);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [flashMessages]);

  return (
    <div className="complaint-container">
      <h2 className="text-center">Submit a Complaint</h2>
      <p className="text-muted text-center">
        Both Employers and Employees can submit complaints
      </p>

      {/* Display flash messages */}
      {flashMessages.map((msg, index) => (
        <div key={index} className={`alert alert-${msg.category}`}>
          {msg.message}
        </div>
      ))}

      {/* Complaint submission form */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Complaint Description:
          </label>
          <textarea
            name="description"
            id="description"
            className="form-control"
            rows="4"
            placeholder="Describe your issue..."
            value={complaintDescription}
            onChange={(e) => setComplaintDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-submit w-100">
          Submit Complaint
        </button>
      </form>

      <hr />

      <h3 className="mt-4">Your Complaints</h3>
      {complaints.length > 0 ? (
        <table className="complaints-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((complaint) => (
              <tr key={complaint.id}>
                <td>{complaint.id}</td>
                <td>{complaint.description}</td>
                <td
                  className={
                    complaint.status === "Pending"
                      ? "status-pending"
                      : "status-resolved"
                  }
                >
                  {complaint.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-muted">No complaints submitted yet.</p>
      )}
    </div>
  );
};

// Embedded CSS as a JavaScript string
const styles = `
  body {
    background: #f4f4f4;
    font-family: Arial, sans-serif;
  }
  .complaint-container {
    max-width: 600px;
    margin: 50px auto;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
  }
  .text-center {
    text-align: center;
  }
  .text-muted {
    color: #6c757d;
  }
  .form-group {
    margin-bottom: 15px;
  }
  .form-label {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
  }
  .form-control {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }
  .btn {
    display: inline-block;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .btn-submit {
    background: #007bff;
    color: white;
  }
  .btn-submit:hover {
    background: #0056b3;
  }
  .w-100 {
    width: 100%;
  }
  .alert {
    padding: 10px;
    margin-bottom: 15px;
    border-radius: 5px;
  }
  .alert-success {
    background: #d4edda;
    color: #155724;
  }
  .complaints-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 15px;
  }
  .complaints-table th,
  .complaints-table td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  .status-pending {
    color: orange;
    font-weight: bold;
  }
  .status-resolved {
    color: green;
    font-weight: bold;
  }
  .mt-4 {
    margin-top: 1.5rem;
  }
`;

// Append the CSS to the document head
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default SubmitComplaint;
