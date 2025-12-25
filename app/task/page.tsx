"use client";
import { useState } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import "../globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Complete the Task UI",
      description:
        "Finish creating the user interface for the task manager project.",
      dueDate: "2025-12-25",
      completed: true,
    },
    {
      id: 2,
      title: "Set Up Backend",
      description: "Prepare the backend environment for the project.",
      dueDate: "2025-12-28",
      completed: false,
    },
  ]);

  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // if filter is 'all'
  });

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Task Manager</h2>

      <div className="d-flex justify-content-start mb-3 filter-buttons">
        <button
          className="btn btn-outline-primary"
          onClick={() => setFilter("all")}
        >
          All Tasks
        </button>
        <button
          className="btn btn-outline-success"
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className="btn btn-outline-secondary"
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <TaskList
        tasks={filteredTasks}
        toggleTaskCompletion={toggleTaskCompletion}
        deleteTask={deleteTask}
      />

      <TaskForm addTask={addTask} />
    </div>
  );
}
