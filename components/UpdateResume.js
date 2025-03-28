import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UpdateResume = () => {
  // State for the resume text; in a real app, this might be loaded from a backend.
  const [resume, setResume] = useState("Your current resume content...");
  // State for flash messages (e.g., success or error messages)
  const [flashMessages, setFlashMessages] = useState([]);

  // Update state as the user types in the textarea
  const handleChange = (e) => {
    setResume(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate a resume update by logging the current resume value
    console.log("Resume Updated:", resume);
    // Display a success flash message
    setFlashMessages([{ category: "success", message: "Resume updated successfully!" }]);
  };

  // Automatically clear flash messages after 3 seconds
  useEffect(() => {
    if (flashMessages.length > 0) {
      const timer = setTimeout(() => setFlashMessages([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [flashMessages]);

  return (
    <div className="update-resume-container">
      <h2>Update Your Resume</h2>

      {/* Display flash messages */}
      {flashMessages.map((msg, index) => (
        <div key={index} className={msg.category}>
          {msg.message}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <label htmlFor="resume">Resume:</label>
        <br />
        <textarea
          id="resume"
          name="resume"
          rows="5"
          cols="50"
          value={resume}
          onChange={handleChange}
        ></textarea>
        <br />
        <br />
        <button type="submit">Update Resume</button>
      </form>
      <br />
      <Link to="/employeedashboard">
      <a href="/employee-dashboard">Back to Dashboard</a>
      </Link>
    </div>
  );
};

// Embedded CSS as a JavaScript string
const styles = `
  .update-resume-container {
    max-width: 600px;
    margin: 50px auto;
    padding: 20px;
    font-family: Arial, sans-serif;
    background: #fff;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  .update-resume-container h2 {
    text-align: center;
  }
  .update-resume-container label {
    font-weight: bold;
  }
  .update-resume-container textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }
  .update-resume-container button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .update-resume-container button:hover {
    background-color: #0056b3;
  }
  .update-resume-container a {
    display: block;
    text-align: center;
    margin-top: 20px;
    text-decoration: none;
    color: #007bff;
  }
  .update-resume-container a:hover {
    text-decoration: underline;
  }
  .success {
    color: green;
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
  }
  .error {
    color: red;
    font-weight: bold;
    text-align: center;
    margin-bottom: 15px;
  }
`;

// Append the CSS styles to the document head so they apply to this component.
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default UpdateResume;
