import { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig'
import { UserProfile } from '../types/UserProfile.types';

const useUserProfile = (uid: string | null) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let unsubscribe: () => void; // Declare a variable to hold the unsubscribe function

    if (uid) {
      setLoading(true);
      const docRef = doc(db, 'userProfile', uid); // Adjusted for Firebase Modular SDK
      
      // Set up a listener for real-time updates
      unsubscribe = onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          setProfile(docSnap.data() as UserProfile);
          setError(null);
        } else {
          setProfile(null);
          setError(new Error('No profile found'));
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
      setProfile(null);
    }

    return () => {
      if (unsubscribe) {
        unsubscribe(); // Unsubscribe when the component unmounts
      }
    };
  }, [uid]);

  return { profile, loading, error };
};

export default useUserProfile;
