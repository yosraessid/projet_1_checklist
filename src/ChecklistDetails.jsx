// Import necessary libraries and resources
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './App.css'; // Stylesheet for the component
import logo from "./assets/logo.png"; // Logo for the application
import ApiRequestComponent from "./ApiRequestComponent";
// Define the ChecklistDetails component
const ChecklistDetails = () => {
    const { id } = useParams(); // Extract the checklist ID from the URL
    const navigate = useNavigate(); // Hook for navigation
    const [checklist, setChecklist] = useState(null); // State to hold the checklist details

    // Load the checklist from localStorage when the component mounts or the ID changes
    useEffect(() => {
        const loadChecklist = () => {
            const checklists = JSON.parse(localStorage.getItem("checklists")) || []; // Retrieve all checklists
            const checklistToDisplay = checklists.find((item) => item.id === parseInt(id)); // Find the checklist by ID
            if (checklistToDisplay) {
                setChecklist(checklistToDisplay); // Set the checklist state
            }
        };

        loadChecklist(); // Load the checklist initially

        // Set up a listener for changes to localStorage
        const handleStorageChange = () => loadChecklist();
        window.addEventListener("storage", handleStorageChange);

        // Clean up the listener on component unmount
        return () => window.removeEventListener("storage", handleStorageChange);
    }, [id]);

    // Update the status of a specific task
    const updateStatus = (taskId) => {
        if (!checklist) return; // Do nothing if no checklist is loaded

        // Toggle the task's status between "not completed" (0) and "completed" (2)
        const updatedTasks = checklist.tasks.map((task) =>
            task.id === taskId ? { ...task, status: task.status === 2 ? 0 : 2 } : task
        );

        // Update the checklist with the modified tasks
        const updatedChecklist = { ...checklist, tasks: updatedTasks };
        setChecklist(updatedChecklist);

        // Save the updated checklist back to localStorage
        const checklists = JSON.parse(localStorage.getItem("checklists")) || [];
        const updatedChecklists = checklists.map((item) =>
            item.id === checklist.id ? updatedChecklist : item
        );
        localStorage.setItem("checklists", JSON.stringify(updatedChecklists));
    };

    // Calculate the overall status of the checklist
    const getChecklistStatus = () => {
        if (!checklist) return { status: "Not started", color: "#f44336" }; // Default status if no checklist

        const totalTasks = checklist.tasks.length; // Total number of tasks
        const completedTasks = checklist.tasks.filter((task) => task.status === 2).length; // Number of completed tasks

        if (completedTasks === 0) return { status: "Not started", color: "#f44336" }; // No tasks completed
        if (completedTasks === totalTasks) return { status: "Completed", color: "#4caf50" }; // All tasks completed
        return { status: "In progress", color: "#ff9800" }; // Some tasks completed
    };

    // Display a loading message while the checklist is being loaded
    if (!checklist) return <div>Loading...</div>;

    // Get the calculated status and color for the checklist
    const { status, color } = getChecklistStatus();
    const tasksCompleted = checklist.tasks.filter((task) => task.status === 2).length; // Number of completed tasks
    const progressPercentage = (tasksCompleted / checklist.tasks.length) * 100; // Calculate progress percentage

    return (
        <div>
            {/* Header with logo and title */}
            <header>
                <img src={logo} alt="Logo" className="logo" />
                <h1>Pre-Flight Checklist</h1>
            </header>

            {/* Main content */}
            <main>
                <h2>Information on the Checklist</h2>

                {/* Section for editing checklist title and description */}
                <section className="bar combined-bar">
                    <div>
                        <label className="bar-label">Title:</label>
                        <input
                            type="text"
                            value={checklist.title}
                            onChange={(e) => {
                                const updatedChecklist = { ...checklist, title: e.target.value };
                                setChecklist(updatedChecklist);
                                const checklists = JSON.parse(localStorage.getItem("checklists")) || [];
                                const updatedChecklists = checklists.map((item) =>
                                    item.id === checklist.id ? updatedChecklist : item
                                );
                                localStorage.setItem("checklists", JSON.stringify(updatedChecklists));
                            }}
                            className="editable-input"
                        />
                    </div>
                    <br />
                    <div>
                        <label className="bar-label">Description:</label>
                        <textarea
                            value={checklist.description}
                            onChange={(e) => {
                                const updatedChecklist = { ...checklist, description: e.target.value };
                                setChecklist(updatedChecklist);
                                const checklists = JSON.parse(localStorage.getItem("checklists")) || [];
                                const updatedChecklists = checklists.map((item) =>
                                    item.id === checklist.id ? updatedChecklist : item
                                );
                                localStorage.setItem("checklists", JSON.stringify(updatedChecklists));
                            }}
                            className="editable-textarea"
                        />
                    </div>
                </section>

                {/* Section for displaying and updating tasks */}
                <section className="tasks">
                    <h3>Tasks:</h3>
                    <ul>
                        {checklist.tasks.map((task) => (
                            <li key={task.id}>
                                <input
                                    type="checkbox"
                                    id={`task-${task.id}`}
                                    checked={task.status === 2} // Mark as checked if completed
                                    onChange={() => updateStatus(task.id)} // Update the task's status
                                />
                                <label htmlFor={`task-${task.id}`}>{task.title}</label>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Section displaying the checklist's overall status and progress */}
                <section className="status-bar">
                    <div className="status">
                        <span>Status: </span>
                        <span className={`status-text`} style={{ color }}>
                            {status}
                        </span>
                    </div>
                    <div>
                        <div
                            className="progress"
                            style={{
                                width: `${progressPercentage}%`,
                                backgroundColor: color,
                                height: "10px",
                            }}
                        ></div>
                    </div>
                </section>
            </main>

            {/* Footer with a return button */}
            <footer className="footer">
                <button className="return-button" onClick={() => navigate('/dashboard')}>
                    Return to Pre-Flight Dashboard
                </button>
            </footer>
        </div>
    );
};

// Export the component for use in other parts of the application
export default ChecklistDetails;



















































