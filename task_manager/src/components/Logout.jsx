import { useAuth } from "./AuthContext";
import { useState } from "react";

export default function Logout({ onLoggedOut }) {
  const { setAuth } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");


  async function handleLogout(event) {
    event.preventDefault();
    setAuth({ token: null, user: null });
    localStorage.removeItem("findke_auth_user");
    setMessage("You have been logged out.");
    if (onLoggedOut) onLoggedOut(null);
  }

  return (
    <div className="bg-slate-400 p-4 rounded text-center font-serif font-medium">
        <button onClick={handleLogout} className="p-2 bg-red-500 hover:bg-red-700 rounded m-2 text-center text-black font-semibold">Logout</button>
        {message && <p className="mt-3 font-semibold text-green-800">{message}</p>}
        {error && <p className="mt-3 font-semibold text-red-700">{error}</p>}
    </div>
  )
}