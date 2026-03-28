# Task Manager React

A React + Vite task manager frontend with user authentication, task CRUD, and profile display.

This repository contains the app inside the `task_manager/` folder.

## Tech Stack

- React 19
- Vite 8
- React Router 7
- TanStack Query 5
- Tailwind CSS 3 (PostCSS)

## Project Structure

- `task_manager/`: Main frontend app
- `task_manager/src/components/`: UI and auth/task components
- `task_manager/src/services.jsx`: API service layer and token helpers

## Getting Started

### 1. Install dependencies

From the repo root:

```bash
cd task_manager
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Then open the local URL shown by Vite (usually `http://localhost:5173`).

### 3. Build for production

```bash
npm run build
```

### 4. Preview the production build

```bash
npm run preview
```

## Available Scripts

Run these inside `task_manager/`:

- `npm run dev`: Start Vite dev server
- `npm run build`: Create production build
- `npm run preview`: Preview production build locally
- `npm run lint`: Run ESLint

## App Routes

- `/`: Home (task list + profile)
- `/signup`: Register a new user
- `/login`: Log in
- `/logout`: Log out
- `/tasks`: View your tasks
- `/tasks/new`: Create a task

## Authentication and API

The app uses token-based auth and stores the token in local storage under:

- `findke_auth_token`

Default backend base URL:

- `https://findke.onrender.com/`

You can override the API base URL by setting:

- `window.__API_BASE_URL__`

before the app initializes.

## Notes

- Task operations require login.
- Auth state is restored on reload through `AuthContext`.
- Task fetching and mutations use TanStack Query for caching and refetching.