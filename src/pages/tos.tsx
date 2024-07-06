import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import firebaseAdmin from '../utils/firebaseAdmin';
import useUserProfile from '../hooks/useUserProfile';
import { useAuth } from '../contexts/AuthContext'; // Adjust the path according to your project structure

import HeaderNavigationBar from '@/components/SharedComponents/HeaderNavigationBar';
import Footer from '@/components/Footer';


interface IndexPageProps {
    authenticated: boolean;
}

const TOSPage: React.FC = ({  }) => {
    const { user, loading: authLoading, logout } = useAuth();
    const [ profileUID, setProfileUID ] = useState<any>(null);
    const authenticated = !!user;
    // Possible Options: dashboard, recipes, bookmarks, important-dates, to-do, habit-tracking, budget, profile-settings
    const [currentView, setCurrentView] = React.useState<string>("dashboard");
    const { profile, loading, error } = useUserProfile(profileUID);    
    const [ theme, setTheme ] = React.useState('nord');
    const listOfThemes = [
        "light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
        "dim",
        "nord",
        "sunset",
      ];


    // Set the theme on initial load
    React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
      }, [theme]);

    // Set the theme in the profile if it exists
    React.useEffect(() => {
        if (profile) {
            setTheme(profile.theme);            
        }
    }, [profile]);    

    React.useEffect(() => {                               
        if (user && user.uid) {
            setProfileUID(user.uid);
        }
    }, [user]);

    ;


    

    return (
        <>            
            <section className='flex flex-col w-full bg-base-100'>
                {/* Top div */}
                <HeaderNavigationBar />

                {/* Terms of Service Section */}
                <section>
                    <div className='m-10 p-10 text-black'>
                        <h1>Terms of Service</h1>
                        <p className='py-4'>Welcome to Dash.AFWebDev.com. By accessing or using our website, you agree to be bound by these Terms of Service. Please read them carefully.</p>
                        
                        <p className='py-4'><strong>1. Acceptance of Terms: </strong>
                        By using Dash.AFWebDev.com, you agree to comply with and be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with these terms, you are prohibited from using or accessing this site.</p>
                        
                        <p className='py-4'><strong>2. Use of Site: </strong>
                        You agree to use Dash.AFWebDev.com only for lawful purposes. You are prohibited from using the site to violate any local, state, national, or international law or regulation.</p>
                        
                        <p className='py-4'><strong>3. Intellectual Property: </strong>
                        All content on Dash.AFWebDev.com, including text, graphics, logos, and software, is the property of Dash.AFWebDev.com and is protected by applicable copyright and trademark laws.</p>
                        
                        <p className='py-4'><strong>4. Limitation of Liability: </strong>
                        Dash.AFWebDev.com will not be liable for any damages arising out of or in connection with your use of the site. This includes, without limitation, direct, indirect, incidental, punitive, and consequential damages.</p>
                        
                        <p className='py-4'><strong>5. Changes to Terms of Service: </strong>
                        Dash.AFWebDev.com reserves the right to change these Terms of Service at any time. Your continued use of the site following any changes will be deemed your acceptance of those changes.</p>
                        
                        <p className='py-4'><strong>6. Contact Information: </strong>
                        If you have any questions about these Terms of Service, please contact us at AdrianF.WebDev@gmail.com.</p>
                    </div>
                </section>


                
                    
                    

                
                <Footer />
            </section>
        </>
    );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        // Get the token from the request        
        const token = context.req.cookies['authToken'];        
        
        // Check if the token is undefined or a string
        if (typeof token !== 'string') {            
            return {
                props: { authenticated: false },                
            };
        }

        await firebaseAdmin.auth().verifyIdToken(token);
        // If the token is valid, return authenticated: true
        return { props: { authenticated: true } };
    } catch (error) {
        // Redirecting or handling the error based on your application's needs
        // For example, redirect to login
        return { props: { authenticated: false } };
    }
};


export default TOSPage;
