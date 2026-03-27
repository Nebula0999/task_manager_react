import React, { useState } from "react";
import { getCurrentUser, loginUser } from "../services";
import { useAuth } from "./AuthContext";

const initialForm = {
  username: "",
  password: "",
};

export default function LoginUser({ onLoggedIn }) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { setAuth } = useAuth();

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setMessage("");

    try {
      const loginResult = await loginUser(form);
      const profile = await getCurrentUser(loginResult.token);
      setAuth({ token: loginResult.token, user: profile });
      localStorage.setItem("findke_auth_user", JSON.stringify(profile));
      setMessage(`Welcome back, ${profile.username}.`);

      if (onLoggedIn) {
        onLoggedIn({ token: loginResult.token, user: profile });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_20%_15%,#fef3c7_0%,transparent_35%),radial-gradient(circle_at_80%_85%,#bfdbfe_0%,transparent_32%),#f8fafc] p-5 [font-family:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
      <section className="w-full max-w-[420px] rounded-[18px] border border-slate-300 bg-white/95 p-6 shadow-[0_20px_45px_rgba(30,41,59,0.16)]">
        <h1 className="mb-[6px] text-[28px]">Sign In</h1>
        <p className="mb-5 text-slate-700">Access your Task Manager account.</p>

        <form onSubmit={handleSubmit} className="grid gap-[14px]">
          <label className="grid gap-[6px] font-semibold text-slate-800">
            Username
            <input
              name="username"
              value={form.username}
              onChange={handleChange}
              required
              className="rounded-[10px] border border-slate-400 px-3 py-[11px] text-sm"
            />
          </label>

          <label className="grid gap-[6px] font-semibold text-slate-800">
            Password
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="rounded-[10px] border border-slate-400 px-3 py-[11px] text-sm"
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className="mt-[6px] cursor-pointer rounded-[10px] bg-gradient-to-br from-teal-700 to-blue-600 px-[14px] py-3 text-[15px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {error ? <p className="mt-3 font-semibold text-red-700">{error}</p> : null}
        {message ? <p className="mt-3 font-semibold text-green-800">{message}</p> : null}
      </section>
    </main>
  );
}
