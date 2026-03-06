import React, { useState, useEffect } from "react";
import { invoke } from "@forge/bridge";
import AddTask from "./pages/AddTasks";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";

function App() {
  const [tasks, setTasks] = useState([]);

  // Load tasks from backend
  useEffect(() => {
    const fetchTasks = async () => {
      const storedTasks = await invoke("getTasks");
      setTasks(storedTasks || []);
    };
    fetchTasks();
  }, []);

  // Save tasks helper
  const saveTasks = async (updatedTasks) => {
    setTasks(updatedTasks);
    await invoke("saveTasks", { tasks: updatedTasks });
  };

  // Add task
  const addTask = async (title) => {
    if (!title) return;
    const newTask = { id: Date.now(), title, completed: false };
    await saveTasks([...tasks, newTask]);
  };

  // Toggle completed
  const toggleTask = async (id) => {
    const updatedTasks = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    await saveTasks(updatedTasks);
  };

  // Delete with confirmation
  const deleteTask = async (id) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    if (window.confirm(`Delete "${task.title}"?`)) {
      const updatedTasks = tasks.filter((t) => t.id !== id);
      await saveTasks(updatedTasks);
    }
  };

  return (
    <div className="container">
      <h1>Student Smart Planner</h1>
      <AddTask addTask={addTask} />
      <Tasks tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
      <Dashboard tasks={tasks} />
    </div>
  );
}

export default App;