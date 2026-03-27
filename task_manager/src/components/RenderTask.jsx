import { deleteTask, getUserTasks, updateTask } from "../services";
import { useAuth } from "./AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


function RenderTask() {
    const { auth, loading } = useAuth();
    const queryClient = useQueryClient();

    const {
        data: tasks = [],
        error,
        isLoading,
    } = useQuery({
        queryKey: ["tasks", auth?.token],
        queryFn: () => getUserTasks(auth?.token),
        enabled: !loading && Boolean(auth?.token),
    });

    const completeMutation = useMutation({
        mutationFn: ({ id, completed }) =>
            updateTask(id, { completed }, auth?.token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks", auth?.token] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => deleteTask(id, auth?.token),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tasks", auth?.token] });
        },
    });

    function handleToggleComplete(task) {
        completeMutation.mutate({ id: task.id, completed: !task.completed });
    }

    function handleDeleteTask(taskId) {
        deleteMutation.mutate(taskId);
    }



  return (
    <div className="p-4 mt-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-blue-400 rounded w-90 items-center justify-center text-center font-serif font-medium">
        {loading && <p>Checking authentication...</p>}
        {!loading && !auth?.token && <p>Please log in to view your tasks.</p>}
        {isLoading && <p>Loading tasks...</p>}
        {error && <p>Error: {error.message || "Unable to fetch tasks."}</p>}
        {completeMutation.error && <p>Error: {completeMutation.error.message}</p>}
        {deleteMutation.error && <p>Error: {deleteMutation.error.message}</p>}
        <div>{tasks.map((task) => (
            <div key={task.id} className="p-2 m-2 mx-auto text-lg bg-green-400 rounded border border-blue-300">
                <h2 className="text-blue-800">{task.title}</h2>
                <h3>{task.priority}</h3>
                <p>{task.description}</p>
                <p>{task.completed ? "Completed" : "Not completed"}</p>
                <div className="mt-2 flex justify-center gap-2">
                    <button
                        type="button"
                        onClick={() => handleToggleComplete(task)}
                        disabled={completeMutation.isPending || deleteMutation.isPending}
                        className="rounded bg-blue-700 px-3 py-1 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {task.completed ? "Mark Incomplete" : "Mark Complete"}
                    </button>
                    <button
                        type="button"
                        onClick={() => handleDeleteTask(task.id)}
                        disabled={deleteMutation.isPending || completeMutation.isPending}
                        className="rounded bg-red-700 px-3 py-1 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        Delete
                    </button>
                </div>
            </div>
        ))}</div>
    </div>
  );
}

export default RenderTask;