import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const AddSkills = () => {
    const [skills, setSkills] = useState([]);
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [message, setMessage] = useState({ text: '', type: '' });

    // Mock skill data - replace with API call
    useEffect(() => {
        const fetchSkills = async () => {
            // Simulated API response
            const mockSkills = [
                { id: 1, name: 'JavaScript' },
                { id: 2, name: 'Python' },
                { id: 3, name: 'React' },
                { id: 4, name: 'Node.js' },
                { id: 5, name: 'HTML/CSS' },
                { id: 6, name: 'SQL' },
            ];
            setSkills(mockSkills);
        };
        fetchSkills();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate form submission
        setMessage({ text: 'Skills added successfully!', type: 'success' });
        setSelectedSkills([]);
        
        // Clear message after 3 seconds
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    };

    return (
        <div className="skills-container">
            <h2>Select Your Skills</h2>

            {message.text && (
                <div className={`alert alert-${message.type}`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <label htmlFor="skills-input">Choose skills:</label>
                <select
                    id="skills-input"
                    multiple
                    value={selectedSkills}
                    onChange={(e) => setSelectedSkills(
                        Array.from(e.target.selectedOptions, option => option.value)
                    )}
                    className="skills-select"
                    required
                >
                    {skills.map(skill => (
                        <option key={skill.id} value={skill.id}>
                            {skill.name}
                        </option>
                    ))}
                </select>
                
                <button type="submit" className="submit-button">
                    Add Skills
                </button>
            </form>

            <style jsx>{`
                .skills-container {
                    max-width: 600px;
                    margin: 2rem auto;
                    padding: 2rem;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    border-radius: 8px;
                }

                .alert {
                    padding: 1rem;
                    margin-bottom: 1.5rem;
                    border-radius: 4px;
                }

                .alert-success {
                    background-color: #e6ffee;
                    color: #2a662a;
                    border: 1px solid #9fdf9f;
                }

                .alert-error {
                    background-color: #ffe6e6;
                    color: #662a2a;
                    border: 1px solid #df9f9f;
                }

                .skills-select {
                    width: 100%;
                    min-height: 150px;
                    padding: 0.5rem;
                    margin: 1rem 0;
                    border: 2px solid #ccc;
                    border-radius: 4px;
                    font-size: 1rem;
                    background-color: white;
                }

                .skills-select:focus {
                    outline: none;
                    border-color: #646cff;
                    box-shadow: 0 0 0 2px rgba(100,108,255,0.2);
                }

                .submit-button {
                    display: block;
                    width: 100%;
                    padding: 0.75rem;
                    background-color: #646cff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }

                .submit-button:hover {
                    background-color: #4a52cc;
                }

                label {
                    font-weight: 500;
                    font-size: 0.9rem;
                    color: #333;
                }
            `}</style>
        </div>
    );
};

export default AddSkills;