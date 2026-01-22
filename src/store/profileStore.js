import { create } from 'zustand';
import { supabase } from '../services/supabase';

const useProfileStore = create((set, get) => ({
  profile: null,
  loading: false,
  error: null,

  // Fetch profile
  fetchProfile: async (userId) => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        // If profile doesn't exist, return null (not an error)
        if (error.code === 'PGRST116') {
          set({ profile: null, loading: false });
          return { success: true, profile: null };
        }
        throw error;
      }

      set({ profile: data, loading: false });
      return { success: true, profile: data };
    } catch (error) {
      console.error('Fetch profile error:', error);
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  // Create profile
  createProfile: async (userId, profileData) => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase
        .from('profiles')
        .insert([
          {
            id: userId,
            ...profileData,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      set({ profile: data, loading: false });
      return { success: true, profile: data };
    } catch (error) {
      console.error('Create profile error:', error);
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  // Update profile
  updateProfile: async (userId, updates) => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single();

      if (error) throw error;

      set({ profile: data, loading: false });
      return { success: true, profile: data };
    } catch (error) {
      console.error('Update profile error:', error);
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  // Upload signature
  uploadSignature: async (userId, file) => {
    try {
      set({ loading: true, error: null });

      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-signature-${Date.now()}.${fileExt}`;
      const filePath = `signatures/${fileName}`;

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from('prescriptions')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from('prescriptions').getPublicUrl(filePath);

      // Update profile with signature URL
      const result = await get().updateProfile(userId, {
        signature_url: publicUrl,
      });

      return result;
    } catch (error) {
      console.error('Upload signature error:', error);
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  // Upload logo
  uploadLogo: async (userId, file) => {
    try {
      set({ loading: true, error: null });

      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-logo-${Date.now()}.${fileExt}`;
      const filePath = `logos/${fileName}`;

      // Upload file
      const { error: uploadError } = await supabase.storage
        .from('prescriptions')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from('prescriptions').getPublicUrl(filePath);

      // Update profile with logo URL
      const result = await get().updateProfile(userId, {
        logo_url: publicUrl,
      });

      return result;
    } catch (error) {
      console.error('Upload logo error:', error);
      set({ error: error.message, loading: false });
      return { success: false, error: error.message };
    }
  },

  // Clear profile
  clearProfile: () => set({ profile: null, error: null }),

  // Clear error
  clearError: () => set({ error: null }),
}));

export default useProfileStore;
