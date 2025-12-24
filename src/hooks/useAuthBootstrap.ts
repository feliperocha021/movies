import { useEffect, useState } from "react";
import { useAppDispatch } from "../redux/hooks";
import { useRefreshMutation } from "../redux/api/authApi";
import { setCredentials, logout } from "../redux/features/auth/authSlice";

let didRun = false;

export const useAuthBootstrap = () => {
  const dispatch = useAppDispatch();
  const [refresh] = useRefreshMutation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (didRun) return; // evita segunda execução no StrictMode
    didRun = true;

    const controller = new AbortController();
    const refreshSession = async () => {
      try {
        const res = await refresh({ signal: controller.signal }).unwrap();
        dispatch(setCredentials({
          accessToken: res.data.accessToken,
          user: res.data.user
        }));
      } catch (err) {
        console.error(err);
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };
    refreshSession();
    return () => controller.abort();
  }, [dispatch, refresh]);

  return { loading };
};
