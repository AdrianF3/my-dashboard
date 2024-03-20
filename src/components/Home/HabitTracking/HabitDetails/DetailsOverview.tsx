import React, { useState } from 'react';
import { Habit } from '../../../../types/Habit.types';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../../firebaseConfig';



interface Props {
    habit: Habit;
    formattedBeginDateTime: string;
    progressPercentage: number;
    totalProgress: number;
    cumulativeGoal: number;
    difference: number;
    viewReset: () => void;
    userID: string;
}

const DetailsOverview: React.FC<Props> = ({
    habit,
    formattedBeginDateTime,
    progressPercentage,
    totalProgress,
    cumulativeGoal,
    difference,
    viewReset,
    userID,
}) => {
    const [confirmDelete, setConfirmDelete] = useState(false);

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

    return (
        <div>
            <h2 className="text-3xl font-bold mb-4">{habit.title}</h2>
            <p className="text-lg mb-2">Started: {formattedBeginDateTime}</p>
            <p className="text-lg mb-2">Frequency: {habit.frequency}</p>
            <p className="text-lg mb-4">Goal: {habit.goal}</p>
            <div className="w-8/12 bg-gray-200 rounded-full dark:bg-gray-700 my-2 mx-auto">
                <div
                    className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                >
                    {progressPercentage}%
                </div>
            </div>
            <div className="flex flex-col justify-center items-center my-4">
                <p className="text-lg uppercase">Overall Progress</p>
                <p className="">
                    {totalProgress} of {cumulativeGoal} | ({difference})
                </p>
            </div>
            <div className="flex flex-row justify-end">
                {!confirmDelete ? (
                    <button className="btn btn-error" onClick={() => setConfirmDelete(true)}>
                        Delete Habit?
                    </button>
                ) : (
                    <button className="btn btn-error" onClick={() => deleteHabit()}>
                        Confirm Deletion
                    </button>
                )}
            </div>
        </div>
    );
};

export default DetailsOverview;