import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard"; // Importing the Dashboard component
import ChecklistDetails from "./ChecklistDetails"; // Importing the ChecklistDetails component
import Checklistform from "./checklistform"; // Importing the Checklistform component
import "./App.css"; // Importing the CSS file for styling
import login from "./login"; // Importing the login module (though it is not used in this code)
import ApiRequestComponent from "./ApiRequestComponent";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* Route for editing an existing checklist */}
        <Route path="/edit-checklist/:id" element={<Checklistform />} />

        {/* Additional route for the dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Route for displaying details of a specific checklist */}
        <Route path="/checklist-details/:id" element={<ChecklistDetails />} />
      </Routes>
    </Router>
  );
};

export default App;






