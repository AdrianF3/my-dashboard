// HabitDetails.tsx
import React from 'react';
import { Habit } from '@/types/Habit.types';


const HabitDetails: React.FC<{ habit: Habit; viewReset: () => void }> = ({ habit, viewReset }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-2xl font-bold mb-4">{habit.title}</h2>
      <p className="text-lg mb-2">Goal: {habit.goal}</p>
      <p className="text-lg mb-4">Frequency: {habit.frequency}</p>
      <div>
        <h3 className="text-xl font-semibold mb-2">Progress Logs:</h3>
        {habit.logs.length > 0 ? (
          <ul>
            {habit.logs.map((log, index) => (
              <li key={index} className="mb-2">
                <div className="text-sm font-medium">Date: {new Date(log.date).toLocaleString()}</div>
                <div className="text-sm">Count: {log.count}</div>
                <div className="text-sm italic">Note: {log.note}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No logs yet.</p>
        )}
      </div>
        <div className="flex justify-end mt-4">
            <button onClick={viewReset} className="btn btn-secondary">
            Back
            </button>
        </div>
    </div>
  );
};

export default HabitDetails;
