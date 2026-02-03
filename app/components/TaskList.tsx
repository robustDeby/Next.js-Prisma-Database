import TaskCard from './TaskCard';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[] | any;
  toggleTaskCompletion: (id: string, completed:boolean) => void;
  deleteTask: (id: string) => void;
}

export default function TaskList({
  tasks,
  toggleTaskCompletion,
  deleteTask,
}: TaskListProps) {
  return (
    <div id="taskList">
      {tasks?.map((task:Task) => (
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
