import HabitCard from './HabitCard';
import { Habit } from '../types';

interface HabitListProps {
  habits: Habit[] | any;
  toggleHabitCompletion: (id: string) => void;
  deleteHabit: (id: string) => void;
}

export default function HabitList({
  habits,
  toggleHabitCompletion,
  deleteHabit,
}: HabitListProps) {
  return (
    <div id="habitList">
      {habits?.map((habit:Habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          toggleHabitCompletion={toggleHabitCompletion}
          deleteHabit={deleteHabit}
        />
      ))}
    </div>
  );
}
