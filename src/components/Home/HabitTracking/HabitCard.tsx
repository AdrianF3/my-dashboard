import React from "react";

interface HabitCardProps {
  title: string;
  goal: number;
  currentCount: number;
  frequency: string;
  id: number;
  logs: Array<any>;
  handleViewChange: (view: 'TRACK_HABIT' | 'HABIT_DETAILS', habit: { title: string, goal: number, currentCount: number, frequency: string, id: number, logs: Array<any> }) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ title, goal, currentCount, frequency, id, logs, handleViewChange }) => {
  // Calculate progress percentage
  const progressPercentage = Math.min((currentCount / goal) * 100, 100);

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>Goal: {goal} times {frequency}</p>
        <p>Current Progress: {currentCount}/{goal}</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <div className="card-actions justify-end">
          <p className="text-sm">Progress: {progressPercentage.toFixed(0)}%</p>          
        </div>
        {/* Add Button & Details Button */}
        <div className="card-actions justify-end">
          <button 
            className="btn btn-primary"
            onClick={() => handleViewChange('TRACK_HABIT', { title, goal, currentCount, frequency, id, logs })}
          >
            Add
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => handleViewChange('HABIT_DETAILS', { title, goal, currentCount, frequency, id, logs })}
          >
            Details
          </button>
        </div>



      </div>
    </div>
  );
};

export default HabitCard;
