import React, { useState, useEffect } from 'react';
import { Habit } from '@/types/Habit.types';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, differenceInCalendarDays, startOfWeek, startOfMonth } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

const HabitDetails: React.FC<{ habit: Habit; viewReset: () => void }> = ({ habit, viewReset }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [groupedLogs, setGroupedLogs] = useState<{ [key: string]: any[] }>({});
  const [periods, setPeriods] = useState<any[]>([]);

  useEffect(() => {
    const groupLogs = () => {
      const groups: { [key: string]: any[] } = {};
      habit.logs.forEach(log => {
        if (log.dateTime instanceof Timestamp) {
          const logDate = log.dateTime.toDate(); // Convert Timestamp to Date
          let key;
          switch (habit.frequency) {
            case 'daily':
              key = format(logDate, 'yyyy-MM-dd');
              break;
            case 'weekly':
              key = format(startOfWeek(logDate), 'yyyy-MM-dd');
              break;
            case 'monthly':
              key = format(startOfMonth(logDate), 'yyyy-MM');
              break;
            default:
              key = format(logDate, 'yyyy-MM-dd');
          }
          if (!groups[key]) groups[key] = [];
          groups[key].push(log);
        } else {
          console.error('log.dateTime is not a Timestamp:', log);
        }
      });
      setGroupedLogs(groups);

      const sortedKeys = Object.keys(groups).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
      setPeriods(sortedKeys.slice(0, 5).map(key => ({ period: key, logs: groups[key] })));
    };

    groupLogs();
  }, [habit.logs, habit.frequency]);

  // Calculate cumulative progress (total count of all logs)
  const totalProgress = habit.logs.reduce((acc, curr) => acc + curr.count, 0);
  

  // Ensure habit.beginDateTime is a Timestamp before using it
  const formattedBeginDateTime = habit.beginDateTime && habit.beginDateTime instanceof Timestamp
    ? format(habit.beginDateTime.toDate(), 'yyyy-MM-dd \'at\' hh:mm a')
    : 'Invalid date';

   // Calculate the cumulative goal considering beginDateTime as Timestamp
   const daysSinceBegin = habit.beginDateTime && habit.beginDateTime instanceof Timestamp
   ? differenceInCalendarDays(new Date(), habit.beginDateTime.toDate())
   : 0;
 const cumulativeGoal = habit.goal * daysSinceBegin;


  const renderLogsForSelectedDate = () => {
    const key = format(selectedDate, 'yyyy-MM-dd');
    return groupedLogs[key]?.map((log, index) => (
      <li key={index} className="mb-2">
        <div className="text-sm font-medium">Date: {format(log.dateTime.toDate(), 'yyyy-MM-dd \'at\' hh:mm a')}</div>
        <div className="text-sm">Count: {log.count}</div>
        <div className="text-sm italic">Note: {log.note}</div>
      </li>
    )) || <p>No logs for this period.</p>;
  };

  const progressPercentage = ((totalProgress / cumulativeGoal) * 100).toFixed(2);
  const difference = totalProgress - cumulativeGoal;

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-3xl font-bold mb-4">{habit.title}</h2>
      <p className="text-lg mb-2">Begin Date: {formattedBeginDateTime}</p>
      <p className="text-lg mb-2">Goal: {habit.goal}</p>
      <p className="text-lg mb-4">Frequency: {habit.frequency}</p>
      <p className="text-lg">Expected Progress Towards Goal: {cumulativeGoal}</p>
      <p className="text-lg">Current Total Progress: {totalProgress}</p>

      <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 my-2">
        <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${progressPercentage}%` }}>
          {progressPercentage}%
        </div>
      </div>

      <p className="text-lg">Difference: {difference < 0 ? difference : '+' + difference}</p>

      <div className="mb-4">
        <DatePicker selected={selectedDate} onChange={(date: Date) => setSelectedDate(date)} />
      </div>

      <div className='bg-primary/70 text-primary-content p-2 rounded-xl'>
        <h3 className="text-xl font-semibold mb-2">Logs for Selected Period:</h3>
        <ul>{renderLogsForSelectedDate()}</ul>
      </div>


  <div className='bg-secondary/70 text-secondary-content p-2 rounded-xl my-4'>
    <h3 className="text-xl font-semibold mb-2">Trending Data:</h3>
    <div className='flex flex-wrap flex-row gap-4'>
      {periods.map((period, index) => (
        <div key={index} className="card w-fit bg-base-100 shadow-xl mb-2 p-4">
          <div className="card-body">
            <h4 className="card-title">Period: {period.period}</h4>
            <p>Total Counts: {period.logs.reduce((acc: number, curr: any) => acc + curr.count, 0)}</p>
          </div>
        </div>
      ))}
    </div>
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
