import React from "react";
import { Link } from "react-router-dom";

const MatchingJobs = () => {
  // Dummy data for demonstration purposes.
  // In a real app, you might fetch these from an API.
  const perfectMatchJobs = [
    {
      id: 1,
      title: "Software Engineer",
      description: "Develop high-quality software.",
      type: "Full-Time",
      salary: "$100k",
      employer: "TechCorp",
    },
    {
      id: 2,
      title: "Data Scientist",
      description: "Analyze data and build models.",
      type: "Full-Time",
      salary: "$110k",
      employer: "DataWorks",
    },
  ];

  const partialMatchJobs = [
    {
      id: 3,
      description: "QA Engineer needed for contract work.",
      type: "Contract",
      employer: "Quality Inc.",
    },
    {
      id: 4,
      description: "Customer Support role available.",
      type: "Part-Time",
      employer: "HelpDesk Co.",
    },
  ];

  // Function to handle applying for a job
  const applyJob = (jobId) => {
    // Redirect to the apply page (in a real app, you may handle this differently)
    window.location.href = `/apply-job/${jobId}`;
  };

  return (
    <div className="matching-jobs-container">
      <h2>Perfectly Matching Jobs</h2>
      {perfectMatchJobs.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Type</th>
              <th>Salary</th>
              <th>Employer</th>
              <th>Apply</th>
            </tr>
          </thead>
          <tbody>
            {perfectMatchJobs.map((job) => (
              <tr key={job.id}>
                <td>{job.id}</td>
                <td>{job.title}</td>
                <td>{job.description}</td>
                <td>{job.type}</td>
                <td>{job.salary}</td>
                <td>{job.employer}</td>
                <td>
                  <button
                    className="apply-link"
                    onClick={() => applyJob(job.id)}
                  >
                    Apply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-jobs">No perfect matches found.</p>
      )}

      <h2>Jobs Matching At Least One Skill</h2>
      {partialMatchJobs.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Description</th>
              <th>Type</th>
              <th>Employer</th>
              <th>Apply</th>
            </tr>
          </thead>
          <tbody>
            {partialMatchJobs.map((job) => (
              <tr key={job.id}>
                <td>{job.id}</td>
                <td>{job.description}</td>
                <td>{job.type}</td>
                <td>{job.employer}</td>
                <td>
                  <button
                    className="apply-link"
                    onClick={() => applyJob(job.id)}
                  >
                    Apply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-jobs">No partial matches found.</p>
      )}
      <Link to="/employeedashboard">
      <a href="/employee-dashboard" className="back-btn">
        Back to Dashboard
      </a>
      </Link>
    </div>
  );
};

// Embedded CSS as a JavaScript string
const styles = `
  .matching-jobs-container {
    font-family: Arial, sans-serif;
    margin: 20px;
    padding: 20px;
  }
  h2 {
    color: #333;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  th, td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  th {
    background-color: #f4f4f4;
  }
  .no-jobs {
    color: red;
    font-weight: bold;
    margin-top: 10px;
  }
  .back-btn {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 5px;
  }
  .back-btn:hover {
    background-color: #0056b3;
  }
  .apply-link {
    background: none;
    border: none;
    color: green;
    cursor: pointer;
    text-decoration: underline;
    font-size: 1em;
  }
`;

// Append the CSS styles to the document head so they are applied to the component.
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default MatchingJobs;
