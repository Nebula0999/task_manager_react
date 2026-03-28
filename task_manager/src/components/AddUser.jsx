import { useState } from "react";
import { registerUser } from "../services";

const initialForm = {
	username: "",
	email: "",
	password: "",
	first_name: "",
	last_name: "",
};

export default function AddUser({ onRegistered }) {
	const [form, setForm] = useState(initialForm);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	function handleChange(event) {
		const { name, value } = event.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setError("");
		setSuccess("");
		setSubmitting(true);

		try {
			const data = await registerUser(form);
			setSuccess(`User ${data.user.username} created successfully.`);
			setForm(initialForm);

			if (onRegistered) {
				onRegistered(data);
			}
		} catch (err) {
			setError(err.message);
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<div className="items-center justify-center text-center grid place-content-center m-4">
		<section className="w-full max-w-[480px] rounded-2xl border border-slate-300 bg-slate-50 p-6 shadow-[0_12px_30px_rgba(15,23,42,0.1)] [font-family:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
			<h2 className="mb-2">Create Account</h2>
			<p className="mb-4 text-slate-700">Register a new Task Manager user account.</p>

			<form onSubmit={handleSubmit} className="grid gap-3">
				<input
					name="username"
					placeholder="Username"
					value={form.username}
					onChange={handleChange}
					required
					className="rounded-[10px] border border-slate-400 px-3 py-[11px] text-sm"
				/>

				<input
					name="email"
					type="email"
					placeholder="Email"
					value={form.email}
					onChange={handleChange}
					required
					className="rounded-[10px] border border-slate-400 px-3 py-[11px] text-sm"
				/>

				<input
					name="password"
					type="password"
					placeholder="Password"
					value={form.password}
					onChange={handleChange}
					minLength={8}
					required
					className="rounded-[10px] border border-slate-400 px-3 py-[11px] text-sm"
				/>

				<input
					name="first_name"
					placeholder="First name"
					value={form.first_name}
					onChange={handleChange}
					className="rounded-[10px] border border-slate-400 px-3 py-[11px] text-sm"
				/>

				<input
					name="last_name"
					placeholder="Last name"
					value={form.last_name}
					onChange={handleChange}
					className="rounded-[10px] border border-slate-400 px-3 py-[11px] text-sm"
				/>

				<button
					disabled={submitting}
					type="submit"
					className="cursor-pointer rounded-[10px] bg-gradient-to-br from-sky-500 to-blue-600 px-[14px] py-3 font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
				>
					{submitting ? "Creating..." : "Create user"}
				</button>
			</form>

			{error ? <p className="mt-3 font-semibold text-red-700">{error}</p> : null}
			{success ? <p className="mt-3 font-semibold text-green-800">{success}</p> : null}
		</section>
		</div>
	);
}
