"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { login, logout } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

/* -------------- Auth ------------*/

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await login(email, password);
  if (!user) throw new Error("Invalid credentials");

  redirect("/pages/task");
}
export async function logoutAction() {
  logout();
  redirect("/login");
}
export async function createUser(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string | null;
  const userPassword = formData.get("password") as string;
  const password = await bcrypt.hash(userPassword, 10);

  await prisma.user.create({
    data: { email, name, password },
  });

  revalidatePath("/pages/task");
}
export async function deleteUser(id: string) {
  await prisma.user.delete({ where: { id } });
  revalidatePath("/");
}

/* ------------- Task ----------- */
export async function createTask(formData: FormData) {
  const title = formData.get("taskTitle") as string;
  const description = formData.get("taskDesc") as string;
  const dueDate = formData.get("taskDueDate") as string;

  await prisma.task.create({
    data: {
      title,
      description,
      dueDate,
      completed:false
    },
  });
  revalidatePath('/')
}
export async function updateTask(taskId: string) {
  await prisma.task.update({
    where: {id:taskId},
    data:{completed: true}
  })
  revalidatePath('/pages/task')
}
export async function removeTask(taskId: string) {
  await prisma.task.delete({
    where:{id:taskId}
  })
  revalidatePath('/pages/task')
}

/* ----------- Habit ------------ */

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