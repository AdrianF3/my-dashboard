import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import '../../firebaseConfig'; // Ensure Firebase is initialized
import { createNewUserProfile } from '../../types/UserProfile.types';


const AuthComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between SignUp and SignIn
  const [signInResponse, setSignInResponse] = useState(''); 
  const auth = getAuth();

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Signed Up', userCredential.user);
      const userProfile = createNewUserProfile(userCredential.user.uid, userCredential.user.email);
      const db = getFirestore();
      const userDocRef = doc(db, 'userProfile', userCredential.user.uid); // Using 'userProfile' as collection name
      await setDoc(userDocRef, userProfile);
      console.log('Document written with ID: ', userCredential.user.uid);
    } catch (error) {
      console.error('Sign Up Error:', error.message);
      setSignInResponse(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Signed In', userCredential.user);
    } catch (error) {
      console.error('Sign In Error:', error.message);
      setSignInResponse(error.message);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignUp) {
      handleSignUp();
    } else {
      handleSignIn();
    }
  };

  return (
    <div className="form-control w-full max-w-xs border-2 border-black text-primary-content p-4 rounded-xl">
      <label className="label">
        <span className="label-text text-2xl">Email</span>
      </label>
      <input
        type="email"
        placeholder="Your email"
        className="input input-bordered w-full max-w-xs"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="label">
        <span className="label-text text-2xl">Password</span>
      </label>
      <input
        type="password"
        placeholder="Your password"
        className="input input-bordered w-full max-w-xs"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      { signInResponse !== '' ? <p className="text-error">{signInResponse}</p> : null }
      <button
        className={`btn mt-4 ${isSignUp ? 'bg-emerald-800/50' : 'bg-emerald-800/50'} border-black`}
        onClick={handleSubmit}
      >
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </button>
      <button
        className="btn btn-neutral mt-2 text-accent"
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </button>
      <button
        className="btn btn-neutral mt-4 text-accent"
        onClick={() => {
          setEmail('demo@dash.afwebdev.com');
          setPassword('demo123');
        }}
      >
        Load Demo Account
      </button>
    </div>
  );
};

export default AuthComponent;
