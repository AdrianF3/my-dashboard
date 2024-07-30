import React, { Suspense, lazy } from 'react';
import TimelineDashboard from './TimelineContainer/TimelineDashboard';
import { placeholderEvents, TimelineEvent } from '../../../types/TimelineEvent.types';

// Lazily load the TimelineContainer component
const TimelineContainer = lazy(() => import('./TimelineContainer/TimelineContainer'));

interface TimelineCalcValues {
    startDate: Date | null;
    endDate: Date | null;
    timescale: 'Days' | 'Months' | 'Years';
    numEvents: number;
}


interface TimelineMainProps {
    // Add any props you need for the component here
}

const TimelineMain: React.FC<TimelineMainProps> = () => {
    const [timelineStatus, setTimelineStatus] = React.useState<string>('loading');
    const [timelineEventsData, setTimelineEventsData] = React.useState<TimelineEvent[]>([]);
    const [timelineCalcValues, setTimelineCalcValues] = React.useState<TimelineCalcValues>({
        startDate: null,
        endDate: null,
        timescale: 'Days',
        numEvents: 0
    });
    const [modal, setModal] = React.useState<string>('');

    React.useEffect(() => {
        // While testing/developing, load placeholder events
        setTimelineEventsData(placeholderEvents);
        setTimelineCalcValues((prevValues) => ({
            ...prevValues,
            numEvents: placeholderEvents.length
        }))

        // In the future, load user's timeline data from Firestore

        // If the array is empty, set as nothing found
        if (placeholderEvents.length === 0) {
            setTimelineStatus('empty');
            setTimelineCalcValues((prevValues) => ({
                ...prevValues,
                numEvents: placeholderEvents.length
            }))
        } else {
            // Set loading to ready
            setTimelineStatus('ready');
        }
    }, []);

    if (timelineStatus === 'empty') {
        return <div>No events could be found...</div>;
    }

    if (timelineStatus === 'error') {
        return <div>There was an error loading your timeline...</div>;
    }

    return (
        
        <Suspense fallback={<div>Loading timeline...</div>}>
                <div className='flex justify-center mt-4'>
                    <h2 className='text-2xl'>Timelines</h2>
                </div>
                <TimelineDashboard 
                    timelineCalcValues={timelineCalcValues} 
                    setModal={setModal} 
                    setTimelineCalcValues={setTimelineCalcValues}
                />
                <TimelineContainer eventData={timelineEventsData} />
        </Suspense>
        
    );
};

export default TimelineMain;
