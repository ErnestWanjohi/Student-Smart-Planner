import React from "react";

function Dashboard({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Total Tasks: {total}</p>
      <p>Completed Tasks: {completed}</p>
    </div>
  );
}

export default Dashboard;