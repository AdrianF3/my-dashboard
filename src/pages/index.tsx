import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import firebaseAdmin from '../utils/firebaseAdmin';
import HeaderNavigationBar from '@/components/SharedComponents/HeaderNavigationBar';
import Dashboard from '@/components/Home/DashboardGridComponents/Dashboard';
import useUserProfile from '../hooks/useUserProfile';
import { useAuth } from '../contexts/AuthContext'; // Adjust the path according to your project structure


// Icons import might remain unchanged
import { CgProfile, CgList, CgBookmark, CgCalendarDates } from "react-icons/cg";
import { BiMoneyWithdraw } from "react-icons/bi";
import { TbLayoutDashboard } from "react-icons/tb";
import { LuListTodo } from "react-icons/lu";
import { MdOutlineLibraryAdd } from "react-icons/md";
import LoginForm from '@/components/Home/DashboardGridComponents/LoginForm';

interface IndexPageProps {
    authenticated: boolean;
}



const IndexPage: React.FC = ({  }) => {
    const { user, loading: authLoading, logout } = useAuth();
    const authenticated = !!user;
    console.log('user', user)

    // Possible Options: dashboard, recipes, bookmarks, important-dates, to-do, activity-tracking, budget, profile-settings
    const [currentView, setCurrentView] = React.useState<string>("dashboard");
    const { profile, loading, error } = useUserProfile();

    const [ theme, setTheme ] = React.useState('bumblebee');
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

    React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
      }, [theme]);

    React.useEffect(() => {
        if (profile) {
            setTheme(profile.theme);            
        }
    }
    , [profile]);
    
      const toggleTheme = (theme: string) => {
        setTheme(theme);
      };
    
    console.log('profile', profile)

    
    




    function handleViewChange(view: string) {
        setCurrentView(view);
    }

    const renderSelectedView = () => {

        // Example usage of profile data in the dashboard view or any other views that might need it
        if (currentView === "dashboard") {
            // Default Loading
            if (loading) return <>
            <div className='w-full h-full flex justify-center align-center self-center'>
                <span className="loading loading-spinner text-primary"></span>
                <div>Loading...</div>
            </div>
            </>
            // Error
            if (error) return <>
                <span className="loading loading-spinner text-error"></span>
                <div>Error loading profile: {error.message}</div>;
            </>
            // No Profile Data
            if (!profile) return <>
                <span className="loading loading-spinner text-error"></span>
                <div>No profile data</div>;
            </>            
        }
        switch (currentView) {
            case "dashboard":
                return (
                    <Dashboard profile={profile} />
                );
            case "recipes":
                return (
                    <div className="rounded-lg bg-primary flex flex-row justify-center items-center gap-4 p-4">
                        <CgList />
                        <p className="text-primary-content font-bold text-lg">Recipes</p>
                    </div>
                );
            case "bookmarks":
                return (
                    <div className="rounded-lg bg-primary flex flex-row justify-center items-center gap-4 p-4">
                        <CgBookmark />
                        <p className="text-primary-content font-bold text-lg">Bookmarks*</p>
                    </div>
                );
            case "important-dates":
                return (
                    <div className="rounded-lg bg-primary flex flex-row justify-center items-center gap-4 p-4">
                        <CgCalendarDates />
                        <p className="text-primary-content font-bold text-lg">Important Dates*</p>
                    </div>
                );
            case "to-do":
                return (
                    <div className="rounded-lg bg-primary flex flex-row justify-center items-center gap-4 p-4">
                        <LuListTodo />
                        <p className="text-primary-content font-bold text-lg">To Do*</p>
                    </div>
                );
            case "activity-tracking":
                return (
                    <div className="rounded-lg bg-primary flex flex-row justify-center items-center gap-4 p-4">
                        <MdOutlineLibraryAdd />
                        <p className="text-primary-content font-bold text-lg">Activity Tracking*</p>
                    </div>
                );
            case "budget":
                return (
                    <div className="rounded-lg bg-primary flex flex-row justify-center items-center gap-4 p-4">
                        <BiMoneyWithdraw />
                        <p className="text-primary-content font-bold text-lg">Budget*</p>
                    </div>
                );
            case "profile-settings":
                return (<>
                    <div className="rounded-lg bg-accent text-primary-content flex flex-row justify-center items-center gap-4 p-4">
                        <CgProfile />
                        <p className="font-bold text-lg">Profile & Settings</p>
                    </div>
                        <div className='rounded-lg bg-primary text-primary-content flex flex-row justify-center items-center gap-4 p-4 mt-10'>
                            <p>Current Theme: {theme}</p>                            
                            {/* Select to choose new theme from listOfThemes */}
                            <select 
                                className="select select-primary text-accent-content w-full max-w-xs"
                                value={theme}
                                onChange={(e) => toggleTheme(e.target.value)}
                            >                                
                                {listOfThemes.map((theme) => (
                                <option key={theme} value={theme}>
                                    {theme}
                                </option>
                                ))}
                            </select>
                        </div>
                </>
                );
            default:
                return null;
        }
    };


    // Assuming the useUserProfile hook manages the fetching state internally
    // If not authenticated, you might want to redirect or alter the UI accordingly

    useEffect(() => {
        // This effect could be used for anything that needs to run when the component mounts
        // For example, redirecting based on auth state if needed
    }, [authenticated]);

    if (authLoading) {
        return <div>Loading...</div>; // Or any other loading state you prefer
    }
    

    // Thought is to redirect or display a simple explainer page with an option to register or login at the bottom - maybe use modal?
    

    if (!authenticated) {
        // Instead of redirecting, render LoginComponent and RegisterComponent
        // This could be a modal, a separate section, or however you prefer to design it
        return (
            <>
                <HeaderNavigationBar />
                <div className="flex flex-col bg-secondary/30 items-center justify-center min-h-screen py-12">
                    <LoginForm />
                    {/* <RegisterComponent /> */}
                </div>
            </>
        );
    }


    // Adding a new testdfd

    return (
        <>
            <section className='flex flex-col bg-base-100'>
                {/* Top div */}
                <HeaderNavigationBar />

                {/* Grid section */}
                <div className="grid grid-cols-2 gap-4 m-4">
                    {/* Content of the grid section */}
                    {/* Dashboard */}
                    <div className="rounded-lg bg-primary text-primary-content flex flex-row justify-center items-center gap-4 p-4" onClick={() => handleViewChange('dashboard')}>
                        <TbLayoutDashboard />
                        <p className="text-primary-content font-bold text-lg">Dashboard</p>
                    </div>
                    {/* Recipes */}
                    <div className="rounded-lg bg-primary text-primary-content flex flex-row justify-center items-center gap-4 p-4" onClick={() => handleViewChange('recipes')}>
                        <CgList />
                        <p className="text-primary-content font-bold text-lg">Recipes</p>
                    </div>
                    {/* Bookmarks */}
                    <div className="rounded-lg bg-primary text-primary-content flex flex-row justify-center items-center gap-4 p-4" onClick={() => handleViewChange('bookmarks')}>
                        <CgBookmark />
                        <p className="text-primary-content font-bold text-lg">Bookmarks*</p>
                    </div>
                    {/* Activity Tracking */}
                    <div className="rounded-lg bg-primary text-primary-content flex flex-row justify-center items-center gap-4 p-4" onClick={() => handleViewChange('activity-tracking')}>
                        <MdOutlineLibraryAdd />
                        <p className="text-primary-content font-bold text-lg">Activity Tracking*</p>
                    </div>
                    {/* Important Dates */}
                    <div className="rounded-lg bg-primary text-primary-content flex flex-row justify-center items-center gap-4 p-4" onClick={() => handleViewChange('important-dates')}>
                        <CgCalendarDates />
                        <p className="text-primary-content font-bold text-lg">Important Dates*</p>
                    </div>
                    {/* To Do  */}
                    <div className="rounded-lg bg-primary text-primary-content flex flex-row justify-center items-center gap-4 p-4" onClick={() => handleViewChange('to-do')}>
                        <LuListTodo />
                        <p className="text-primary-content font-bold text-lg">To Do*</p>
                    </div>
                    {/* Budget */}
                    <div className="rounded-lg bg-primary text-primary-content flex flex-row justify-center items-center gap-4 p-4" onClick={() => handleViewChange('budget')}>
                        <BiMoneyWithdraw />
                        <p className="text-primary-content font-bold text-lg">Budget*</p>
                    </div>
                    {/* Profile & Settings */}
                    <div className="rounded-lg bg-primary text-primary-content flex flex-row justify-center items-center gap-4 p-4" onClick={() => handleViewChange('profile-settings')}>
                        <CgProfile />
                        <p className="text-primary-content font-bold text-lg">Profile & Settings</p>
                    </div>
                    

                </div>
                {/* Generic paragraph */}
                <section className="w-full h-full m-4 p-4">
                    {renderSelectedView()}
                    
                </section>
            </section>
        </>
    );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        // Get the token from the request
        console.log('context', context.req.cookies['authToken'])
        const token = context.req.cookies['authToken'];
        
        // Check if the token is undefined or a string
        if (typeof token !== 'string') {
            // Handle the case where the token is missing or invalid
            // For example, redirect to a login page or return an unauthorized status
            return {
                props: { authenticated: false },
                // Optionally, you could add a redirect here if you prefer
                // redirect: {
                //     destination: '/login',
                //     permanent: false,
                // },
            };
        }

        await firebaseAdmin.auth().verifyIdToken(token);
        return { props: { authenticated: true } };
    } catch (error) {
        // Redirecting or handling the error based on your application's needs
        // For example, redirect to login
        return { props: { authenticated: false } };
    }
};


export default IndexPage;
