import React, { useState } from "react";

const ViewJobs = () => {
  const [sortBy, setSortBy] = useState("date");
  const [jobs, setJobs] = useState([
    { id: 1, title: "Software Engineer", description: "Develop web applications", type: "Full-time", salary: 70000, employer: "TechCorp", postedOn: "2025-03-20" },
    { id: 2, title: "Data Scientist", description: "Analyze data trends", type: "Part-time", salary: 65000, employer: "DataX", postedOn: "2025-03-18" }
  ]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    let sortedJobs = [...jobs];
    if (event.target.value === "salary") {
      sortedJobs.sort((a, b) => b.salary - a.salary);
    } else if (event.target.value === "title") {
      sortedJobs.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      sortedJobs.sort((a, b) => new Date(b.postedOn) - new Date(a.postedOn));
    }
    setJobs(sortedJobs);
  };

  return (
    <div className="container">
      <h2>Available Jobs</h2>
      <label htmlFor="sort_by">Sort by:</label>
      <select id="sort_by" value={sortBy} onChange={handleSortChange}>
        <option value="date">Newest</option>
        <option value="salary">Salary</option>
        <option value="title">Title</option>
      </select>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Type</th>
            <th>Salary</th>
            <th>Employer</th>
            <th>Posted On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.description}</td>
              <td>{job.type}</td>
              <td>₹{job.salary}</td>
              <td>{job.employer}</td>
              <td>{job.postedOn}</td>
              <td>
                <button className="apply-btn" onClick={() => alert(`Applied for ${job.title}`)}>Apply</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Inline CSS
const styles = `
  .container {
    max-width: 900px;
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
  .apply-btn {
    background-color: green;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
  }
  .apply-btn:hover {
    background-color: darkgreen;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default ViewJobs;
