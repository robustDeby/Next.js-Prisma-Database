import { useState, useEffect } from "react";
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
  const [statusCompletion, setStatusCompletion] = useState<number | undefined>(
    undefined
  ); // Make sure statusCompletion can be undefined

  useEffect(() => {
    const newDate = new Date();
    const formattedDate = newDate.toISOString().split("T")[0]; // Get 'YYYY-MM-DD'

    if (habit.frequency === "DAILY") {
      // If frequency is DAILY, check if the formatted date exists in habit.date
      const isCompleted = habit.date?.includes(formattedDate);
      
      setStatusCompletion(isCompleted === true? 1 : -1); // Mark as completed or active
      console.log("ISCOMPLETe", isCompleted, habit.date);
    } else {
      // For other frequencies, check the last date
      const lastElement = habit.date?.[habit.date.length - 1];
      if(lastElement === undefined) 
        setStatusCompletion(-1);
      else if (lastElement) {
        const targetDateObj = new Date(lastElement);
        if (isNaN(targetDateObj.getTime())) {
          throw new Error("Invalid date string");
        }
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - targetDateObj.getTime();
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        
        if (daysDifference < 7) {
          setStatusCompletion(1); // Mark as completed if older than 7 days
        } else {
          setStatusCompletion(-1); // Otherwise mark as active
        }
      }
    }
  }, [habit]); // Recalculate when habit changes

  return (
    <div
      className={`card habit-card ${statusCompletion !== -1 ? "finish" : ""}`}
    >
      <div className="card-body">
        <h5 className="habit-title">
          {habit.title}
          <h6 className="habit-frequency">( {habit.frequency} )</h6>
        </h5>
        <div className="task-actions">
          <button
            className="btn btn-success"
            onClick={() => toggleHabitCompletion(habit.id)}
            disabled={statusCompletion !== -1} // Disable if already completed
          >
            {statusCompletion === -1 ? "Mark as Active" : "Mark as Completed"}
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
