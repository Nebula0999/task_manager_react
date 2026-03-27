import { useState } from "react";
import { createTask } from "../services";
import { useAuth } from "./AuthContext";

const initialForm = {
	title: "",
	description: "",
	priority: "medium",
	completed: false,
};

export default function AddTask({ onCreated }) {
	const [form, setForm] = useState(initialForm);
	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const { auth, loading } = useAuth();

	function handleChange(event) {
		const { name, type, value, checked } = event.target;
		setForm((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}));
	}

	async function handleSubmit(event) {
		event.preventDefault();
		setError("");
		setSuccess("");

		if (!auth?.token) {
			setError("Please log in before adding tasks.");
			return;
		}

		setSubmitting(true);

		try {
			const payload = {
				title: form.title.trim(),
				description: form.description.trim(),
				priority: form.priority,
				completed: form.completed,
			};

			const created = await createTask(payload, auth.token);
			setSuccess(`Task \"${created.title || payload.title}\" added successfully.`);
			setForm(initialForm);

			if (onCreated) {
				onCreated(created);
			}
		} catch (err) {
			setError(err.message || "Unable to add task.");
		} finally {
			setSubmitting(false);
		}
	}

	return (
		<main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_20%_15%,#fef3c7_0%,transparent_35%),radial-gradient(circle_at_80%_85%,#bfdbfe_0%,transparent_32%),#f8fafc] p-5 [font-family:'Segoe_UI',Tahoma,Geneva,Verdana,sans-serif]">
			<section className="w-full max-w-[520px] rounded-2xl border border-slate-300 bg-white/95 p-6 shadow-[0_20px_45px_rgba(30,41,59,0.16)]">
				<h1 className="mb-2 text-3xl font-bold text-slate-900">Add Task</h1>
				<p className="mb-5 text-slate-700">Create a new task for your account.</p>

				{loading ? <p className="mb-4 text-slate-700">Checking authentication...</p> : null}

				<form onSubmit={handleSubmit} className="grid gap-4">
					<label className="grid gap-1.5 font-semibold text-slate-800">
						Title
						<input
							name="title"
							value={form.title}
							onChange={handleChange}
							required
							className="rounded-[10px] border border-slate-400 px-3 py-[11px] text-sm"
							placeholder="Example: Finish project report"
						/>
					</label>

					<label className="grid gap-1.5 font-semibold text-slate-800">
						Description
						<textarea
							name="description"
							value={form.description}
							onChange={handleChange}
							rows={4}
							className="rounded-[10px] border border-slate-400 px-3 py-[11px] text-sm"
							placeholder="Add details about the task"
						/>
					</label>

					<label className="grid gap-1.5 font-semibold text-slate-800">
						Priority
						<select
							name="priority"
							value={form.priority}
							onChange={handleChange}
							className="rounded-[10px] border border-slate-400 bg-white px-3 py-[11px] text-sm"
						>
							<option value="low">Low</option>
							<option value="medium">Medium</option>
							<option value="high">High</option>
						</select>
					</label>

					<label className="flex items-center gap-2 text-sm font-semibold text-slate-800">
						<input
							type="checkbox"
							name="completed"
							checked={form.completed}
							onChange={handleChange}
							className="h-4 w-4 rounded border-slate-400"
						/>
						Mark as completed
					</label>

					<button
						type="submit"
						disabled={submitting || loading}
						className="mt-1 rounded-[10px] bg-gradient-to-br from-sky-500 to-blue-600 px-[14px] py-3 text-[15px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
					>
						{submitting ? "Adding task..." : "Add Task"}
					</button>
				</form>

				{error ? <p className="mt-3 font-semibold text-red-700">{error}</p> : null}
				{success ? <p className="mt-3 font-semibold text-green-800">{success}</p> : null}
			</section>
		</main>
	);
}
