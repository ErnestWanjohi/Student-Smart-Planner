import React from "react";

function Tasks({ tasks, toggleTask, deleteTask }) {
  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />

            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                marginRight: "10px",
              }}
            >
              {task.title}
            </span>

            <button
  onClick={() => {
    if (window.confirm(`Delete task: "${task.title}"?`)) {
      deleteTask(task.id);
    }
  }}
  style={{
    background: "#ff5630",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "5px 10px",
    cursor: "pointer",
  }}
>
  Delete
</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;