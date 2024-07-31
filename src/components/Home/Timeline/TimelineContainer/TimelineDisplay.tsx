import React, { useEffect, useState } from 'react';
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
    const [dates, setDates] = useState<Date[]>([]);

    useEffect(() => {
        if (startDate && endDate) {
            const generatedDates = generateDates(startDate, endDate, timescale);
            setDates(generatedDates);
        }
    }, [startDate, endDate, timescale]);

    if (!startDate || !endDate) {
        return <div>No timeline data available...</div>;
    }

    const dateWidth = 100 / dates.length;

    return (
        <div className="relative w-full h-48 bg-gray-200 overflow-x-scroll">
            <div className="relative flex">
                {/* Render Dates */}
                {dates.map((date, index) => (
                    <div
                        key={index}
                        className="relative flex-shrink-0 text-xs text-gray-700 bg-white p-1 rounded shadow"
                        style={{
                            width: `${dateWidth}%`,
                            whiteSpace: 'nowrap',
                            padding: '4px',
                            margin: '4px',
                        }}
                    >
                        {date.toLocaleDateString()}
                    </div>
                ))}
            </div>

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