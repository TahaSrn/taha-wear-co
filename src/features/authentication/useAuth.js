import { useState, useEffect } from "react";
import supabase from "../../services/supabase";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // گرفتن کاربر فعلی
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    // گوش دادن به تغییرات Auth
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      },
    );

    return () => listener?.subscription?.unsubscribe();
  }, []);

  return { user, loading };
}
