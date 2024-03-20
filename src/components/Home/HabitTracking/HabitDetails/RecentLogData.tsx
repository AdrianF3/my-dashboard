import React from 'react';
import { format } from 'date-fns';
import { Habit } from '../../../../types/Habit.types';

interface RecentLogDataProps {
    periods: any[];
    selectedPeriodLogs: any[];
    habit: Habit;
    handlePeriodClick: (logs: any[]) => void;    
    handleEditLog: (view: string, habit: Habit | null, logID: string | null) => void;
    openDeleteModal: (logID: string) => void;
}

const RecentLogData: React.FC<RecentLogDataProps> = ({ periods, selectedPeriodLogs, habit, handlePeriodClick, handleEditLog, openDeleteModal }) => {
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
        <section className='bg-secondary p-4 m-4 rounded'>
            <div className='h-fit bg-secondary/70 text-secondary-content p-2 rounded-xl m-4'>
                <h3 className="text-xl font-semibold mb-2">Recent Data:</h3>
                <div className='flex flex-row w-full overflow-auto gap-4 bg-accent p-2 rounded'>
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
            <div className='bg-primary/70 text-primary-content p-2 rounded-xl m-4 overflow-auto' style={{ maxHeight: '50vh' }}>
                <h3 className="text-xl font-semibold mb-2">Logs for Selected Period</h3>
                <div className='flex flex-wrap gap-4 justify-center'>{renderSelectedPeriodLogs()}</div>
            </div>
        </section>
    );
};

export default RecentLogData;