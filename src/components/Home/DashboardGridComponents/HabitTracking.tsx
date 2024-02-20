import React, { useState } from "react";
import { UserProfile } from '../../../types/UserProfile.types';
import { Habit } from '../../../types/Habit.types';
import HabitCard from "../HabitTracking/HabitCard";


const HabitTracking: React.FC<{ profile: UserProfile | null; }> = ({ profile }) => {
    const [habitTitle, setHabitTitle] = useState('');
    const [goalNumber, setGoalNumber] = useState('');
    const [frequency, setFrequency] = useState('daily');
    const [habits, setHabits] = useState<Habit[]>([
        {
          id: 1,
          name: 'Do 55 pushups',
          goal: 55,
          currentCount: 20, // Example current progress
          frequency: 'daily',
        },
        {
          id: 2,
          name: 'Read for 30 minutes',
          goal: 30,
          currentCount: 15, // Example current progress
          frequency: 'daily',
        },
        {
          id: 3,
          name: 'Meditate',
          goal: 10,
          currentCount: 5, // Example current progress
          frequency: 'daily',
        },
      ]);

    const addHabit = async () => {
        if (!habitTitle.trim() || !goalNumber.trim()) return; // Prevent adding habits with empty title or goal

        // Add your logic here to send the new habit to your backend
        // For demonstration, we're just logging the new habit
        console.log({
            userId: profile?.userId, // Assuming your profile object has a userId field
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
        <div className="flex flex-col gap-4 justify-around rounded border-2 border-accent self-center bg-primary text-primary-content p-4">
            {/* Intro & Description */}
            <div>
                <h1 className="text-2xl font-bold">Habit Tracking</h1>
                <p className="text-md">
                    Track your habits with goals and frequency to monitor your progress and maintain consistency. Set specific objectives for each habit to achieve your personal development goals.
                </p>

            </div>
            {/* Form */}
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
            {/* Habits List */}
            <div>
                <h2 className="text-xl font-bold">Your Habits</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">                    
                    {habits.map((habit, index) => (
                        <>
                        <HabitCard 
                        name={habit.name}
                        goal={habit.goal}
                        currentCount={habit.currentCount}
                        frequency={habit.frequency}
                        />
                        </>
                    ))}
                    </div>
                        
            </div>

            
        </div>

    );
};

export default HabitTracking;
