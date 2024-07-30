import React from 'react';

interface TimelineCalcValues {
    startDate: Date | null;
    endDate: Date | null;
    timescale: 'Days' | 'Months' | 'Years';
    numEvents: number;
}


interface TimelineDashboardProps {
    timelineCalcValues: TimelineCalcValues;
    setTimelineCalcValues: React.Dispatch<React.SetStateAction<TimelineCalcValues>>;
    setModal: (value: string) => void;
}


const TimelineDashboard: React.FC<TimelineDashboardProps> = ({timelineCalcValues, setTimelineCalcValues, setModal}) => {

    const updateTimeScale = (newTimescaleValue: TimelineCalcValues['timescale']) => {
        // pass new value to state
        setTimelineCalcValues((prevValue) => ({
            ...prevValue,
            timescale: newTimescaleValue
        }));
    };

    
    return (
        <div className='my-4 bg-slate-700/20'>                        
            <div className='flex flex-row justify-between'>

            <div className='flex flex-row justify-between gap-4'>
                <button className={ timelineCalcValues.timescale === 'Days' ? `bg-blue-300` : `bg-red-300`} onClick={() => updateTimeScale('Days')}>Days</button>
                <button className={ timelineCalcValues.timescale === 'Months' ? `bg-blue-300` : `bg-red-300`} onClick={() => updateTimeScale('Months')}>Months</button>
                <button className={ timelineCalcValues.timescale === 'Years' ? `bg-blue-300` : `bg-red-300`} onClick={() => updateTimeScale('Years')}>Years</button>
            </div>

                <div>
                    <p>TOTAL Events: {timelineCalcValues.numEvents}</p>
                </div>
                
                <div>
                    <button onClick={() => setModal('addEvent')}>
                        Add Event
                    </button>  
                </div>

            </div>
        </div>
    );
};

export default TimelineDashboard;