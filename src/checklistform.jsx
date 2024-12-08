// Import required libraries and resources
import React, { useState, useEffect } from "react"; // React and its hooks
import { useNavigate, useParams } from "react-router-dom"; // For navigation and accessing route parameters
import "./App.css"; // CSS file for styling
import logo from "./assets/logo.png"; // Logo image for the application

// Define the ChecklistForm component
const ChecklistForm = () => {
  const navigate = useNavigate(); // Hook for navigation between pages
  const { id } = useParams(); // Extract the ID parameter from the URL

  // States for managing the checklist data
  const [title, setTitle] = useState(""); // Checklist title
  const [description, setDescription] = useState(""); // Checklist description
  const [tasks, setTasks] = useState([{ title: "", task: "", status: 0 }]); // Tasks list, initialized with one empty task

  // Load checklist data if an ID is provided (edit mode)
  useEffect(() => {
    if (id && id !== "new") {
      const checklists = JSON.parse(localStorage.getItem("checklists")) || []; // Get checklists from localStorage
      const checklistToEdit = checklists.find((item) => item.id === parseInt(id)); // Find the checklist to edit by ID
      if (checklistToEdit) {
        setTitle(checklistToEdit.title); // Set the title for editing
        setDescription(checklistToEdit.description); // Set the description for editing
        setTasks(checklistToEdit.tasks || []); // Set tasks for editing
      }
    }
  }, [id]); // Reload data when the ID changes

  // Add a new empty task to the tasks list
  const addTask = () => {
    setTasks([...tasks, { title: "", task: "", status: 0 }]);
  };

  // Remove a task from the tasks list by its index
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
  };

  // Update a specific task field (title, task, or status)
  const handleTaskChange = (index, field, value) => {
    const updatedTasks = tasks.map((task, taskIndex) =>
      taskIndex === index ? { ...task, [field]: value } : task
    );
    setTasks(updatedTasks); // Update the tasks state with the modified tasks
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the page from reloading

    // Calculate the number of tasks that are not started
    const tasksDone = tasks.filter((task) => task.status === 0).length;

    // Create a new checklist object
    const newChecklist = {
      id: id && id !== "new" ? parseInt(id) : Date.now(), // Use the existing ID or generate a new one
      title, // Title of the checklist
      description, // Description of the checklist
      tasks, // Tasks list
      tasksDone, // Number of tasks not started
      totalTasks: tasks.length, // Total number of tasks
    };

    // Retrieve existing checklists from localStorage
    let savedChecklists = JSON.parse(localStorage.getItem("checklists")) || [];

    // Update or add the checklist in the list
    if (id && id !== "new") {
      savedChecklists = savedChecklists.map((item) =>
        item.id === newChecklist.id ? newChecklist : item
      );
    } else {
      savedChecklists.push(newChecklist);
    }

    // Save the updated checklists back to localStorage
    localStorage.setItem("checklists", JSON.stringify(savedChecklists));

    alert("Checklist successfully saved!"); // Show a success message
    navigate("/dashboard"); // Navigate back to the dashboard
  };

  return (
    <div>
      {/* Page header */}
      <header>
        <img src={logo} alt="Logo" className="logo" /> {/* Display the logo */}
        <h1>Pre-Flight Form</h1> {/* Page title */}
      </header>

      <main>
        {/* Button to navigate back to the previous page */}
        <button
          className="back-button"
          onClick={() => navigate(-1)} // Navigate to the previous page
        >
          ← Back
        </button>

        <h2>Create/Edit a checklist</h2> {/* Subtitle */}

        {/* Checklist form */}
        <form onSubmit={handleSubmit}>
          {/* Input for the checklist title */}
          <label>
            Title of the checklist:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Update the title state
              required
            />
          </label>

          {/* Textarea for the checklist description */}
          <label>
            Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)} // Update the description state
              required
            ></textarea>
          </label>

          {/* Section for managing tasks */}
          <label>Tasks:</label>
          {tasks.map((task, index) => (
            <div key={index}>
              {/* Input for task title */}
              <label>Task Title:</label>
              <input
                type="text"
                value={task.title}
                onChange={(e) => handleTaskChange(index, "title", e.target.value)} // Update the task title
              />

              {/* Button to delete a specific task */}
              <button type="button" onClick={() => deleteTask(index)}>
                Delete Task
              </button>
            </div>
          ))}

          {/* Button to add a new task */}
          <button type="button" onClick={addTask}>
            + Add Task
          </button>

          {/* Submit button to save the checklist */}
          <button type="submit">Save</button>
        </form>
      </main>
    </div>
  );
};

export default ChecklistForm; // Export the component for use in other parts of the application







