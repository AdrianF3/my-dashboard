import { UserProfile } from "@/types/UserProfile.types";
import React, { useState } from "react";

interface AddHabitFormProps {
  profile: UserProfile | null;
}

const AddHabitForm: React.FC<AddHabitFormProps> = ({ profile }) => {
    const [habitTitle, setHabitTitle] = useState('');
    const [goalNumber, setGoalNumber] = useState('');
    const [frequency, setFrequency] = useState('daily');

    const addHabit = async () => {
        if (!habitTitle.trim() || !goalNumber.trim()) return; // Prevent adding habits with empty title or goal

        // Add your logic here to send the new habit to your backend
        // For demonstration, we're just logging the new habit
        console.log({
            userId: profile?.id, // Assuming your profile object has a userId field
            habitTitle,
            goalNumber,
            frequency,
        });

        // Reset form fields after adding
        setHabitTitle('');
        setGoalNumber('');
        setFrequency('daily');
    };

    const resetForm = () => {
        setHabitTitle('');
        setGoalNumber('');
        setFrequency('daily');
    }   
  

  return (
    <div className="bg-secondary text-secondary-content p-6">
                <h2 className="text-xl font-bold">Add New Habit</h2>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Habit Title</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter habit title"
                        className="input input-bordered"
                        value={habitTitle}
                        onChange={(e) => setHabitTitle(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Goal Number</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Enter goal number"
                        className="input input-bordered"
                        value={goalNumber}
                        onChange={(e) => setGoalNumber(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Frequency</span>
                    </label>
                    <select
                        className="select select-bordered"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                    >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="bi-weekly">Bi-Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>
                <div className="flex flex-row gap-4 justify-evenly">
                    <button onClick={addHabit} className="btn btn-primary mt-4">Add Habit</button>
                    <button onClick={resetForm} className="btn btn-error mt-4">Reset</button>
                </div>
            </div>
  );
};

export default AddHabitForm;
