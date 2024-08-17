import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
    return (
        <div className='flex flex-col bg-slate-900 py-4 text-white font-medium justify-center text-center w-full'>
            <p>Dash.AFWebDev.com | Version 0.1.66D</p>

            {/* Links to TOS and Privacy Policy */}
            <div className='flex flex-row justify-center text-slate-400'>
                
                {/* <a href='/tos' className='px-2'>Terms of Service</a>
                <a href='/privacy' className='px-2'>Privacy Policy</a>
                 */}
                 <Link href='/tos' className='px-2'>Terms of Service</Link>
                 <Link href='/privacy' className='px-2'>Privacy Policy</Link>
            </div>
        </div>
    );
};

export default Footer;