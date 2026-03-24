import React, { useState } from "react";
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
		<section style={styles.wrapper}>
			<h2 style={styles.title}>Create Account</h2>
			<p style={styles.subtitle}>Register a new Task Manager user account.</p>

			<form onSubmit={handleSubmit} style={styles.form}>
				<input
					name="username"
					placeholder="Username"
					value={form.username}
					onChange={handleChange}
					required
					style={styles.input}
				/>

				<input
					name="email"
					type="email"
					placeholder="Email"
					value={form.email}
					onChange={handleChange}
					required
					style={styles.input}
				/>

				<input
					name="password"
					type="password"
					placeholder="Password"
					value={form.password}
					onChange={handleChange}
					minLength={8}
					required
					style={styles.input}
				/>

				<input
					name="first_name"
					placeholder="First name"
					value={form.first_name}
					onChange={handleChange}
					style={styles.input}
				/>

				<input
					name="last_name"
					placeholder="Last name"
					value={form.last_name}
					onChange={handleChange}
					style={styles.input}
				/>

				<button disabled={submitting} type="submit" style={styles.button}>
					{submitting ? "Creating..." : "Create user"}
				</button>
			</form>

			{error ? <p style={styles.error}>{error}</p> : null}
			{success ? <p style={styles.success}>{success}</p> : null}
		</section>
	);
}

const styles = {
	wrapper: {
		width: "100%",
		maxWidth: 480,
		padding: 24,
		borderRadius: 16,
		background: "#f8fafc",
		border: "1px solid #cbd5e1",
		boxShadow: "0 12px 30px rgba(15, 23, 42, 0.1)",
		fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
	},
	title: {
		margin: "0 0 8px",
	},
	subtitle: {
		margin: "0 0 16px",
		color: "#334155",
	},
	form: {
		display: "grid",
		gap: 12,
	},
	input: {
		borderRadius: 10,
		border: "1px solid #94a3b8",
		padding: "11px 12px",
		fontSize: 14,
	},
	button: {
		border: "none",
		borderRadius: 10,
		padding: "12px 14px",
		color: "white",
		fontWeight: 700,
		background: "linear-gradient(135deg, #0ea5e9, #2563eb)",
		cursor: "pointer",
	},
	error: {
		marginTop: 12,
		color: "#b91c1c",
		fontWeight: 600,
	},
	success: {
		marginTop: 12,
		color: "#166534",
		fontWeight: 600,
	},
};
