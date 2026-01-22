import { useEffect } from 'react';
import useProfileStore from '../store/profileStore';
import useAuthStore from '../store/authStore';

/**
 * Custom hook for profile management
 * Automatically fetches profile when user is authenticated
 */
const useProfile = () => {
  const user = useAuthStore((state) => state.user);
  const {
    profile,
    loading,
    error,
    fetchProfile,
    createProfile,
    updateProfile,
    uploadSignature,
    uploadLogo,
    clearProfile,
    clearError,
  } = useProfileStore();

  // Fetch profile when user changes
  useEffect(() => {
    if (user?.id) {
      fetchProfile(user.id);
    } else {
      clearProfile();
    }
  }, [user?.id, fetchProfile, clearProfile]);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    createProfile,
    updateProfile,
    uploadSignature,
    uploadLogo,
    clearError,
  };
};

export default useProfile;
