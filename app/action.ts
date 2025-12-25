"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { login, logout} from "@/lib/auth";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";


/* -------------- Auth ------------*/

export async function loginAction(formData:FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const user = await login(email, password);
  if(!user) throw new Error('Invalid credentials');

  redirect('/');
}

export async function logoutAction() {
  logout();
  redirect('/login')
}


export async function createUser(formData: FormData) {
  
  const email = formData.get("email") as string;
  const name = formData.get("name") as string | null;
  const userPassword = formData.get('password') as string;
  const password = await bcrypt.hash(userPassword, 10);

  await prisma.user.create({
    data: { email, name, password },
  });

  revalidatePath("/");
}

export async function deleteUser(id: string) {
  await prisma.user.delete({ where: { id } });
  revalidatePath("/");
}
