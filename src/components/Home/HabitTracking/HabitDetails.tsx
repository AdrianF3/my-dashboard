import React, { useState, useEffect } from 'react';
import { Habit } from '@/types/Habit.types';
import 'react-datepicker/dist/react-datepicker.css';
import { format, differenceInCalendarDays, startOfWeek, startOfMonth } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';


const HabitDetails: React.FC<{ habit: Habit; viewReset: () => void; handleEditLog: (view: 'EDIT_HABIT_LOG', habit: Habit | null, logID: string | null) => void, userID: string, handleViewDetails: () => void }> = ({ habit, viewReset, handleEditLog, userID, handleViewDetails }) => {
  const [groupedLogs, setGroupedLogs] = useState<{ [key: string]: any[] }>({});
  const [periods, setPeriods] = useState<any[]>([]);
  const [selectedPeriodLogs, setSelectedPeriodLogs] = useState<any[]>([]); // State to store logs of the selected period
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [logIdToDelete, setLogIdToDelete] = useState<string | null>(null);

  useEffect(() => {
    const groupLogs = () => {
      const groups: { [key: string]: any[] } = {};
      habit.logs.forEach(log => {
        if (log.dateTime instanceof Timestamp) {
          const logDate = log.dateTime.toDate();
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
  }, [habit.logs, habit.logs.length, habit.frequency]);

  const totalProgress = habit.logs.reduce((acc, curr) => acc + curr.count, 0);

  const formattedBeginDateTime = habit.beginDateTime && habit.beginDateTime instanceof Timestamp
    ? format(habit.beginDateTime.toDate(), 'yyyy-MM-dd \'at\' hh:mm a')
    : 'Invalid date';

  const daysSinceBegin = habit.beginDateTime && habit.beginDateTime instanceof Timestamp
    ? differenceInCalendarDays(new Date(), habit.beginDateTime.toDate())
    : 0;
  const cumulativeGoal = habit.goal * daysSinceBegin;

  const progressPercentage = ((totalProgress / cumulativeGoal) * 100).toFixed(2);
  const difference = totalProgress - cumulativeGoal;

  // Delete Log Function
  const deleteLog = async (logId: string | null) => {
    console.log('logId', logId)
    if (!logId) return;

    const updatedLogs = habit.logs.filter(log => log.id !== logId);
    const habitRef = doc(db, "userProfile", userID, "userHabits", habit.id); // Adjust path as necessary

    try {
      await updateDoc(habitRef, {
        logs: updatedLogs
      });
      console.log("Log deleted successfully");
      // Close modal
      setIsDeleteModalOpen(false);
      // Optionally refresh the logs displayed
    } catch (error) {
      console.error("Error deleting log:", error);
    }
    handleViewDetails();
  };

  // Handler to open delete confirmation modal
  const openDeleteModal = (logId: string) => {
    setLogIdToDelete(logId);
    setIsDeleteModalOpen(true);
  };

  // Handler for when a period card is clicked
  const handlePeriodClick = (logs: any[]) => {
    const sortedLogs = logs.sort((a, b) => b.dateTime.toDate().getTime() - a.dateTime.toDate().getTime());
    setSelectedPeriodLogs(sortedLogs); // Update the state with the sorted logs
  };

  // Render logs for the selected period
  const renderSelectedPeriodLogs = () => (
    selectedPeriodLogs.length > 0 ? selectedPeriodLogs.map((log, index) => (
      <div key={index} className="flex flex-col border-2 border-accent rounded-xl w-fit h-fit mb-2 p-2">
        <div className="text-sm font-medium">Date: {format(log.dateTime.toDate(), 'yyyy-MM-dd \'at\' hh:mm a')}</div>
        <div className="text-sm">Count: {log.count}</div>
        <div className="text-sm italic">Note: {log.note}</div>
        {/* Buttons */}
        <div className="flex justify-end mt-2">
          <button 
            className="btn btn-xs btn-secondary"
            onClick={() => handleEditLog('EDIT_HABIT_LOG', habit, log.id)}
          >
            Edit
          </button>
          <button 
            className="btn btn-xs btn-error ml-2"
            onClick={() => openDeleteModal(log.id)}
          >
            Delete
          </button>
        </div>
      </div>
    )) : <p>No logs for this period.</p>
  );

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
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
      </div>

      <div className='bg-primary/70 text-primary-content p-2 rounded-xl'>
        <h3 className="text-xl font-semibold mb-2">Logs for Selected Period:</h3>
        <div className='flex flex-wrap gap-4'>{renderSelectedPeriodLogs()}</div>
      </div>

      <div className='bg-secondary/70 text-secondary-content p-2 rounded-xl my-4'>
        <h3 className="text-xl font-semibold mb-2">Trending Data:</h3>
        <div className='flex flex-wrap flex-row gap-4'>
          {periods.map((period, index) => (
            <div key={index} className="card w-fit bg-base-100 shadow-xl mb-2 p-4 cursor-pointer" onClick={() => handlePeriodClick(period.logs)}>
              <div className="card-body">
                <h4 className="card-title">Period: {period.period}</h4>
                <p>Total Counts: {period.logs.reduce((acc: number, curr: any) => acc + curr.count, 0)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>      
      {/* The rest of your component */}
      {isDeleteModalOpen && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Deletion</h3>
            <p className="py-4">Are you sure you want to delete this log?</p>
            <div className="modal-action">
              <button className="btn" onClick={() => deleteLog(logIdToDelete)}>Yes, Delete</button>
              <button className="btn" onClick={() => setIsDeleteModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HabitDetails;
