// Importing necessary libraries and assets
import React, { useState, useEffect } from "react"; // React and its hooks
import { useNavigate } from "react-router-dom"; // For navigation between routes
import './App.css'; // CSS for styling the component
import logo from "./assets/logo.png"; // Logo asset for the header
import login from "./login"; 
import ApiRequestComponent from "./ApiRequestComponent";


// Dashboard component definition
const Dashboard = () => {
  // Initialize navigation hook for programmatic navigation
  const navigate = useNavigate();

  // State to hold categories and their checklists
  const [categories, setCategories] = useState([
    {
      id: 1,
      title: "General Checklists",
      checklists: [], // Initially no checklists
    },
  ]);

  // Function to load checklists from localStorage
  const loadChecklists = () => {
    // Retrieve checklists or initialize to an empty array if none exist
    const checklists = JSON.parse(localStorage.getItem("checklists")) || [];
    // Update state with the retrieved checklists
    setCategories([{ id: 1, title: "General Checklists", checklists }]);
  };

  // Effect to load checklists when the component mounts
  useEffect(() => {
    loadChecklists();
  }, []);

  // Effect to listen for changes in localStorage from other tabs
  useEffect(() => {
    const handleStorageChange = () => {
      loadChecklists(); // Reload checklists if storage changes
    };

    // Attach event listener to the storage event
    window.addEventListener("storage", handleStorageChange);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Handler to navigate to the new checklist creation page
  const handleNewChecklist = () => {
    navigate("/edit-checklist/new");
  };

  // Function to delete a checklist
  const deleteChecklist = (categoryId, checklistId) => {
    if (window.confirm("Do you want to delete this checklist?")) {
      // Update the categories state by removing the selected checklist
      const updatedCategories = categories.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              checklists: category.checklists.filter(
                (checklist) => checklist.id !== checklistId // Remove checklist by ID
              ),
            }
          : category
      );

      // Update state with the new category list
      setCategories(updatedCategories);

      // Sync changes to localStorage
      const updatedChecklists = updatedCategories[0]?.checklists || [];
      localStorage.setItem("checklists", JSON.stringify(updatedChecklists));
    }
  };

  // Navigate to the checklist details page when a checklist is clicked
  const handleChecklistClick = (checklistId) => {
    navigate(`/checklist-details/${checklistId}`);
  };

  // Function to determine the status and color of a checklist based on task completion
  const getStatusAndColor = (tasksDone, totalTasks) => {
    if (tasksDone === totalTasks && totalTasks > 0) {
      return { status: "Completed", color: "green" }; // All tasks done
    } else if (tasksDone === 0) {
      return { status: "Not started", color: "red" }; // No tasks started
    } else if (tasksDone > 0 && tasksDone < totalTasks) {
      return { status: "In progress", color: "orange" }; // Some tasks done
    }
    return { status: "Not started", color: "red" }; // Default status
  };

  // Function to calculate the percentage of tasks completed
  const getProgressPercentage = (checklist) => {
    const tasksDone = checklist.tasks?.filter((task) => task.status === 2).length || 0; // Tasks with status 2 are completed
    const totalTasks = checklist.tasks?.length || 0; // Total tasks
    return totalTasks > 0 ? (tasksDone / totalTasks) * 100 : 0; // Calculate percentage
  };

  return (
    <div>
      {/* Header section */}
      <header>
        <img src={logo} alt="Logo" className="logo" /> {/* Logo */}
        <h1>Pre-Flight Dashboard</h1> {/* Title */}
      </header>

      <main>
        {/* Button to create a new checklist */}
        <div className="new-btn-container">
          <button className="new-create-btn" onClick={handleNewChecklist}>
            + New
          </button>
        </div>

        {/* Conditional rendering: Show message if no checklists exist */}
        {categories[0].checklists.length === 0 ? (
          <div className="no-checklist">
            <p>No checklist created at this time.</p>
          </div>
        ) : (
          /* Render categories and their checklists */
          categories.map((category) => (
            <div key={category.id} className="category">
              <h2>{category.title}</h2> {/* Category title */}
              <div className="checklist-list">
                {category.checklists.map((checklist) => {
                  // Calculate progress and status for each checklist
                  const tasksDone = checklist.tasks?.filter((task) => task.status === 2).length || 0;
                  const totalTasks = checklist.tasks?.length || 0;
                  const { status, color } = getStatusAndColor(tasksDone, totalTasks);
                  const progressPercentage = getProgressPercentage(checklist);

                  return (
                    <div
                      key={checklist.id}
                      className="checklist-item"
                      onClick={() => handleChecklistClick(checklist.id)}
                    >
                      <div className="checklist-header">
                        <h3>{checklist.title}</h3> {/* Checklist title */}
                        <span className={`status ${color}`}>
                          {status} {/* Status with dynamic color */}
                        </span>
                      </div>
                      <p className="description">{checklist.description}</p> {/* Checklist description */}
                      <div className="progress">
                        <span>
                          {tasksDone}/{totalTasks} tasks performed
                        </span>
                        <div className="progress-bar">
                          <div
                            className="progress-bar-fill"
                            style={{
                              width: `${progressPercentage}%`, // Dynamic width
                              backgroundColor: color, // Dynamic color
                            }}
                          ></div>
                        </div>
                      </div>
                      <div className="actions">
                        {/* Edit button */}
                        <button
                          className="edit-btn"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event from propagating
                            navigate(`/edit-checklist/${checklist.id}`);
                          }}
                        >
                          ✏️ Edit
                        </button>
                        {/* Delete button */}
                        <button
                          className="delete-btn"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent event from propagating
                            deleteChecklist(category.id, checklist.id);
                          }}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
};

export default Dashboard; // Export the component for use in other parts of the app






















