import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
  isPending:boolean
}

export default function TaskCard({
  task,
  toggleTaskCompletion,
  deleteTask,
  isPending,
}: TaskCardProps) {
  
  return (
    <div className={`card task-card ${task.completed ? 'completed' : ''}`}>
      <div className="card-body">
        <h5 className="task-title">{task.title}</h5>
        <p className="task-description">{task.description}</p>
        <p className="task-dueDate">Due Date: {task.dueDate}</p>
        <div className="task-actions">
          <button
            className="btn btn-success"
            onClick={() => toggleTaskCompletion(task.id)}
            disabled={task.completed === true?true:false}
          >
            {!task.completed ? 'Mark as Active' : 'Mark as Completed'}
          </button>
          <button
            className="btn btn-danger"
            onClick={() => deleteTask(task.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
