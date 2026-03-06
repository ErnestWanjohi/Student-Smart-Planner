import React from "react";
import "./Dashboard.css";

function Dashboard({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <div className="dashboard-cards">
        <div className="dashboard-card total">
          <span>Total Tasks</span>
          <strong>{total}</strong>
        </div>
        <div className="dashboard-card completed">
          <span>Completed</span>
          <strong>{completed}</strong>
        </div>
        <div className="dashboard-card pending">
          <span>Pending</span>
          <strong>{pending}</strong>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;