import { useState, useEffect } from 'react';
import { UserProfile } from '../types/UserProfile.types';

// Hook to get user profile data
export default function useUserProfile() {

  // State to hold the profile data
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Mock async data fetching
    const fetchProfile = async () => {
      try {
        // Simulate fetching data with a delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // Hardcoded data to simulate a user profile
        const userProfile: UserProfile = {
          id: 'user-123',
          name: 'John Doe',
          email: 'john.doe@example.com',
          bio: 'Software Developer with a passion for web technologies.',
          theme: 'nord',
          zipCode: '80112'
        };

        setProfile(userProfile);
        setLoading(false);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('An unknown error occurred'));
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, loading, error };
}
