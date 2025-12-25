"use client";

import { useState } from 'react';
import { Task } from '../types';

interface TaskFormProps {
  addTask: (task: Task) => void;
}

export default function TaskForm({ addTask }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !dueDate) {
      alert("All fields are required!");
      return;
    }

    const newTask: Task = {
      id: Date.now(),
      title,
      description,
      dueDate,
      completed: false,
    };

    addTask(newTask);

    setTitle('');
    setDescription('');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <label htmlFor="taskTitle" className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          id="taskTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="taskDescription" className="form-label">Description</label>
        <textarea
          className="form-control"
          id="taskDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="taskDueDate" className="form-label">Due Date</label>
        <input
          type="date"
          className="form-control"
          id="taskDueDate"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-custom">
        Add Task
      </button>
    </form>
  );
}
