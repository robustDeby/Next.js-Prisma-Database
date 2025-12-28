"use client";
import 'bootstrap/dist/css/bootstrap.min.css';
import { loginAction,logoutAction } from "../action";

export default function LoginPage() {
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
          </div>
        </div>
      </header>

      {/* ================= CONTENT ================= */}
      <main className="container d-flex justify-content-center align-items-center py-5 main-section">
        <section className="w-100 max-w-md">
              <form action={loginAction} className="space-y-4">
                <div className="form-group mb-3">
                  <input
                    name="email"
                    placeholder="Email"
                    required
                    className="form-control"
                  />
                </div>
          
          
                <div className="form-group mb-3">
                  <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    className="form-control"
                  />
                </div>
          
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                  >
                    Login
                  </button>
                </div>
              </form>
        </section>
      </main>
    </div>
  );
}

