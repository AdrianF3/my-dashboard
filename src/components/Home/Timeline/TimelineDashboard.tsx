import React from 'react';

interface TimelineDashboardProps {
    // Add any props you need for the component here
}

const TimelineDashboard: React.FC<TimelineDashboardProps> = () => {
    return (
        <div className='my-4 bg-slate-700/20'>
            {/* Add your component content here */}
            <h1>Timeline Dashboard</h1>
            <div className='flex flex-row justify-between'>

                <div>
                    <button>Day</button>
                    <button>Month</button>
                    <button>Year</button>
                    <p>TIMESCALE</p>
                </div>

                <div>
                    <p>TOTALS</p>
                </div>
                
                <div>
                    <button>Add Event</button>
                    <button>Manage Categories</button>
                </div>

            </div>
        </div>
    );
};

export default TimelineDashboard;