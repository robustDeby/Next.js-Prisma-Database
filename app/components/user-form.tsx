"use client";

import { createUser } from "../../lib/action/auth";

export default function UserForm() {
  return (
    <form action={createUser} className="space-y-4">
      <div className="form-group mb-3">
      <div className="form-group mb-3">
        <input
          name="name"
          placeholder="Name"
          className="form-control"
        />
      </div>
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
          Add
        </button>
      </div>
    </form>
  );
}
