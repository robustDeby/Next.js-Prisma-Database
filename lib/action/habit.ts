"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";



enum Frequency {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY"
}
export async function createHabit(formData:FormData) {
 const title = formData.get("title") as string;
  const frequencyString = formData.get("habitFrequency") as string; // get the value as string
  const frequency: Frequency | null = frequencyString ? (frequencyString as Frequency) : null; // Validate if it's a valid Frequency or null

  await prisma.habit.create({
    data: {
      title,
      frequency,
      date:[]
    },
  });
  revalidatePath('/pages/habit')
}
export async function updateHabit(habitId:string) {
  const newDate = new Date();
  const formattedDate = newDate.toISOString().split('T')[0]; // Get 'YYYY-MM-DD'
  await prisma.habit.update({
    where:{id:habitId},
    data:{
      date:{
        push:[formattedDate]
      }
    }
  })
  revalidatePath('/pages/habit')
}
export async function removeHabit(habitId:string) {
  await prisma.habit.delete({
    where:{id:habitId}
  })
  revalidatePath('/pages/habit')
}