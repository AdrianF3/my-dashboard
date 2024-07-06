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

const PrivacyPolicyPage: React.FC = ({  }) => {
    const { user, loading: authLoading, logout } = useAuth();
    const [ profileUID, setProfileUID ] = useState<any>(null);
    const authenticated = !!user;
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

    React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
      }, [theme]);

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

    return (
        <>            
            <section className='flex flex-col w-full bg-base-100'>
                {/* Top div */}
                <HeaderNavigationBar />

                {/* Privacy Policy Section */}
                <section>
                    <div className='m-10 p-10 text-black'>
                        <h1>Privacy Policy</h1>
                        <p className='py-4'>Welcome to Dash.AFWebDev.com. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>
                        
                        <p className='py-4'><strong>1. Information Collection: </strong>
                        We may collect information about you in a variety of ways. The information we may collect on the Site includes personal data, such as your name, email address, and demographic information, as well as data about your usage of our site.</p>
                        
                        <p className='py-4'><strong>2. Use of Your Information: </strong>
                        We may use the information we collect about you to personalize your experience on our site, improve our website, and communicate with you about our services.</p>
                        
                        <p className='py-4'><strong>3. Disclosure of Your Information: </strong>
                        We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users, so long as those parties agree to keep this information confidential.</p>
                        
                        <p className='py-4'><strong>4. Security of Your Information: </strong>
                        We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other types of misuse.</p>
                        
                        <p className='py-4'><strong>5. Changes to This Privacy Policy: </strong>
                        We may update this Privacy Policy from time to time in order to reflect changes to our practices or for other operational, legal, or regulatory reasons.</p>
                        
                        <p className='py-4'><strong>6. Contact Information: </strong>
                        If you have any questions about this Privacy Policy, please contact us at AdrianF.WebDev@gmail.com.</p>
                    </div>
                </section>

                <Footer />
            </section>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const token = context.req.cookies['authToken'];        
        
        if (typeof token !== 'string') {            
            return {
                props: { authenticated: false },                
            };
        }

        await firebaseAdmin.auth().verifyIdToken(token);
        return { props: { authenticated: true } };
    } catch (error) {
        return { props: { authenticated: false } };
    }
};

export default PrivacyPolicyPage;
