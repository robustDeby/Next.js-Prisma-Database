import { prisma } from "@/lib/prisma";
import UserForm from "./components/user-form";
import { deleteUser } from "./action";

export default async function Page() {
  const users = await prisma.user.findMany({
    orderBy: { email: "asc" },
  });

  return (
    <main style={{ padding: 40 }}>
      <h1>Users</h1>

      <UserForm />

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {u.email} {u.name && `(${u.name})`}
            <form action={deleteUser.bind(null, u.id)}>
              <button type="submit">❌</button>
            </form>
          </li>
        ))}
      </ul>
    </main>
  );
}
