import React from "react";
import { format, startOfWeek, startOfMonth } from "date-fns";
import { HabitLog } from "@/types/HabitLog.types";
import { Timestamp } from "firebase/firestore";

interface HabitCardProps {
  title: string;
  goal: number;
  frequency: string;
  id: string;
  logs: HabitLog[];
  beginDateTime: Timestamp | null;
  handleViewChange: (
    view: 'TRACK_HABIT' | 'HABIT_DETAILS',
    habit: HabitCardProps
  ) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({
  title,
  goal,
  frequency,
  id,
  logs,
  beginDateTime,
  handleViewChange,
}) => {
  type GroupedLogs = {
    [key: string]: number[];
  };

  const getCurrentPeriodKey = (date: Date, frequency: string): string => {
    switch (frequency) {
      case 'daily':
        return format(date, 'yyyy-MM-dd');
      case 'weekly':
        return format(startOfWeek(date), 'yyyy-MM-dd');
      case 'monthly':
        return format(startOfMonth(date), 'yyyy-MM');
      default:
        return format(date, 'yyyy-MM-dd');
    }
  };

  const calculateCurrentPeriodProgress = (groupedLogs: GroupedLogs, currentPeriodKey: string): number => {
    const currentPeriodLogs = groupedLogs[currentPeriodKey] || [];
    return currentPeriodLogs.reduce((sum, count) => sum + count, 0);
  };

  // Organize logs into groups by period
  const groupedLogs = logs.reduce((acc: GroupedLogs, log) => {
    if (log.dateTime && log.dateTime instanceof Timestamp) {
      const date = log.dateTime.toDate();
      const periodKey = getCurrentPeriodKey(date, frequency);
      if (!acc[periodKey]) {
        acc[periodKey] = [];
      }
      acc[periodKey].push(log.count);
    } else {
      console.error('log.dateTime is not a Timestamp:', log);
    }
    return acc;
  }, {});

  // Determine the key for the current period
  const now = new Date();
  const currentPeriodKey = getCurrentPeriodKey(now, frequency);

  // Calculate progress for the current period
  const currentPeriodProgress = calculateCurrentPeriodProgress(groupedLogs, currentPeriodKey);

  // Calculate the progress percentage for the current period
  const currentPeriodProgressPercentage = Math.min((currentPeriodProgress / goal) * 100, 100);

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>Goal: {goal} times {frequency}</p>
        <p>Current Period Progress: {currentPeriodProgress}/{goal}</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${currentPeriodProgressPercentage}%` }}></div>
        </div>
        <div className="card-actions justify-end">
          <p className="text-sm">Progress: {currentPeriodProgressPercentage.toFixed(0)}%</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => handleViewChange('HABIT_DETAILS', {
            title,
            goal,
            frequency,
            id,
            logs,
            beginDateTime,
            handleViewChange, // Add the missing handleViewChange property
          })}
        >
          View Details
        </button>
        <button
          className="btn btn-secondary"
          onClick={() => handleViewChange('TRACK_HABIT', {
            title,
            goal,
            frequency,
            id,
            logs,
            beginDateTime,
            handleViewChange, // Add the missing handleViewChange property
          })}
        >
          Track Habit
        </button>
        

      </div>
    </div>
  );
};

export default HabitCard;
