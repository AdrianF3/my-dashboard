import React, { useState, useEffect } from 'react';
import { Habit } from '@/types/Habit.types';
import 'react-datepicker/dist/react-datepicker.css';
import { format, differenceInCalendarDays, startOfWeek, startOfMonth, set } from 'date-fns';
import { Timestamp } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { eachDayOfInterval, endOfDay } from 'date-fns';


interface LogCountsByDate {
  [dateKey: string]: number;
}

interface GraphDataItem {
  date: string;
  Daily: number; // Assuming 'Daily' is a number. Adjust the type if necessary.
  Cumulative: number;
  Expected: number;
  Difference: number;
}




const HabitDetails: React.FC<{ habit: Habit; viewReset: () => void; handleEditLog: (view: 'EDIT_HABIT_LOG', habit: Habit | null, logID: string | null) => void, userID: string, handleViewDetails: () => void }> = ({ habit, viewReset, handleEditLog, userID, handleViewDetails }) => {
  const [groupedLogs, setGroupedLogs] = useState<{ [key: string]: any[] }>({});
  const [graphData, setGraphData] = useState<GraphDataItem[]>([]);
  const [periods, setPeriods] = useState<any[]>([]);
  const [selectedPeriodLogs, setSelectedPeriodLogs] = useState<any[]>([]); // State to store logs of the selected period
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [logIdToDelete, setLogIdToDelete] = useState<string | null>(null);  
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // useEffect to resize window
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine the responsive width for the chart. Adjust the subtraction value based on your layout's padding/margin requirements.
  const chartWidth = Math.max(windowWidth - 100, 300); // Ensures the chart has a minimum width of 300px


  // Updated groupLogs function with bi-weekly logic
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
            case 'bi-weekly':
              const weekStart = startOfWeek(logDate);
              const biWeeklyStart = weekStart.getDate() <= 15 ? set(weekStart, { date: 1 }) : set(weekStart, { date: 15 });
              key = format(biWeeklyStart, 'yyyy-MM-dd');
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

      // Sort and set periods
      const sortedKeys = Object.keys(groups).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
      const periodsArray = sortedKeys.map(key => ({ period: key, logs: groups[key] }));
      setPeriods(periodsArray);

      // Select the most recent period logs by default
      if (periodsArray.length > 0) {
        setSelectedPeriodLogs(periodsArray[0].logs);
      }
    };

    groupLogs();
  }, [habit.logs, habit.frequency]);
    

  const totalProgress = habit.logs.reduce((acc, curr) => acc + curr.count, 0);

  const formattedBeginDateTime = habit.beginDateTime && habit.beginDateTime instanceof Timestamp
    ? format(habit.beginDateTime.toDate(), 'yyyy-MM-dd \'at\' hh:mm a')
    : 'Invalid date';



  const daysSinceBegin = habit.beginDateTime && habit.beginDateTime instanceof Timestamp
    ? differenceInCalendarDays(new Date(), habit.beginDateTime.toDate())
    : 0;
  const cumulativeGoal = habit.goal * ( daysSinceBegin + 1 );

  const progressPercentage = ((totalProgress / cumulativeGoal) * 100).toFixed(2);
  const difference = totalProgress - cumulativeGoal;

  // Delete Habit Function
  const deleteHabit = async () => {
    const habitRef = doc(db, "userProfile", userID, "userHabits", habit.id); // Adjust path as necessary

    try {
      await deleteDoc(habitRef);
      console.log("Habit deleted successfully");
      // Optionally handle any additional logic after deleting the habit
    } catch (error) {
      console.error("Error deleting habit:", error);
    }
    setConfirmDelete(false);
    viewReset();
  };

  // Delete Log Function
  const deleteLog = async (logId: string | null) => {    
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

  // Assuming habit.beginDateTime is the starting point and habit.logs contain the logs
const startDate = habit.beginDateTime.toDate();
const endDate = new Date(); // or use the date of the last log entry if more appropriate
const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

// Prepare an object mapping dates to cumulative log counts for easier access
const logCountsByDate = habit.logs.reduce((acc: LogCountsByDate, log) => {
  const dateKey = format(log.dateTime.toDate(), 'yyyy-MM-dd');
  acc[dateKey] = (acc[dateKey] || 0) + log.count;
  return acc;
}, {} as LogCountsByDate);

const generateGraphData = () => {
  // Calculate the start and end date for the graph based on the selected period
  let startDate, endDate;
  if (selectedPeriodLogs.length > 0) {
    startDate = selectedPeriodLogs[0].dateTime.toDate(); // Assuming the first log of the period is the start
    endDate = selectedPeriodLogs[selectedPeriodLogs.length - 1].dateTime.toDate(); // Assuming the last log is the end
  } else {
    return []; // Return an empty array if no logs are selected
  }

  const periodLogs = selectedPeriodLogs.reduce((acc, log) => {
    const dateKey = format(log.dateTime.toDate(), 'yyyy-MM-dd');
    acc[dateKey] = (acc[dateKey] || 0) + log.count;
    return acc;
  }, {});

  const dateRange = eachDayOfInterval({ start: startDate, end: endDate });
  let cumulativeActual = 0;
  return dateRange.map(date => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const dailyActual = periodLogs[dateKey] || 0;
    cumulativeActual += dailyActual;

    // Calculate expected progress based on the habit's frequency
    const daysSinceBegin = differenceInCalendarDays(date, habit.beginDateTime.toDate()) + 1;
    let expectedProgress;
    switch (habit.frequency) {
      case 'weekly':
        expectedProgress = habit.goal * Math.ceil(daysSinceBegin / 7);
        break;
      case 'bi-weekly':
        expectedProgress = habit.goal * Math.ceil(daysSinceBegin / 14);
        break;
      case 'monthly':
        expectedProgress = habit.goal * Math.ceil(daysSinceBegin / 30);
        break;
      case 'daily':
      default:
        expectedProgress = habit.goal * daysSinceBegin;
    }

    const dailyDifference = cumulativeActual - expectedProgress;

    return {
      date: dateKey,
      Daily: dailyActual,
      Cumulative: cumulativeActual,
      Expected: expectedProgress,
      Difference: dailyDifference,
    };
  });
};


useEffect(() => {
  setGraphData(generateGraphData());
}, [selectedPeriodLogs, habit.frequency, habit.goal, habit.beginDateTime]);



  

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-3xl font-bold mb-4">{habit.title}</h2>
      <p className="text-lg mb-2">Started: {formattedBeginDateTime}</p>
      <p className="text-lg mb-2">Frequency: {habit.frequency}</p>      
      <p className="text-lg mb-4">Goal: {habit.goal}</p>
      <div className="w-8/12 bg-gray-200 rounded-full dark:bg-gray-700 my-2 mx-auto">
        <div className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${progressPercentage}%` }}>
          {progressPercentage}%
        </div>
      </div>
      <div className='flex flex-col justify-center items-center my-4'>
        <p className="text-lg uppercase">Overall Progress</p>
        <p className="">{totalProgress} of {cumulativeGoal} | ({difference})</p>
      </div>      

      <div className='flex flex-row justify-end'>      
        { !confirmDelete ? <button className="btn btn-error" onClick={() => setConfirmDelete(true)}>Delete Habit?</button>  : 
        <button className="btn btn-error" onClick={() => deleteHabit()}>Confirm Deletion</button> }
      </div>
      
      


      {/* Recent Data Section */}
      <div className='h-fit bg-secondary/70 text-secondary-content p-2 rounded-xl my-4'>
        <h3 className="text-xl font-semibold mb-2">Recent Data:</h3>
        <div className='flex flex-row w-full overflow-auto gap-4'>
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

      {/* Display Logs for selected Period */}
      <div className='bg-primary/70 text-primary-content p-2 rounded-xl my-4 overflow-auto' style={{ maxHeight: '50vh' }}>
        <h3 className="text-xl font-semibold mb-2">Logs for Selected Period</h3>
        <div className='flex flex-wrap gap-4 justify-center'>{renderSelectedPeriodLogs()}</div>
      </div>


      {/* Graph showing expected vs. actual progress */}
      <div className="my-4">
        <h3 className="text-xl font-semibold mb-2">Progress Graph</h3>
        <div style={{ width: '100%', maxWidth: '100%' }}>
        <LineChart
          width={chartWidth} // Adjust margin as needed
          height={300}
          data={graphData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}          
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Expected" stroke="#8884d8" activeDot={{ r: 8 }} />          
          <Line type="monotone" dataKey="Cumulative" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Daily" stroke="#ffc658" />
          <Line type="monotone" dataKey="Difference" stroke="#ff7300" />


        </LineChart>
        </div>
      </div>

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
