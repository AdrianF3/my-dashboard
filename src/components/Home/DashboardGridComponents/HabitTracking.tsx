import React, { useState, useEffect } from "react";
import { UserProfile } from '../../../types/UserProfile.types';
import { Habit } from '../../../types/Habit.types';
import HabitCard from "../HabitTracking/HabitCard";
import AddHabitForm from "../HabitTracking/AddHabitForm";
import HabitTrackingForm from "../HabitTracking/HabitTrackingForm";
import HabitDetails from "../HabitTracking/HabitDetails";

// Modular Firebase v9+ imports
import { db } from "../../../firebaseConfig";
import { collection, doc, query, onSnapshot } from "firebase/firestore";
import EditHabitTrackingForm from "../HabitTracking/EditHabitTrackingForm";

type ViewMode = 'ADD_HABIT' | 'TRACK_HABIT' | 'HABIT_DETAILS' | 'EDIT_HABIT_LOG';

const HabitTracking: React.FC<{ profile: UserProfile | null; }> = ({ profile }) => {
    const [currentView, setCurrentView] = useState<ViewMode>('ADD_HABIT');
    const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
    const [ habitLogIDToEdit, setHabitLogIDToEdit ] = useState<string | null>(null);
    const [habits, setHabits] = useState<Habit[]>([]);

    useEffect(() => {
        if (!profile) return;

        const userProfileRef = doc(db, "userProfile", profile.uid);
        const q = query(collection(userProfileRef, "userHabits"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const updatedHabits: Habit[] = querySnapshot.docs.map(doc => docToHabit(doc));
            setHabits(updatedHabits);
        });

        return () => unsubscribe();
    }, [profile]);

    useEffect(() => {
        if (selectedHabit) {
            const updatedSelectedHabit = habits.find(habit => habit.id === selectedHabit.id);
            setSelectedHabit(updatedSelectedHabit || null);
        }
    }, [habits, selectedHabit]);

    const handleViewChange = (view: ViewMode, habit: Habit | null) => {
        setCurrentView(view);
        setSelectedHabit(habit);
    };

    const handleEditLog = (view: ViewMode, habit: Habit | null, logID: string | null) => {
        setCurrentView(view);
        setSelectedHabit(habit);
        setHabitLogIDToEdit(logID);
    }    

    const handleViewDetails = () => {
        setCurrentView('HABIT_DETAILS');
    }


    const viewReset = () => {
        setCurrentView('ADD_HABIT');
        setSelectedHabit(null);
    }

    return (
        <div className="flex flex-col gap-4 justify-around rounded border-2 border-accent self-center bg-primary text-primary-content p-4">
            <div>
                <h1 className="text-2xl font-bold">Habit Tracking</h1>
                <p className="text-md">Track your habits with goals and frequency to monitor your progress and maintain consistency. Set specific objectives for each habit to achieve your personal development goals.</p>
            </div>
            <div>
                <h2 className="text-xl font-bold">Your Habits</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
                    {habits.length > 0 && habits.map((habit) => (
                        <HabitCard
                            key={habit.id}
                            title={habit.title}
                            goal={habit.goal} 
                            frequency={habit.frequency}
                            id={habit.id}
                            logs={habit.logs}
                            beginDateTime={habit.beginDateTime}
                            handleViewChange={handleViewChange}
                        />
                    ))}
                </div>
            </div>
            {/* Main Habit Display */}
            <div>
                {currentView === 'ADD_HABIT' && <AddHabitForm profile={profile} />}
                {currentView === 'TRACK_HABIT' && selectedHabit && <HabitTrackingForm profile={profile} habit={selectedHabit} viewReset={viewReset} handleViewDetails={handleViewDetails} />}
                {currentView === 'HABIT_DETAILS' && selectedHabit && profile && <HabitDetails habit={selectedHabit} viewReset={viewReset} handleEditLog={handleEditLog} userID={profile.uid} handleViewDetails={handleViewDetails}  />}
                {currentView === 'EDIT_HABIT_LOG' && selectedHabit && habitLogIDToEdit && <EditHabitTrackingForm profile={profile} habit={selectedHabit} viewReset={viewReset} logIDToEdit={habitLogIDToEdit} handleViewDetails={handleViewDetails} />}
            </div>
        </div>
    );
};

export default HabitTracking;

// Helper function to convert a Firestore document to a Habit object
function docToHabit(doc: any) {
    const data = doc.data();
    return {
        id: doc.id,
        title: data.title,
        goal: data.goal,        
        frequency: data.frequency,
        logs: data.logs,
        beginDateTime: data.beginDateTime
    };
}
