import React, { useState } from "react";
import { UserProfile } from '../../../types/UserProfile.types';
import { Habit } from '../../../types/Habit.types';
import HabitCard from "../HabitTracking/HabitCard";
import AddHabitForm from "../HabitTracking/AddHabitForm";
import HabitTrackingForm from "../HabitTracking/HabitTrackingForm";
import HabitDetails from "../HabitTracking/HabitDetails";

type ViewMode = 'ADD_HABIT' | 'TRACK_HABIT' | 'HABIT_DETAILS';

const HabitTracking: React.FC<{ profile: UserProfile | null; }> = ({ profile }) => {    
    const [currentView, setCurrentView] = useState<ViewMode>('ADD_HABIT');
    const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
    const [habits, setHabits] = useState<Habit[]>([
        {
          id: 1,          
          title: 'Do 55 pushups',
          goal: 55,
          currentCount: 20, // Example current progress
          frequency: 'daily',
          logs: [],
        },
        {
          id: 2,
          title: 'Read for 30 minutes',
          goal: 30,
          currentCount: 15, // Example current progress
          frequency: 'daily',
          logs: [],
        },
        {
          id: 3,
          title: 'Meditate',
          goal: 10,
          currentCount: 5, // Example current progress
          frequency: 'daily',
          logs: [],
        },
      ]);

    const handleViewChange = (view: ViewMode, habit: Habit | null) => {
        setCurrentView(view);
        setSelectedHabit(habit);
    };

    const viewReset = () => {
        setCurrentView('ADD_HABIT');
        setSelectedHabit(null);
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
            { currentView === 'ADD_HABIT' && <AddHabitForm profile={profile} /> }
            { currentView === 'TRACK_HABIT' && selectedHabit && <HabitTrackingForm profile={profile} habit={selectedHabit} viewReset={viewReset} /> }
            { currentView === 'HABIT_DETAILS' && selectedHabit && <HabitDetails habit={selectedHabit} viewReset={viewReset} /> }
            {/* Habits List */}
            <div>
                <h2 className="text-xl font-bold">Your Habits</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">                    
                    {habits.map((habit, index) => (
                        <>
                        <HabitCard 
                        title={habit.title}
                        goal={habit.goal}
                        currentCount={habit.currentCount}
                        frequency={habit.frequency}
                        id={habit.id}
                        logs={habit.logs}
                        handleViewChange={handleViewChange}
                        />
                        </>
                    ))}
                    </div>
                        
            </div>

            
        </div>

    );
};

export default HabitTracking;
