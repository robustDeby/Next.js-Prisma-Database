import TaskCard from './TaskCard';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  toggleTaskCompletion: (id: number) => void;
  deleteTask: (id: number) => void;
}

export default function TaskList({
  tasks,
  toggleTaskCompletion,
  deleteTask,
}: TaskListProps) {
  return (
    <div id="taskList">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
        />
      ))}
    </div>
  );
}
