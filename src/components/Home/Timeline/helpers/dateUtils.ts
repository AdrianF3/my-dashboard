// helpers/dateUtils.ts

import { TimelineEvent } from "@/types/TimelineEvent.types";

export const calculateDatePosition = (date: Date, startDate: Date, endDate: Date, timescale: 'Days' | 'Months' | 'Years') => {
    let totalDuration, dateOffset;

    switch (timescale) {
        case 'Days':
            totalDuration = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
            dateOffset = (date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
            break;
        case 'Months':
            totalDuration = (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth());
            dateOffset = (date.getFullYear() - startDate.getFullYear()) * 12 + (date.getMonth() - startDate.getMonth());
            break;
        case 'Years':
            totalDuration = endDate.getFullYear() - startDate.getFullYear();
            dateOffset = date.getFullYear() - startDate.getFullYear();
            break;
        default:
            totalDuration = endDate.getTime() - startDate.getTime();
            dateOffset = date.getTime() - startDate.getTime();
    }

    return (dateOffset / totalDuration) * 100;
};


export const generateDates = (startDate: Date, endDate: Date, timescale: 'Days' | 'Months' | 'Years'): { dates: Date[], dateIndex: { [key: string]: number } } => {
    const dates: Date[] = [];
    const dateIndex: { [key: string]: number } = {};
    let currentDate = new Date(startDate);
    let index = 0;

    while (currentDate <= endDate) {
        dates.push(new Date(currentDate));
        dateIndex[currentDate.toISOString().split('T')[0]] = index; // Using ISO date string as key
        index++;

        if (timescale === 'Days') {
            currentDate.setDate(currentDate.getDate() + 1);
        } else if (timescale === 'Months') {
            currentDate.setMonth(currentDate.getMonth() + 1);
        } else if (timescale === 'Years') {
            currentDate.setFullYear(currentDate.getFullYear() + 1);
        }
    }

    return { dates, dateIndex };
};

export const generateEventsByCategory = (timelineEvents: TimelineEvent[]): Record<string, TimelineEvent[]> => {
    // Create an empty object to store events by category
    const eventsByCategory: Record<string, TimelineEvent[]> = {};

    // Iterate through each event
    timelineEvents.forEach(event => {
        const { category } = event;

        // If the category doesn't exist in the object, create an array for it
        if (!eventsByCategory[category]) {
            eventsByCategory[category] = [];
        }

        // Add the event to the corresponding category array
        eventsByCategory[category].push(event);
    });

    // Sort the categories in descending order
    const sortedCategories = Object.keys(eventsByCategory).sort((a, b) => b.localeCompare(a));

    // Create a new object with sorted categories
    const sortedEventsByCategory: Record<string, TimelineEvent[]> = {};
    sortedCategories.forEach(category => {
        sortedEventsByCategory[category] = eventsByCategory[category];
    });

    return sortedEventsByCategory;
}

