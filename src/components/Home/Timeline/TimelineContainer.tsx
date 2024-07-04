import React from 'react';

interface TimelineContainerProps {
    // Add any props you need for the component here
}

const TimelineContainer: React.FC<TimelineContainerProps> = () => {
    return (
        <div className='my-4 bg-slate-700/20'>
            {/* Add your component content here */}
            <h1>Timeline Container</h1>
            <div className='flex flex-row'>
                
                {/* Timeline Filter */}
                <div className='flex w-1/3 bg-sky-300'>
                    <p>TIMELINE FILTER</p>
                </div>

                {/* Timeline Display */}
                <div className='flex w-2/3 bg-sky-500'>
                    <p>TIMELINE DISPLAY</p>
                </div>

            </div>
        </div>
    );
};

export default TimelineContainer;