import React, { useState } from "react";

function AddTask({ addTask }) {
  const [title, setTitle] = useState("");

  const handleAdd = () => {
    addTask(title);
    setTitle("");
  };

  return (
    <div>
      <h2>Add Task</h2>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

export default AddTask;