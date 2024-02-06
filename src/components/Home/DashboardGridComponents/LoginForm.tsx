// components/LoginForm.tsx
import React from 'react';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import AuthComponent from '../../Auth/AuthComponent';

const LoginForm = () => {
    const handleLogin = async (email: string, password: string) => {
        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Handle successful login
        } catch (error) {
            // Handle errors
        }
    };

    return ( <>
        <div>
            {/* Login form */}
            {/* <div className="form-control bg-primary p-4 rounded-xl">
                <h3 className='text-4xl text-center pb-4'>Login</h3>
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="text" placeholder="email" className="input input-bordered" />
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered" />
                <button className="btn mt-4" onClick={() => handleLogin("user@example.com", "password")}>Login</button>
            </div> */}
            {/* Register Form Button */}
            <AuthComponent />
        </div>
        </>
    );
};

export default LoginForm;
