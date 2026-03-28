import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getCurrentUser } from "../services";



export default function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { auth, loading: authLoading, setAuth } = useAuth();
 

    useEffect(() => {
        if (authLoading) {
            return;
        }

        if (!auth?.token) {
            setError("No auth token found. Log in first.");
            setLoading(false);
            return;
        }

        if (auth.user) {
            setProfile(auth.user);
            setLoading(false);
            return;
        }

        const fetchProfile = async () => {
            try {
                const user = await getCurrentUser(auth.token);
                setProfile(user);
                setAuth((prev) => ({ ...prev, user }));
                localStorage.setItem("findke_auth_user", JSON.stringify(user));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [auth?.token, auth?.user, authLoading, setAuth]);

    return (
        <div>
            {loading && <p>Loading profile...</p>}
            {error && <p>Error: {error}</p>}
            {profile && (
                <div className="p-3 m-4 font-sans">
                    <h2 className="font-serif font-semibold">{profile.username}'s Profile</h2>
                    <p>Email: {profile.email}</p>
                    <p>Name: {profile.first_name} {profile.last_name}</p>
                </div>
            )}
        </div>
    );
}