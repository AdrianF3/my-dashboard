import React from "react";

interface HabitCardProps {
  name: string;
  goal: number;
  currentCount: number;
  frequency: string;
}

const HabitCard: React.FC<HabitCardProps> = ({ name, goal, currentCount, frequency }) => {
  // Calculate progress percentage
  const progressPercentage = Math.min((currentCount / goal) * 100, 100);

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>Goal: {goal} times {frequency}</p>
        <p>Current Progress: {currentCount}/{goal}</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <div className="card-actions justify-end">
          <p className="text-sm">Progress: {progressPercentage.toFixed(0)}%</p>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
