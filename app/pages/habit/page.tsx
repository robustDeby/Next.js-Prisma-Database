import { prisma } from "@/lib/prisma";
import HabitClient from "../../components/HabitClient";
import { Habit,Frequency } from "../../types";

export default async function Page() {
  const habits = await prisma.habit.findMany({
    orderBy: { title: "asc" },
  });
 // Ensure that frequency is converted to the correct enum type
  const typedHabits: Habit[] = habits.map((habit) => ({
    ...habit,
    frequency: habit.frequency ? (habit.frequency as Frequency) : null, // cast frequency to the correct type
  }));
  return <HabitClient habits = {typedHabits}/>;
}
