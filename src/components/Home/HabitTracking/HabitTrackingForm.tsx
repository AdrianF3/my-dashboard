import React, { useState } from "react";
import { UserProfile } from "@/types/UserProfile.types";
import { Habit } from "@/types/Habit.types"; // Assuming you have a Habit type

interface HabitTrackingFormProps {
  profile: UserProfile | null;
  habit: Habit; // Assuming habit is passed to track progress
  viewReset: () => void;
}

const HabitTrackingForm: React.FC<HabitTrackingFormProps> = ({ profile, habit, viewReset }) => {
    const [progress, setProgress] = useState('');
    const [trackingDate, setTrackingDate] = useState(() => new Date().toISOString().split('T')[0]); // Default to today's date in YYYY-MM-DD format

    const trackHabitProgress = async () => {
        if (!progress.trim()) return; // Prevent tracking with empty progress

        // Logic to send the progress update to your backend
        console.log({
            userId: profile?.id,
            habitId: habit.id,
            progress,
            trackingDate,
        });

        // Reset progress field after tracking
        setProgress('');
    };

    return (
        <div className="bg-secondary text-secondary-content p-6">
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
            <div className="flex flex-row gap-4 justify-evenly">
                <button onClick={trackHabitProgress} className="btn btn-primary mt-4">Track Progress</button>
                {/* Reset button can be repurposed or removed based on the specific needs of tracking functionality */}
                <button onClick={viewReset} className="btn btn-secondary mt-4">Back</button>
            </div>
        </div>
    );
};

export default HabitTrackingForm;
