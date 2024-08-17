import React, { useEffect, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import { TimelineEvent } from '@/types/TimelineEvent.types';
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

const PAGE_SIZE = 30; // Number of dates to display per page

const TimelineDisplay: React.FC<TimelineDisplayProps> = ({ eventData, timelineCalcValues }) => {
    const { startDate, endDate, timescale } = timelineCalcValues;
    const [dates, setDates] = useState<Date[]>([]);
    const [dateIndex, setDateIndex] = useState<{ [key: string]: number }>({});
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        if (startDate && endDate) {
            const { dates, dateIndex } = generateDates(startDate, endDate, timescale);
            setDates(dates);
            setDateIndex(dateIndex);
            setCurrentPage(0); // Reset to the first page when timescale changes
        }
    }, [startDate, endDate, timescale, eventData]);

    if (!startDate || !endDate) {
        return <div>No timeline data available...</div>;
    }

    const sortedEventsByCategory = generateEventsByCategory(eventData);

    const getCellPosition = (date: Date) => {
        return dateIndex[date.toISOString().split('T')[0]];
    };

    const displayedDates = dates.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if ((currentPage + 1) * PAGE_SIZE < dates.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="w-full overflow-x-auto">
            <div className="flex justify-between mb-2">
                <button onClick={handlePreviousPage} disabled={currentPage === 0}>
                    Previous
                </button>
                <button onClick={handleNextPage} disabled={(currentPage + 1) * PAGE_SIZE >= dates.length}>
                    Next
                </button>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        {displayedDates.map((date, index) => (
                            <th key={index} className="w-1/12 text-xs p-1 bg-gray-100 border">
                                {timescale === 'Days' && date.toLocaleDateString()}
                                {timescale === 'Months' && date.toLocaleDateString('default', { year: 'numeric', month: 'short' })}
                                {timescale === 'Years' && date.toLocaleDateString('default', { year: 'numeric' })}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(sortedEventsByCategory).map((category) => (
                        <React.Fragment key={category}>
                            <tr>
                                <td colSpan={PAGE_SIZE} className="bg-gray-200 text-left p-2 font-bold">
                                    {category}
                                </td>
                            </tr>
                            <tr>
                                {displayedDates.map((date, colIndex) => (
                                    <td key={colIndex} className="h-24 relative border">
                                        {sortedEventsByCategory[category].map((event) => {
                                            if (!event.visibility) return null;

                                            const startPosition = getCellPosition(event.beginDate.toDate());
                                            const endPosition = getCellPosition(event.endDate.toDate());
                                            const datePosition = dateIndex[date.toISOString().split('T')[0]];

                                            if (datePosition >= startPosition && datePosition <= endPosition) {
                                                const eventSpan = endPosition - startPosition + 1;
                                                return (
                                                    <div
                                                        key={event.id}
                                                        className={`absolute bg-blue-500 text-white rounded p-2 shadow-md event-span-${eventSpan}`}
                                                        style={{
                                                            left: 0,
                                                            right: 0,
                                                            width: '100%',
                                                            height: '100%',
                                                            top: 0,
                                                            zIndex: 1,
                                                        }}
                                                    >
                                                        {datePosition === startPosition && (
                                                            <div className="sticky top-0">
                                                                <h2 className="text-sm font-bold">{event.title}</h2>
                                                                <p className="text-xs">{event.beginDate.toDate().toLocaleDateString()} - {event.endDate.toDate().toLocaleDateString()}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                    </td>
                                ))}
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TimelineDisplay;
