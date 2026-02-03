"use client";
import { useState, useTransition } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import { updateTask,removeTask } from "../../lib/action/task";
import {Task} from "../types";
import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";

export default function TaskClient({ tasks }: { tasks: Task[] }) {

  const [isPending,startTransition] = useTransition();
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const toggleTaskCompletion = (id: string, completed:boolean) => {
    startTransition(async() => {
        await updateTask(id, completed);
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

      <div id="btn-group">
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

      <TaskForm />
    </div>
  );
}