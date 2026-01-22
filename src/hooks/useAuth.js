import { useEffect } from 'react';
import useAuthStore from '../store/authStore';

/**
 * Custom hook for authentication
 * Initializes auth state and provides auth methods
 */
const useAuth = () => {
  const {
    user,
    session,
    loading,
    error,
    initialize,
    signup,
    signin,
    signout,
    resetPassword,
    updatePassword,
    clearError,
  } = useAuthStore();

  // Initialize auth on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  const isAuthenticated = !!user;

  return {
    user,
    session,
    loading,
    error,
    isAuthenticated,
    signup,
    signin,
    signout,
    resetPassword,
    updatePassword,
    clearError,
  };
};

export default useAuth;
