import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Create Supabase client with optimized configuration (only if env vars are present)
export const supabase = supabaseUrl && supabasePublishableKey
  ? createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storage: window.localStorage,
      },
      db: {
        schema: 'public',
      },
      global: {
        headers: {
          'x-application-name': 'medical-prescription-generator',
        },
      },
    })
  : null;

// Helper function to check if user is authenticated
export const isAuthenticated = async () => {
  if (!supabase) return false;
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return !!session;
};

// Helper function to get current user
export const getCurrentUser = async () => {
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};

export default supabase;
