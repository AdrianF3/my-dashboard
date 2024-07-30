import React from 'react';

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

interface TimelineDashboardProps {
    timelineCalcValues: TimelineCalcValues;
    setTimelineCalcValues: React.Dispatch<React.SetStateAction<TimelineCalcValues>>;
    setModal: (value: string) => void;
    selectedCategories: Category[];
    setSelectedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const TimelineDashboard: React.FC<TimelineDashboardProps> = ({timelineCalcValues, setTimelineCalcValues, setModal, selectedCategories, setSelectedCategories}) => {

    const updateTimeScale = (newTimescaleValue: TimelineCalcValues['timescale']) => {
        // pass new value to state
        setTimelineCalcValues((prevValue) => ({
            ...prevValue,
            timescale: newTimescaleValue
        }));
    };

    // Update current filters
    const toggleCategory = (toggledCategory: Category) => {
        setSelectedCategories((prevCategories) => 
            prevCategories.includes(toggledCategory)
                ? prevCategories.filter(category => category !== toggledCategory)
                : [...prevCategories, toggledCategory]
        );
    };

    const formatDate = (date: Date | null): string => {
        return date ? date.toLocaleDateString() : 'N/A';
    };

    return (
        <div className='my-4 bg-slate-700/20'>                        
            {/* Section for Display Management */}
            <div className='flex flex-row justify-between'>
                <div className='flex flex-row justify-between gap-4'>
                    <button className={ timelineCalcValues.timescale === 'Days' ? `bg-blue-300` : `bg-red-300`} onClick={() => updateTimeScale('Days')}>Days</button>
                    <button className={ timelineCalcValues.timescale === 'Months' ? `bg-blue-300` : `bg-red-300`} onClick={() => updateTimeScale('Months')}>Months</button>
                    <button className={ timelineCalcValues.timescale === 'Years' ? `bg-blue-300` : `bg-red-300`} onClick={() => updateTimeScale('Years')}>Years</button>
                </div>
                <div>
                    <p>TOTAL Events: {timelineCalcValues.numEvents}</p>
                    <p>Start Date: {formatDate(timelineCalcValues.startDate)}</p>
                    <p>End Date: {formatDate(timelineCalcValues.endDate)}</p>
                </div>
                <div>
                    <button onClick={() => setModal('addEvent')}>
                        Add Event
                    </button>  
                </div>
            </div>

            {/* Section for Filter Management */}
            <div className='flex flex-row justify-between'>
                {categories.map((category) => (
                    <button 
                        key={category} 
                        onClick={() => toggleCategory(category)}
                        className={`btn ${selectedCategories.includes(category) ? 'btn-active' : ''}`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TimelineDashboard;
