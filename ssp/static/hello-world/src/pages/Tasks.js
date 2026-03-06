import React from "react";
import "./Tasks.css"; // Make sure to create this CSS file

function Tasks({ tasks, toggleTask, deleteTask }) {
  return (
    <div className="tasks-container">
      {tasks.length === 0 ? (
        <p className="no-tasks">No tasks yet. Add one above!</p>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="task-item">
            <span className={`task-title ${task.completed ? "completed" : ""}`}>
              {task.title}
            </span>
            <div className="task-buttons">
              <button
                className="toggle-btn"
                onClick={() => toggleTask(task.id)}
              >
                {task.completed ? "✅" : "⬜"}
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                🗑️
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Tasks;