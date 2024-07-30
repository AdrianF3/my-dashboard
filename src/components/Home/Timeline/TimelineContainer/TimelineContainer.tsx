import React from 'react';
import TimelineDisplay from './TimelineDisplay';
import { TimelineEvent } from '../../../../types/TimelineEvent.types';

interface TimelineCalcValues {
    startDate: Date | null;
    endDate: Date | null;
    timescale: 'Days' | 'Months' | 'Years';
    numEvents: number;
}
interface TimelineContainerProps {
    eventData: TimelineEvent[];
    timelineCalcValues: TimelineCalcValues;
}

const TimelineContainer: React.FC<TimelineContainerProps> = ({ eventData, timelineCalcValues }) => {
    return (
        <div className='my-4 bg-slate-700/20 p-4 rounded'>
            <h1 className='text-lg font-bold mb-4'>Timeline Container</h1>
            <div className='flex flex-row bg-sky-500 rounded'>
                <TimelineDisplay eventData={eventData} timelineCalcValues={timelineCalcValues} />
            </div>
        </div>
    );
};

export default TimelineContainer;