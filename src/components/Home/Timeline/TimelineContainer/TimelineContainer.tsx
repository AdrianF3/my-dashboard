import React from 'react';
import TimelineDisplay from './TimelineDisplay';
import { TimelineEvent } from '../../../../types/TimelineEvent.types';

interface TimelineContainerProps {
    eventData: TimelineEvent[];
}

const TimelineContainer: React.FC<TimelineContainerProps> = ({ eventData }) => {
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
                    <TimelineDisplay eventData={eventData} />
                </div>

            </div>
        </div>
    );
};

export default TimelineContainer;
