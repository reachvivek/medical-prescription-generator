import { create } from 'zustand';
import { supabase } from '../services/supabase';

const useAuthStore = create((set, get) => ({
  user: null,
  session: null,
  loading: true,
  error: null,

  // Initialize auth state
  initialize: async () => {
    try {
      set({ loading: true, error: null });

      // Get current session
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      set({ session, user: session?.user || null, loading: false });

      // Listen for auth changes
      supabase.auth.onAuthStateChange((_event, session) => {
        set({ session, user: session?.user || null });
      });
    } catch (error) {
      console.error('Auth initialization error:', error);
      set({ error: error.message, loading: false });
    }
  },

  // Sign up
  signup: async (email, password, metadata = {}) => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
        },
      });

      if (error) throw error;

      set({
        session: data.session,
        user: data.user,
        loading: false,
      });

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Signup error:', error);
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  // Sign in
  signin: async (email, password) => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      set({
        session: data.session,
        user: data.user,
        loading: false,
      });

      return { success: true, user: data.user };
    } catch (error) {
      console.error('Signin error:', error);
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  // Sign out
  signout: async () => {
    try {
      set({ loading: true, error: null });

      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      set({ session: null, user: null, loading: false });

      return { success: true };
    } catch (error) {
      console.error('Signout error:', error);
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  // Reset password
  resetPassword: async (email) => {
    try {
      set({ loading: true, error: null });

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      set({ loading: false });
      return { success: true };
    } catch (error) {
      console.error('Reset password error:', error);
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  // Update password
  updatePassword: async (newPassword) => {
    try {
      set({ loading: true, error: null });

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      set({ loading: false });
      return { success: true };
    } catch (error) {
      console.error('Update password error:', error);
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  // Clear error
  clearError: () => set({ error: null }),
}));

export default useAuthStore;
