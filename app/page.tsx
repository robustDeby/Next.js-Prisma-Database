import { prisma } from "@/lib/prisma";
import { deleteUser, logoutAction } from "./action";
import UserForm from "./components/user-form";
import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default async function Page() {

  const users = await prisma.user.findMany({
    orderBy: { email: "asc" },
  });

  return (
    <div className="min-h-screen bg-light">
      {/* ================= HEADER ================= */}
      <header className="bg-primary py-3 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="text-white m-0">Dashboard</h1>
          <div className="d-flex gap-3 align-items-center">
            <a href="/" className="text-white text-decoration-none">
              Register
            </a>
            <a href="/login" className="text-white text-decoration-none">
              Login
            </a>
            <form action={logoutAction}>
              <button className="btn btn-link text-white text-decoration-none">
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <main className="container d-flex justify-content-center align-items-center py-5 main-section">
        <section className="w-100 max-w-md">

          <UserForm />
{/* 
          <ul className="list-group mt-4">
            {users.map((u) => (
              <li
                key={u.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>{u.email}</span>
                <form action={deleteUser.bind(null, u.id)}>
                  <button className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </form>
              </li>
            ))}
          </ul> */}
        </section>
      </main>
    </div>
  );
}
