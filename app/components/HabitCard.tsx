import { stat } from "node:fs/promises";
import { Habit } from "../types";

interface HabitCardProps {
  habit: Habit;
  toggleHabitCompletion: (id: string) => void;
  deleteHabit: (id: string) => void;
}

export default function HabitCard({
  habit,
  toggleHabitCompletion,
  deleteHabit,
}: HabitCardProps) {
  const newDate = new Date();
  const formattedDate = newDate.toISOString().split("T")[0]; // Get 'YYYY-MM-DD'
  const statusCompletion = habit.date?.indexOf(formattedDate)
  return (
    <div className={`card habit-card ${statusCompletion !== -1? "completed" : ""}`}>
      <div className="card-body">
        <h5 className="habit-title">
          {habit.title}
          <h6>( {habit.frequency} )</h6>
        </h5>
        <div className="task-actions">
          <button
            className="btn btn-success"
            onClick={() => toggleHabitCompletion(habit.id)}
            disabled={statusCompletion === -1?false:true}
          >
            {statusCompletion === -1 ? 'Mark as Active' : 'Mark as Completed'}
          </button>
          <button
            className="btn btn-danger"
            onClick={() => deleteHabit(habit.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
