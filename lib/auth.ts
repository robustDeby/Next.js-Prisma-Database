'use server';
import { cookies } from "next/headers";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

const SESSION_KEY = "session";

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return null;

  const cookieStore = await cookies();
  cookieStore.set(SESSION_KEY, user.id, {
    httpOnly: true,
    sameSite: "lax",
  });

  return user;
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_KEY);
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const id = cookieStore.get(SESSION_KEY)?.value;

  if (!id) return null;
  return prisma.user.findUnique({ where: { id } });
}
