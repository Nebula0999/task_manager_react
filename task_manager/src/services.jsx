const API_ROOT = (window.__API_BASE_URL__ || "https://findke.onrender.com/").replace(/\/$/, "");
const USERS_BASE = `${API_ROOT}/api/users`;
const TASKS_BASE = `${API_ROOT}/api/tasks`;
const TOKEN_KEY = "findke_auth_token";

function buildHeaders(token) {
	const headers = {
		"Content-Type": "application/json",
		Accept: "application/json",
	};

	if (token) {
		headers.Authorization = `Token ${token}`;
	}

	return headers;
}

async function parseResponse(response) {
	let payload = null;

	try {
		payload = await response.json();
	} catch (_) {
		payload = null;
	}

	if (!response.ok) {
		const detail =
			payload?.detail ||
			payload?.non_field_errors?.[0] ||
			"Request failed. Please try again.";
		throw new Error(detail);
	}

	return payload;
}

export function saveToken(token) {
	localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
	return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
	localStorage.removeItem(TOKEN_KEY);
}

export async function registerUser(payload) {
	const response = await fetch(`${USERS_BASE}/register/`, {
		method: "POST",
		headers: buildHeaders(),
		body: JSON.stringify(payload),
	});

	const data = await parseResponse(response);

	if (data?.token) {
		saveToken(data.token);
	}

	return data;
}

export async function loginUser(payload) {
	const response = await fetch(`${USERS_BASE}/login/`, {
		method: "POST",
		headers: buildHeaders(),
		body: JSON.stringify(payload),
	});

	const data = await parseResponse(response);

	if (data?.token) {
		saveToken(data.token);
	}

	return data;
}

export async function getCurrentUser(token = getToken()) {
	if (!token) {
		throw new Error("No auth token found. Log in first.");
	}

	const response = await fetch(`${USERS_BASE}/me/`, {
		method: "GET",
		headers: buildHeaders(token),
	});

	return parseResponse(response);
}

export async function getUserTasks(token = getToken()) {
	if (!token) {
		throw new Error("No auth token found. Log in first.");
	}

	const response = await fetch(`${TASKS_BASE}/`, {
		method: "GET",
		headers: buildHeaders(token),
	});

	return parseResponse(response);
}

export async function createTask(payload, token = getToken()) {
	if (!token) {
		throw new Error("No auth token found. Log in first.");
	}

	const response = await fetch(`${TASKS_BASE}/`, {
		method: "POST",
		headers: buildHeaders(token),
		body: JSON.stringify(payload),
	});

	return parseResponse(response);
}

export async function updateTask(taskId, payload, token = getToken()) {
	if (!token) {
		throw new Error("No auth token found. Log in first.");
	}

	const response = await fetch(`${TASKS_BASE}/${taskId}/`, {
		method: "PATCH",
		headers: buildHeaders(token),
		body: JSON.stringify(payload),
	});

	return parseResponse(response);
}

export async function deleteTask(taskId, token = getToken()) {
	if (!token) {
		throw new Error("No auth token found. Log in first.");
	}

	const response = await fetch(`${TASKS_BASE}/${taskId}/`, {
		method: "DELETE",
		headers: buildHeaders(token),
	});

	if (!response.ok) {
		await parseResponse(response);
	}

	return true;
}
