import { useState, createContext, useContext, useEffect } from "react";
import { clearToken, getCurrentUser, getToken } from "../services";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ token: null, user: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function bootstrapAuth() {
      const token = getToken();

      if (!token) {
        if (isMounted) {
          setAuth({ token: null, user: null });
          setLoading(false);
        }
        return;
      }

      try {
        const user = await getCurrentUser(token);

        if (isMounted) {
          setAuth({ token, user });
          localStorage.setItem("findke_auth_user", JSON.stringify(user));
        }
      } catch (_) {
        clearToken();
        localStorage.removeItem("findke_auth_user");

        if (isMounted) {
          setAuth({ token: null, user: null });
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    bootstrapAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}