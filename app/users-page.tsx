"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  email: string;
  name?: string | null;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  async function fetchUsers() {
    const res = await fetch("/api/users");
    setUsers(await res.json());
  }

  async function createUser() {
    await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name }),
    });
    setEmail("");
    setName("");
    fetchUsers();
  }

  async function deleteUser(id: string) {
    await fetch(`/api/users?id=${id}`, { method: "DELETE" });
    fetchUsers();
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <main style={{ padding: 40, maxWidth: 600 }}>
      <h1>Users CRUD</h1>

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={createUser}>Add</button>

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.email} {u.name && `(${u.name})`}
            <button onClick={() => deleteUser(u.id)}>❌</button>
          </li>
        ))}
      </ul>
    </main>
  );
}

