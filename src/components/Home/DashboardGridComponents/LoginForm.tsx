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
            console.log('error', error)
        }
    };

    return ( <>
        <div>            
            <AuthComponent />
        </div>
        </>
    );
};

export default LoginForm;
