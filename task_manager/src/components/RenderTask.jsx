import { useState, useEffect } from "react";
import { getUserTasks } from "../services";
import { useAuth } from "./AuthContext";


function RenderTask() {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState("");
    const [loadingTasks, setLoadingTasks] = useState(true);
    const { auth, loading } = useAuth();

    useEffect(() => {
        if (loading) {
            return;
        }

        const fetchTasks = async () => {
            try {
                setError("");
                const data = await getUserTasks(auth?.token);
                setTasks(data);
            } catch (error) {
                setError(error.message || "Unable to fetch tasks.");
            } finally {
                setLoadingTasks(false);
            }
        };

        fetchTasks();

    }, [auth?.token, loading]);

  return (
    <div className="p-4 mt-3 bg-slate-400 border-blue-400 rounded w-90 items-center justify-center text-center font-serif font-medium">
        {loadingTasks && <p>Loading tasks...</p>}
        {error && <p>Error: {error}</p>}
        <div>{tasks.map((task) => (
            <div key={task.id} className="p-2 m-2 mx-auto text-lg">
                <h2 className="text-blue-800">{task.title}</h2>
                <h3>{task.priority}</h3>
                <p>{task.description}</p>
                <p>{task.completed ? "Completed" : "Not completed"}</p>
            </div>
        ))}</div>
    </div>
  );
}

export default RenderTask;