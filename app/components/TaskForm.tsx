
import { createTask } from "../action";

export default function TaskForm() {

  return (
    <form action={createTask} className="mb-4">
      <div className="mb-3">
        <label htmlFor="taskTitle" className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          name="taskTitle"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="taskDescription" className="form-label">Description</label>
        <textarea
          className="form-control"
          name="taskDesc"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="taskDueDate" className="form-label">Due Date</label>
        <input
          type="date"
          className="form-control"
          name="taskDueDate"
        />
      </div>

      <button type="submit" className="btn btn-custom">
        Add Task
      </button>
    </form>
  );
}
