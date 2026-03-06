import React, { useState } from "react";
import "./AddTasks.css";

function AddTask({ addTask }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(title.trim());
    setTitle("");
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="task-input"
        placeholder="Enter a new task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit" className="add-btn">
        ➕ Add
      </button>
    </form>
  );
}

export default AddTask;