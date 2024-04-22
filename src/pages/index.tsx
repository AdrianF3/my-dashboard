import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import firebaseAdmin from '../utils/firebaseAdmin';
import HeaderNavigationBar from '@/components/SharedComponents/HeaderNavigationBar';
import Dashboard from '@/components/Home/DashboardGridComponents/Dashboard';
import useUserProfile from '../hooks/useUserProfile';
import ProfileSettingsView from '@/components/ProfileSettings/ProfileSettingsView';
import { useAuth } from '../contexts/AuthContext'; // Adjust the path according to your project structure


// Icons import might remain unchanged
import { CgProfile, CgList, CgBookmark, CgCalendarDates } from "react-icons/cg";
import { BiMoneyWithdraw } from "react-icons/bi";
import { TbLayoutDashboard } from "react-icons/tb";
import { LuListTodo } from "react-icons/lu";
import { MdOutlineLibraryAdd } from "react-icons/md";
import LoginForm from '@/components/Home/DashboardGridComponents/LoginForm';
import RecipesDisplay from '@/components/Home/RecipeView/RecipesDisplay';
import HabitTracking from '@/components/Home/DashboardGridComponents/HabitTracking';
import BookmarkDisplay from '@/components/Home/BookmarkView/BookmarkDisplay';
import HeroHighlight from '@/components/Home/DashExplainer/HeroHighlight';

interface IndexPageProps {
    authenticated: boolean;
}

const IndexPage: React.FC = ({  }) => {
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


    console.log('user', user)


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
        // END OF CONDITIONAL RENDERING

        switch (currentView) {
            case "dashboard":
                return (
                    <Dashboard profile={profile} />
                );
            case "recipes":
                return (
                    profile ? <RecipesDisplay recipes={profile.recipes}  /> : null
                );
            case "bookmarks":
                return (
                    <BookmarkDisplay profile={profile} />
                );
            case "timelines":
                return (
                    <div className="rounded-lg bg-primary flex flex-row justify-center items-center gap-4 p-4">
                        <CgCalendarDates />
                        <p className="text-primary-content font-bold text-lg">Timelines*</p>
                    </div>
                );
            case "to-do":
                return (
                    <div className="rounded-lg bg-primary flex flex-row justify-center items-center gap-4 p-4">
                        <LuListTodo />
                        <p className="text-primary-content font-bold text-lg">To Do*</p>
                    </div>
                );
            case "habit-tracking":
                return (
                    <HabitTracking profile={profile} />
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
                    <ProfileSettingsView profile={profile} />
                </>
                );
            default:
                return null;
        }
    };

    if (authLoading) {
        return <div>Loading...</div>; // Or any other loading state you prefer
    }        

    if (!authenticated) {
        // Instead of redirecting, render LoginComponent and RegisterComponent        
        return (<>
        <div className=''> 

            { !user ? null : <HeaderNavigationBar /> }
            <HeroHighlight />
            <div className="flex flex-col bg-secondary/30 items-center justify-center min-h-screen py-12">
                <LoginForm />                    
            </div>
        </div>
        </>);
    }    

    

    return (
        <>            
            <section className='flex flex-col w-full bg-base-100'>
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
                    {/* Habit Tracking */}
                    <div className="rounded-lg bg-primary text-primary-content flex flex-row justify-center items-center gap-4 p-4" onClick={() => handleViewChange('habit-tracking')}>
                        <MdOutlineLibraryAdd />
                        <p className="text-primary-content font-bold text-lg">Habit Tracking</p>
                    </div>
                    {/* Bookmarks */}
                    <div className="rounded-lg bg-primary text-primary-content flex flex-row justify-center items-center gap-4 p-4" onClick={() => handleViewChange('bookmarks')}>
                        <CgBookmark />
                        <p className="text-primary-content font-bold text-lg">Bookmarks</p>
                    </div>
                    {/* Timelines */}
                    <div className="rounded-lg bg-primary text-primary-content flex flex-row justify-center items-center gap-4 p-4" onClick={() => handleViewChange('timelines')}>
                        <CgCalendarDates />
                        <p className="text-primary-content font-bold text-lg">Timelines*</p>
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
                {/* Section to display selected content */}
                <section className="self-center w-full h-full m-4 p-4">
                    {renderSelectedView()}
                    
                </section>
                <div className='flex flex-col justify-center text-black text-center'>
                    <p>Version 0.1.64</p>
                </div>
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


export default IndexPage;
