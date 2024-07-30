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

const categories = [
    'personal', 
    'relationship', 
    'home', 
    'education', 
    'pet', 
    'hobbies', 
    'travel', 
    'social', 
    'health', 
    'work'
] as const;
type Category = typeof categories[number];



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
    const [selectedCategories, setSelectedCategories] = React.useState<Category[]>([...categories]);

    console.log('selectedCategories', selectedCategories)

    React.useEffect(() => {
        // While testing/developing, load placeholder events
        const eventsWithVisibility = placeholderEvents.map(event => ({
            ...event,
            visible: selectedCategories.includes(event.category as Category)
        }));
        setTimelineEventsData(eventsWithVisibility);

        // Calculate the startDate and endDate
        const beginDates = eventsWithVisibility.map(event => event.beginDate.toDate());
        const endDates = eventsWithVisibility.map(event => event.endDate.toDate());
        const startDate = beginDates.length > 0 ? new Date(Math.min(...beginDates.map(date => date.getTime()))) : null;
        const endDate = endDates.length > 0 ? new Date(Math.max(...endDates.map(date => date.getTime()))) : null;

        setTimelineCalcValues((prevValues) => ({
            ...prevValues,
            startDate,
            endDate,
            numEvents: placeholderEvents.length
        }));

        // In the future, load user's timeline data from Firestore

        // If the array is empty, set as nothing found
        if (placeholderEvents.length === 0) {
            setTimelineStatus('empty');
        } else {
            // Set loading to ready
            setTimelineStatus('ready');
        }
    }, []);

    // Use Effect to filter timelineEventsData if categories is updated
    React.useEffect(() => {
        // Toggle visibility based on selectedCategories
        setTimelineEventsData((prevEvents) =>
            prevEvents.map(event => ({
                ...event,
                visibility: selectedCategories.includes(event.category as Category)
            }))
        );
    }, [selectedCategories]);


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
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                />
                <TimelineContainer eventData={timelineEventsData} />
        </Suspense>
        
    );
};

export default TimelineMain;
