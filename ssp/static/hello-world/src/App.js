import React, { useState, useEffect } from "react";
import { invoke } from "@forge/bridge";
import AddTask from "./pages/AddTasks";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";
import Modal from "./components/Modal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState({ show: false, taskId: null });

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

const deleteTask = (id) => {
  setModal({ show: true, taskId: id });
};

const handleConfirmDelete = async () => {
  // Hide the modal immediately
  setModal({ show: false, taskId: null });

  // Then delete the task asynchronously
  const updatedTasks = tasks.filter((t) => t.id !== modal.taskId);
  await saveTasks(updatedTasks);
};

const handleCancelDelete = () => {
  setModal({ show: false, taskId: null });
};

  return (
    <div className="container">
      <h1>Student Smart Planner</h1>

      {/* Add task form */}
      <AddTask addTask={addTask} />

      {/* Task list */}
      <Tasks tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />

      {/* Dashboard summary */}
      <Dashboard tasks={tasks} />

      {/* Delete confirmation modal */}
      <Modal
        show={modal.show}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}

export default App;