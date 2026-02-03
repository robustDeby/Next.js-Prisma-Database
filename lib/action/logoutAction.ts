import { redirect } from "next/navigation";
import { logout } from "./logout";

export async function logoutAction() {
  logout();
  redirect("/login");
}