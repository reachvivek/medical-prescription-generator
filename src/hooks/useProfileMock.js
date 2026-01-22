import { useState, useEffect } from 'react';

/**
 * Mock profile hook that uses localStorage
 * Replace with real useProfile when connecting to Supabase
 */
const useProfileMock = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load profile from localStorage
    const loadProfile = () => {
      try {
        const saved = localStorage.getItem('mock_profile');
        if (saved) {
          setProfile(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };

    loadProfile();
  }, []);

  return {
    profile,
    loading,
  };
};

export default useProfileMock;
