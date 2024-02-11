// pages/404.js
import React from 'react';

import Link from 'next/link';

export default function Custom404() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-semibold text-gray-800">404</h1>
                <p className="text-xl text-gray-600">Page Not Found</p>
                <p className="mt-4 text-gray-600">The page you are looking for does not seem to exist</p>
                <Link href="/" className="mt-6 text-blue-600 hover:underline">Go back home</Link>
            </div>
        </div>
    );
}
