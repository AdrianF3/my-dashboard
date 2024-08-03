import React, { useEffect, useState } from 'react';
import { TimelineEvent } from '../../../../types/TimelineEvent.types';
import { generateDates, generateEventsByCategory } from '../helpers/dateUtils';

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
    const [dateIndex, setDateIndex] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        if (startDate && endDate) {
            const { dates, dateIndex } = generateDates(startDate, endDate, timescale);
            setDates(dates);
            setDateIndex(dateIndex);
        }
    }, [startDate, endDate, timescale, eventData]);

    if (!startDate || !endDate) {
        return <div>No timeline data available...</div>;
    }

    const dateWidth = "12.5%"; // roughly 1/8th of the display width

    return (
        <div className="relative w-full h-48 bg-gray-200 overflow-x-auto">
            <div className="relative flex">
                {/* Render Dates */}
                {dates.map((date, index) => (
                    <div
                        key={index}
                        className="relative flex-shrink-0 text-xs text-gray-700 bg-white p-1 rounded shadow"
                        style={{
                            width: dateWidth,
                            whiteSpace: 'nowrap',
                            padding: '4px',
                            margin: '4px',
                        }}
                    >
                        {date.toLocaleDateString()}
                    </div>
                ))}
            </div>

            <div className="relative w-full h-full">
                {/* Render Events */}
                {eventData.map((event) => {
                    if (!event.visibility) return null;

                    const startIndex = dateIndex[event.beginDate.toDate().toISOString().split('T')[0]];
                    const endIndex = dateIndex[event.endDate.toDate().toISOString().split('T')[0]];
                    const leftPosition = (startIndex / dates.length) * 100;
                    const width = ((endIndex - startIndex + 1) / dates.length) * 100;

                    return (
                        <div
                            key={event.id}
                            className="absolute bg-blue-500 text-white rounded p-2 shadow-md"
                            style={{
                                left: `${leftPosition}%`,
                                width: `${width}%`,
                                top: `${10 * parseInt(event.id, 10)}%`, // Adjust this to space out events
                                transform: 'translateY(-50%)',
                            }}
                        >
                            <h2 className="text-sm font-bold">{event.title}</h2>
                            <p className="text-xs">{event.beginDate.toDate().toLocaleDateString()} - {event.endDate.toDate().toLocaleDateString()}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TimelineDisplay;
