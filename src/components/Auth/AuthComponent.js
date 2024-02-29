import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import '../../firebaseConfig'; // Ensure Firebase is initialized

const AuthComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between SignUp and SignIn
  const auth = getAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isSignUp) {
        // Handle sign up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('Signed Up', userCredential.user);
      } else {
        // Handle sign in
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log('Signed In', userCredential.user);
      }
    } catch (error) {
      console.error(error.message);
      // Handle errors here, such as displaying a notification
    }
  };

  return (
    <div className="form-control w-full max-w-xs bg-primary text-primary-content p-4 rounded-xl">
      <label className="label">
        <span className="label-text text-2xl">Email</span>
      </label>
      <input type="email" placeholder="Your email" className="input input-bordered w-full max-w-xs"
             value={email} onChange={(e) => setEmail(e.target.value)} />

      <label className="label">
        <span className="label-text text-2xl">Password</span>
      </label>
      <input type="password" placeholder="Your password" className="input input-bordered w-full max-w-xs"
             value={password} onChange={(e) => setPassword(e.target.value)} />

      <button className={`btn mt-4 ${isSignUp ? 'btn-primary' : 'btn-secondary'}`} onClick={handleSubmit}>
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </button>
      <button className="btn btn-neutral mt-2 text-accent" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </button>
    </div>
  );
};

export default AuthComponent;
