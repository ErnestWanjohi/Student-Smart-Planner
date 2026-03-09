import React, { useState, useEffect } from "react";
import { invoke } from "@forge/bridge";
import AddTask from "./pages/AddTasks";
import Tasks from "./pages/Tasks";
import Dashboard from "./pages/Dashboard";
import Modal from "./components/Modal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState({ show: false, taskId: null });

  // Load tasks from backend when app loads
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const storedTasks = await invoke("getTasks");
        setTasks(storedTasks || []);
      } catch (error) {
        console.error("Error loading tasks:", error);
      }
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
    if (!title.trim()) return;

    const newTask = {
      id: Date.now(),
      title,
      completed: false
    };

    const updatedTasks = [...tasks, newTask];
    await saveTasks(updatedTasks);
  };

  // Toggle task completion
  const toggleTask = async (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    await saveTasks(updatedTasks);
  };

  // Show delete modal
  const deleteTask = (id) => {
    setModal({ show: true, taskId: id });
  };

  // Confirm delete
  const handleConfirmDelete = async () => {
    const taskId = modal.taskId;

    const updatedTasks = tasks.filter((task) => task.id !== taskId);

    await saveTasks(updatedTasks);

    setModal({ show: false, taskId: null });
  };

  // Cancel delete
  const handleCancelDelete = () => {
    setModal({ show: false, taskId: null });
  };

  return (
    <div className="container">
      <h1>Student Smart Planner</h1>

      {/* Add Task */}
      <AddTask addTask={addTask} />

      {/* Task List */}
      <Tasks
        tasks={tasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />

      {/* Dashboard */}
      <Dashboard tasks={tasks} />

      {/* Confirmation Modal */}
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