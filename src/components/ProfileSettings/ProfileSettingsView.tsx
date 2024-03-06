import React, { useState, useEffect } from "react";
import { UserProfile } from '../../types/UserProfile.types';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { CgProfile } from 'react-icons/cg';



const BookmarkDisplay: React.FC<{ profile: UserProfile | null; }> = ({ profile }) => {    
    const [theme, setTheme] = useState<string>("light");
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

    //function to update the profile theme
    const handleThemeChange = (theme: string) => {
        // return if profile is empty
        if (!profile) return;

        // update the profile with the new theme
        const updatedProfile = { ...profile, theme: theme };
        // save the updated profile to firestore
        console.log('updatedProfile', updatedProfile)
        // update gcp firestore
        const profileRef = doc(db, 'userProfile', profile.uid);
        updateDoc(profileRef, updatedProfile).then(() => {
          console.log('Profile updated successfully');
        }).catch(error => {
          console.error('Error updating profile:', error);
        });
    }

        
    



    return (
        <div className="flex flex-col gap-4 justify-around rounded border-2 border-accent self-center bg-primary text-primary-content p-4">
            <div className="flex flex-col justify-center">
              <div className="flex flex-col p-4">
                <h1 className="text-2xl font-bold">Bookmarks</h1>
                <p className="text-lg text-accent-content">
                  Welcome to Dash - very much a project in progress. Save changes below and hope they work out for you. 
                </p>
              </div>
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
                                onChange={(e) => setTheme(e.target.value)}
                            >                                
                                {listOfThemes.map((theme) => (
                                <option key={theme} value={theme}>
                                    {theme}
                                </option>
                                ))}
                            </select>
                        </div>
                           
                

            </div>                
        </div>
        
    );
};

export default BookmarkDisplay;
