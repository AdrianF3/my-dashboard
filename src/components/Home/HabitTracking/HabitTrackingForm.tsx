import React, { useState } from "react";
import { UserProfile } from "@/types/UserProfile.types";
import { Habit } from "@/types/Habit.types";
import { db } from "../../../firebaseConfig";
import { doc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';

const HabitTrackingForm: React.FC<{ profile: UserProfile | null; habit: Habit; viewReset: () => void; handleViewDetails: () => void }> = ({ profile, habit, viewReset, handleViewDetails }) => {
    const [progress, setProgress] = useState('');
    const [trackingDate, setTrackingDate] = useState(() => new Date().toISOString().split('T')[0]); // Default to today's date in YYYY-MM-DD format
    const [trackingTime, setTrackingTime] = useState(() => new Date().toTimeString().split(' ')[0]); // Default to the current time

    const trackHabitProgress = async () => {
        if (!profile || !progress.trim()) return; // Ensure profile exists and progress is not empty

        // Combine date and time inputs to create a Date object
        const combinedDateTime = new Date(`${trackingDate}T${trackingTime}`);

        const logEntry = {
            id: uuidv4(), // Generate a unique ID for the log entry
            dateTime: Timestamp.fromDate(combinedDateTime), // Create a Firestore Timestamp from the Date object
            count: parseInt(progress, 10), // Convert progress to integer   
            note: ''         
        };

        try {
            // Reference to the specific habit document
            const habitRef = doc(db, "userProfile", profile.uid, "userHabits", habit.id);

            // Update the habit document by appending the new log entry to the logs array
            await updateDoc(habitRef, {
                logs: arrayUnion(logEntry)
            });

            console.log("Progress tracked successfully");

            // Reset fields after tracking
            setProgress('');
            setTrackingDate(new Date().toISOString().split('T')[0]);
            setTrackingTime(new Date().toTimeString().split(' ')[0]);
            handleViewDetails(); // Switch back to the habit details view
        } catch (error) {
            console.error("Error tracking progress:", error);
        }
    };

    return (
        <div className="bg-accent text-accent-content p-6">
            <h2 className="text-xl font-bold">Track Habit Progress</h2>
            <p className="text-sm mb-4">Habit: {habit.title}</p>
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
                <button onClick={trackHabitProgress} className="btn btn-primary mt-4">Track Progress</button>
                <button onClick={viewReset} className="btn btn-secondary mt-4">Back</button>
            </div>
        </div>
    );
};

export default HabitTrackingForm;
