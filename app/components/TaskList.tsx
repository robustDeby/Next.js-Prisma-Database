import TaskCard from './TaskCard';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[] | any;
  toggleTaskCompletion: (id: string) => void;
  deleteTask: (id: string) => void;
  isPending:boolean
}

export default function TaskList({
  tasks,
  toggleTaskCompletion,
  deleteTask,
  isPending
}: TaskListProps) {
  return (
    <div id="taskList">
      {tasks?.map((task:Task) => (
        <TaskCard
          key={task.id}
          task={task}
          toggleTaskCompletion={toggleTaskCompletion}
          deleteTask={deleteTask}
          isPending={isPending}
        />
      ))}
    </div>
  );
}
