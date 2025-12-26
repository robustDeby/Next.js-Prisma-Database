"use client";
import { useState, useTransition } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { updateTask,removeTask } from "../action";
import {Task} from "../types";
import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";

export default function TaskClient({ tasks }: { tasks: Task[] }) {

  const [isPending,startTransition] = useTransition();
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const toggleTaskCompletion = (id: string) => {
    startTransition(async() => {
        await updateTask(id);
    })
  }

  const deleteTask = (id: string) => {
    removeTask(id);
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
        isPending = {isPending}
      />

      <TaskForm />
    </div>
  );
}