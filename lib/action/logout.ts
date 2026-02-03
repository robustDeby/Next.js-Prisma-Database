'use server'
import { cookies } from "next/headers";

const SESSION_KEY = "session";

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_KEY);
}
