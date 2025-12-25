"use client";

import { createUser } from "../action";

export default function UserForm() {
  return (
    <form action={createUser}>
      <input name="email" placeholder="email" required />
      <input name="name" placeholder="name" />
      <button type="submit">Add</button>
    </form>
  );
}
