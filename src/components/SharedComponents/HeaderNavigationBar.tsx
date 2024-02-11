import React from 'react';
import  Link from 'next/link';
import { CgHomeAlt, CgProfile, CgLogIn } from 'react-icons/cg';
import { getAuth, signOut } from "firebase/auth";

const HeaderNavigationBar: React.FC = () => {

    const handleLogout = async () => {
        const auth = getAuth();
        await signOut(auth);
        // Handle logout
    };


    return (
        <div className="w-screen p-4 bg-base-300">
            {/* Content of the top div */}
            <div className="flex flex-col md:flex-row justify-around gap-4 bg-accent w-full p-4 rounded-box">
                <button className="btn btn-outline btn-content text-primary-content">
                    <Link href="/">             
                    <div className='flex flex-col justify-center items-center'>
                        <CgHomeAlt />
                        Dashboard
                    </div>       
                    </Link>
                </button>                
                <button className="btn btn-outline btn-content text-primary-content" onClick={handleLogout}>
                    <div className='flex flex-col justify-center items-center'> 
                        <CgLogIn />
                        Logout
                    </div>                    
                </button>
            </div>
        </div>
    );
};

export default HeaderNavigationBar;
