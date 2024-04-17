import React, { useState, useEffect } from "react";
import { UserProfile } from '../../types/UserProfile.types';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { CgProfile } from 'react-icons/cg';



const BookmarkDisplay: React.FC<{ profile: UserProfile | null; }> = ({ profile }) => {    
    const [theme, setTheme] = useState<string>(profile?.theme || "light");
    const [name, setName] = useState<string>(profile?.name || "User Name Not Found");
    const [zipcode, setZipcode] = useState<string>(profile?.zipCode || "Zipcode Not Found");
    const [aboutMe, setAboutMe] = useState<string>(profile?.bio || "About Me Not Found");

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

    //function to update the profile name by using name state
    const handleNameChange = () => {
        // return if profile is empty
        if (!profile) return;

        // update the profile with the new name
        const updatedProfile = { ...profile, name: name };
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

    //function to update the profile zipcode by using zipcode state
    const handleZipcodeChange = () => {
        // return if profile is empty
        if (!profile) return;

        // update the profile with the new zipcode
        const updatedProfile = { ...profile, zipCode: zipcode };
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

    //function to update the profile bio by using aboutMe state
    const handleAboutMeChange = () => {
        // return if profile is empty
        if (!profile) return;

        // update the profile with the new bio
        const updatedProfile = { ...profile, bio: aboutMe };
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

            {/* Input for changing name */}
            <div className='rounded-lg bg-primary text-primary-content flex flex-row justify-center items-center gap-4 p-4 mt-10'>
                <label className="label label-accent">Name</label>
                <input 
                    type="text" 
                    placeholder="Enter your name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="input input-accent w-full max-w-xs"
                />
                {/* only show button if profile.name != name state */}
                { profile?.name === name ? null : 
                <button 
                className="btn btn-accent"
                onClick={handleNameChange}
                >
                    Save Name
                </button>
                }
            </div>

            {/* Text Area Input for changing aboutMe */}
            <div className='rounded-lg bg-primary text-primary-content flex flex-row justify-center items-center gap-4 p-4 mt-10'>
                <label className="label label-accent">Bio</label>
                <textarea 
                    placeholder="Enter your bio" 
                    value={aboutMe} 
                    onChange={(e) => setAboutMe(e.target.value)}
                    className="textarea textarea-accent w-full max-w-xs"
                />
                {/* only show button if profile.bio != aboutMe state */}
                { profile?.bio === aboutMe ? null : 
                <button 
                className="btn btn-accent"
                onClick={handleAboutMeChange}
                >
                    Save Bio
                </button>
                }
            </div>

            {/* Input for Progress Equals Section */}
            {/* <div className='rounded-lg bg-primary text-primary-content flex flex-row justify-center items-center gap-4 p-4 mt-10'>
                <label className="label label-accent">Progress Equals</label>
                <input 
                    type="text" 
                    placeholder="Enter your progress equals" 
                    value={profile?.progressEquals || "Progress Equals Not Found"} 
                    className="input input-accent w-full max-w-xs"
                />
            </div> */}

            {/* Input for changing zipcode */}
            <div className='rounded-lg bg-primary text-primary-content flex flex-row justify-center items-center gap-4 p-4 mt-10'>
                <label className="label label-accent">Zipcode</label>
                <input 
                    type="text" 
                    placeholder="Enter your zipcode" 
                    value={zipcode} 
                    onChange={(e) => setZipcode(e.target.value)}
                    className="input input-accent w-full max-w-xs"
                />
                {/* only show button if profile.zipcode != zipcode state */}
                { profile?.zipCode === zipcode ? null : 
                <button 
                className="btn btn-accent"
                onClick={handleZipcodeChange}
                >
                    Save Zipcode
                </button>
                }
            </div>


            {/* Select for saving theme */}
            <div className='rounded-lg bg-primary text-primary-content flex flex-row justify-center items-center gap-4 p-4 mt-10'>
                <p>Current Theme: {theme}</p>                            
                {/* Select to choose new theme from listOfThemes */}
                <select 
                    className="select select-accent w-full max-w-xs"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                >                                
                    {listOfThemes.map((theme) => (
                    <option key={theme} value={theme} className="bg-accent text-accent-content">
                        {theme}
                    </option>
                    ))}
                </select>

                {/* Button to save Theme */}
                {/* only show button if profile.theme != theme state */}
                { profile?.theme === theme ? null : 
                <button 
                className="btn btn-accent"
                onClick={() => handleThemeChange(theme)}
                >
                    Save Theme
                </button>
                }
                
            </div> 

            </div>                
        </div>
        
    );
};

export default BookmarkDisplay;
