"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";


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
export async function updateTask(taskId: string, completed:boolean) {

  await prisma.task.update({
    where: {id:taskId},
    data:{completed: !completed}
  })
  revalidatePath('/pages/task')
}
export async function removeTask(taskId: string) {
  await prisma.task.delete({
    where:{id:taskId}
  })
  revalidatePath('/pages/task')
}