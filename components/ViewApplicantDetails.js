import React from "react";
import { Link } from "react-router-dom";

const ApplicantDetails = ({ applicant, jobs }) => {
  return (
    <div className="container">
      <h2>Applicant Details</h2>
      <p>
        <strong>Name:</strong> {applicant.name}
      </p>
      <p>
        <strong>Email:</strong> {applicant.email}
      </p>
      <p>
        <strong>Resume:</strong> <a href={applicant.resume} target="_blank" rel="noopener noreferrer">Download</a>
      </p>
      <p>
        <strong>Skills:</strong> {applicant.skills}
      </p>

      <h3>Applied Jobs</h3>
      {jobs.length > 0 ? (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <strong>{job.title}</strong> (Job ID: {job.id})
              <Link to="/scheduleinterview">
              <button className="btn btn-primary" onClick={() => scheduleInterview(applicant.id, job.id)}>
                Schedule Interview
              </button>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-danger">No jobs applied.</p>
      )}
      <Link to="/viewapplicants">
        <a href="/view-applicants" className="btn btn-secondary">Back to Applicants</a>
      </Link>
    </div>
  );
};

const scheduleInterview = (candId, jobId) => {
  alert(`Scheduling interview for Candidate ID: ${candId}, Job ID: ${jobId}`);
};

export default ApplicantDetails;

// CSS (inside the same JS file for single file requirement)
const styles = `
  .container {
    max-width: 600px;
    margin: auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  .btn {
    display: inline-block;
    margin: 10px 0;
    padding: 8px 12px;
    text-decoration: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .btn-primary {
    background-color: #007bff;
    color: white;
    border: none;
  }
  .btn-secondary {
    background-color: #6c757d;
    color: white;
    border: none;
  }
  .text-danger {
    color: red;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
