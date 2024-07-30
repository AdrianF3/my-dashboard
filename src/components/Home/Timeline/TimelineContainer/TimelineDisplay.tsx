import React from 'react';
import { TimelineEvent } from '../../../../types/TimelineEvent.types';

interface TimelineDisplayProps {
    eventData: TimelineEvent[];
}

const TimelineDisplay: React.FC<TimelineDisplayProps> = ({ eventData }) => {
    return (
        <div className="space-y-4 p-4">
            {eventData.map((event) => (
                event.visibility ? <>
                    
                <div key={event.id} className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-bold">{event.title}</h2>
                    <p className="text-sm text-gray-600">{event.beginDate.toDate().toLocaleDateString()} - {event.endDate.toDate().toLocaleDateString()}</p>
                    <p className='text-sm text-gray-699'>{event.category}</p>
                    <p className="mt-2">{event.description}</p>
                    {event.address && <p className="mt-2 text-sm text-gray-800">Location: {event.address}</p>}
                    {event.links && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-800">Links:</p>
                            <ul className="list-disc list-inside">
                                {event.links.map((link, index) => (
                                    <li key={index}>
                                        <a href={link} className="text-blue-600 hover:underline">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {event.notes && <p className="mt-2 text-sm text-gray-800">Notes: {event.notes}</p>}
                    {event.tags && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-800">Tags:</p>
                            <ul className="list-disc list-inside">
                                {event.tags.map((tag, index) => (
                                    <li key={index}>{tag}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <p className="mt-2 text-sm text-gray-800">Status: {event.status}</p>
                </div>
                </> : null 
            ))}
        </div>
    );
};

export default TimelineDisplay;
