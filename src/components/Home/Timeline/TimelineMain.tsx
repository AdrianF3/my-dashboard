import React from 'react';
import TimelineDashboard from './TimelineDashboard';
import TimelineContainer from './TimelineContainer';

interface TimelineMainProps {
    // Add any props you need for the component here
}

const TimelineMain: React.FC<TimelineMainProps> = () => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [modal, setModal] = React.useState<boolean>(false);



    return (
        <div className='bg-slate-900/20'>
            {/* Add your component content here */}
            <h1>Timeline Main</h1>            
            <TimelineDashboard />
            <TimelineContainer />
        </div>
    );
};

export default TimelineMain;