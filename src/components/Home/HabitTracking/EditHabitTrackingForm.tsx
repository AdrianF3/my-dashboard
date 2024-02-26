import React, { useState, useEffect } from "react";
import { UserProfile } from "@/types/UserProfile.types";
import { Habit } from "@/types/Habit.types";
import { db } from "../../../firebaseConfig";
import { doc, updateDoc, arrayUnion, arrayRemove, Timestamp } from "firebase/firestore";
import { format } from 'date-fns';

const EditHabitTrackingForm: React.FC<{ profile: UserProfile | null; habit: Habit; viewReset: () => void; logIDToEdit: string; handleViewDetails: () => void }> = ({ profile, habit, viewReset, logIDToEdit, handleViewDetails }) => {
    const [progress, setProgress] = useState('');
    const [trackingDate, setTrackingDate] = useState('');
    const [trackingTime, setTrackingTime] = useState('');
    const [logEntryToEdit, setLogEntryToEdit] = useState<any | null>(null);

    useEffect(() => {
        // Find the log entry by ID
        const logEntry = habit.logs.find(log => log.id === logIDToEdit);
        if (logEntry) {
            setLogEntryToEdit(logEntry);
            setProgress(logEntry.count.toString());
            if (logEntry.dateTime) {
                const date = logEntry.dateTime.toDate();
                setTrackingDate(format(date, 'yyyy-MM-dd'));
                setTrackingTime(format(date, 'HH:mm'));
            }
        }
    }, [habit.logs, logIDToEdit]);

    const trackHabitProgress = async () => {
        if (!profile || !logEntryToEdit || !progress.trim()) return;

        const combinedDateTime = new Date(`${trackingDate}T${trackingTime}`);
        const updatedLogEntry = {
            ...logEntryToEdit,
            dateTime: Timestamp.fromDate(combinedDateTime),
            count: parseInt(progress, 10),
        };
        console.log('updatedLogEntry', updatedLogEntry)
        try {
            const habitRef = doc(db, "userProfile", profile.uid, "userHabits", habit.id);

            // First, remove the existing log entry
            await updateDoc(habitRef, {
                logs: arrayRemove(logEntryToEdit)
            });

            // Then, add the updated log entry
            await updateDoc(habitRef, {
                logs: arrayUnion(updatedLogEntry)
            });

            console.log("Log updated successfully");
            handleViewDetails();
        } catch (error) {
            console.error("Error updating log:", error);
        }
    };

    if (!logEntryToEdit) return <p>Loading log details...</p>;

    return (
        <div className="bg-accent text-accent-content p-6">
            <h2 className="text-xl font-bold">Edit Habit Progress Log</h2>
            <p className="text-sm mb-4">Habit: {habit.title}</p>
            {/* Form fields remain largely unchanged, only button text is updated */}
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Progress</span>
                </label>
                <input
                    type="number"
                    placeholder="Enter progress"
                    className="input input-bordered"
                    value={progress}
                    onChange={(e) => setProgress(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Date</span>
                </label>
                <input
                    type="date"
                    className="input input-bordered"
                    value={trackingDate}
                    onChange={(e) => setTrackingDate(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Time</span>
                </label>
                <input
                    type="time"
                    className="input input-bordered"
                    value={trackingTime}
                    onChange={(e) => setTrackingTime(e.target.value)}
                />
            </div>
            <div className="flex flex-row gap-4 justify-evenly">
                <button onClick={trackHabitProgress} className="btn btn-primary mt-4">Update Log</button>
                <button onClick={viewReset} className="btn btn-secondary mt-4">Back</button>
            </div>
        </div>
    );
};

export default EditHabitTrackingForm;
