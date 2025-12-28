"use client";

import { useEffect } from "react";
import { logoutAction } from "../action";
import "../globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Sublayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    // Dynamically load Bootstrap JS only on the client-side
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div className="min-h-screen bg-light">
      <header className="bg-primary py-3 shadow-sm">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="text-white m-0">Dashboard</h1>
          <div className="d-flex gap-3 align-items-center">
            <div className="d-flex gap-3 align-items-center">
              <a href="/pages/task" className="text-white text-decoration-none">
                Task
              </a>
              <a href="/pages/habit" className="text-white text-decoration-none">
                Habit
              </a>
            </div>
            <form action={logoutAction}>
              <button className="btn btn-link text-white text-decoration-none">
                Logout
              </button>
            </form>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
