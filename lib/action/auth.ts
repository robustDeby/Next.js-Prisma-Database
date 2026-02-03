'use server';
import { cookies } from "next/headers";
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const SESSION_KEY = "session";

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) return null;

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return null;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_KEY, user.id, {
    httpOnly: true,
    sameSite: "lax",
  });

  return user;
}


export async function getCurrentUser() {
  const cookieStore = await cookies();
  const id = cookieStore.get(SESSION_KEY)?.value;

  if (!id) return null;
  return prisma.user.findUnique({ where: { id } });
}
export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const user = await login(email, password);
  if (!user) throw new Error("Invalid credentials");

  redirect("/pages/task");
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