import React from 'react';
import { TimelineEvent } from '../../../../types/TimelineEvent.types';
import { calculateDatePosition, generateDates } from '../helpers/dateUtils';

interface TimelineCalcValues {
    startDate: Date | null;
    endDate: Date | null;
    timescale: 'Days' | 'Months' | 'Years';
    numEvents: number;
}
interface TimelineDisplayProps {
    eventData: TimelineEvent[];
    timelineCalcValues: TimelineCalcValues;
}

const TimelineDisplay: React.FC<TimelineDisplayProps> = ({ eventData, timelineCalcValues }) => {
    const { startDate, endDate, timescale } = timelineCalcValues;

    if (!startDate || !endDate) {
        return <div>No timeline data available...</div>;
    }

    const dates = generateDates(startDate, endDate, timescale);
    const dateWidth = 100 / dates.length; // Percentage width of each date to avoid overlapping

    return (
        <div className="relative w-full h-48 bg-gray-200 overflow-x-scroll">
            {/* Render Dates */}
            {dates.map((date, index) => {
                const position = index * dateWidth; // Calculate the position based on index and dateWidth
                return (
                    <div
                        key={index}
                        className="absolute text-xs text-gray-700 bg-white p-1 rounded shadow"
                        style={{
                            left: `${position}%`,
                            top: '0',
                            transform: 'translateX(-50%)',
                            whiteSpace: 'nowrap',
                            padding: '4px',
                            margin: '4px',
                        }}
                    >
                        {date.toLocaleDateString()}
                    </div>
                );
            })}

            {/* Render Events */}
            {eventData.map((event) => {
                if (!event.visibility) return null;

                const startPosition = calculateDatePosition(event.beginDate.toDate(), startDate, endDate);
                const endPosition = calculateDatePosition(event.endDate.toDate(), startDate, endDate);
                const width = endPosition - startPosition;

                return (
                    <div
                        key={event.id}
                        className="absolute bg-blue-500 text-white rounded p-2 shadow-md"
                        style={{
                            left: `${startPosition}%`,
                            width: `${width}%`,
                            top: '50%',
                            transform: 'translateY(-50%)',
                        }}
                    >
                        <h2 className="text-sm font-bold">{event.title}</h2>
                        <p className="text-xs">{event.beginDate.toDate().toLocaleDateString()} - {event.endDate.toDate().toLocaleDateString()}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default TimelineDisplay;
