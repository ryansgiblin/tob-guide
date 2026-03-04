import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

// Any authenticated Supabase Auth user is treated as an editor (isAdmin=true).
// To grant edit access: Supabase dashboard → Authentication → Users → Add user.
export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore session on page load (persisted in localStorage by Supabase client)
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAdmin(!!session);
      setLoading(false);
    });

    // Keep isAdmin in sync if session changes (sign in / sign out / expiry)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signIn(email, password) {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  return { isAdmin, loading, signIn, signOut };
}
