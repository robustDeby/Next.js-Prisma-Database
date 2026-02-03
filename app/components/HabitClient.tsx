"use client";
import HabitForm from "../components/HabitForm";
import HabitList from "./HabitList";
import { updateHabit,removeHabit } from "../../lib/action/habit";
import {Habit} from "../types";
import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";

export default function HabitClient({habits} :{habits:Habit[]}) {

  const toggleHabitCompletion = (id: string) => {
    updateHabit(id);
  }
  const deleteHabit = (id:string) => {
    removeHabit(id);
  }

  return (
    <div className="container mt-5">
      <HabitList 
        habits ={habits}
        toggleHabitCompletion={toggleHabitCompletion}
        deleteHabit={deleteHabit}   
      />
      <HabitForm />
    </div>
  );
}