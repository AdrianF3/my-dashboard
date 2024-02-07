import { useState, useEffect } from 'react';
import { doc, getDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig'
import { UserProfile } from '../types/UserProfile.types';

const useUserProfile = (uid: string | null) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    console.log('uid', uid)
    if (uid) {
      console.log('called')
      
      const fetchProfile = async () => {
        try {
          console.log('fetch profile called')
          setLoading(true);
          const docRef = doc(db, 'userProfile', uid); // Adjusted for Firebase Modular SDK
          const docSnap = await getDoc(docRef);
          console.log('docSnap', docSnap)

          if (docSnap.exists()) {
            setProfile(docSnap.data() as UserProfile);
          } else {
            setProfile(null);
            setError(new Error('No profile found'));
          }
        } catch (e) {
          setError(e instanceof Error ? e : new Error('An unknown error occurred'));
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    } else {
      console.log('else called')
      setLoading(false);
      setProfile(null);
    }
  }, [uid]);

  return { profile, loading, error };
};

export default useUserProfile;
