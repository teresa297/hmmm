import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const EmployerDashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);  // Initially set to null
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
      // Add any required fields here
      employerId: "", 
      filters: {} 
  });  // Add state declaration
    useEffect(() => {
        // Ensure we include cookies for session management
        fetch("http://localhost:5000/employer_dashboard", {
          method: "GET",
          credentials: "include",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch dashboard data");
                }
                return response.json();
            })
            .then(data => setDashboardData(data))
            .catch(error => setError(error.message));
    }, []);

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!dashboardData) {
        return <p>Loading...</p>; // Prevents "Cannot read properties of null" error
    }

    return (
        <div className="dashboard-container">
            <h1>Welcome, Employer</h1>
            <Link to="/viewapplicants">
                <button>
                    View Job Applicants
                </button>
            </Link>
            <Link to="/employer">
                <button>
                    Post a New Job
                </button>
            </Link>
            <Link to="/submitcomplaint">
                <button>
                    Submit Complaint
                </button>
            </Link>
            <Link to="/viewscheduledinterviews">
                <button>
                    View Interviews
                </button>
            </Link>
            <Link to="/login">
                <button>
                    Logout
                </button>
            </Link>
        </div>
    );
};

// Embedded CSS styles
const styles = `
  body {
    font-family: Arial, sans-serif;
    text-align: center;
    padding: 20px;
    margin: 0;
    position: relative;
  }

  .dashboard-container {
    max-width: 600px;
    margin: 0 auto;
  }

  button {
    display: block;
    margin: 10px auto;
    padding: 10px;
    font-size: 16px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    width: 220px;
  }

  button:hover {
    background-color: #0056b3;
  }
`;

// Add styles to document
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default EmployerDashboard;
