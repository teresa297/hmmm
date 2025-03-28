import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewApplicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch applicants and job data from the backend
    const fetchData = async () => {
      try {
        const applicantsResponse = await axios.get("/api/get_all_applicants"); // Endpoint to get applicants
        setApplicants(applicantsResponse.data);

        const jobsResponse = await axios.get("/api/get_jobs"); // Endpoint to get jobs
        setJobs(jobsResponse.data);
      } catch (err) {
        setError("Failed to fetch data.");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!applicants.length || !jobs.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Applicants by Job</h2>
      {jobs.map((job) => (
        <div key={job.id}>
          <div className="job-title">{job.title}</div>
          <table className="table">
            <thead>
              <tr>
                <th>Candidate Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {job.candidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td>{candidate.name}</td>
                  <td>
                    <Link to={`/view_applicant_details/${candidate.id}`} className="btn">
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <h2>All Applicants</h2>
      {applicants.map((applicant) => (
        <div key={applicant.id}>
          <h3>{applicant.name}</h3>
          <p><strong>Username:</strong> {applicant.username}</p>
          <p><strong>Email:</strong> {applicant.email}</p>
          <p><strong>Resume:</strong> <a href={applicant.resume} target="_blank" rel="noopener noreferrer">View Resume</a></p>
          <p><strong>Skills:</strong> {applicant.skills.join(", ")}</p>
          <p><strong>Job Titles Applied:</strong> {applicant.job_titles.join(", ")}</p>
          <p><strong>Job IDs:</strong> {applicant.job_ids.join(", ")}</p>

          {/* Link to view more details of the applicant */}
          <Link to={`/view_applicant_details/${applicant.id}`} className="btn">
            View Applicant Details
          </Link>
        </div>
      ))}
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
  .job-title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 20px;
  }
  .table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
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
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    text-decoration: none;
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

export default ViewApplicants;
