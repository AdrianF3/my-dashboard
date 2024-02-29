import { UserProfile } from "@/types/UserProfile.types";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { db } from "../../../firebaseConfig"; // Import your Firebase config
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore"; // Firestore methods for adding a new document

interface AddHabitFormProps {
  profile: UserProfile | null;
}

const AddHabitForm: React.FC<AddHabitFormProps> = ({ profile }) => {
    const [habitTitle, setHabitTitle] = useState('');
    const [goalNumber, setGoalNumber] = useState('');
    const [frequency, setFrequency] = useState('daily');

    const addHabit = async () => {
        if (!profile || !habitTitle.trim() || !goalNumber.trim()) return; // Additional check for profile existence
    
        const habitData = {
            id: uuidv4(),
            title: habitTitle.trim(),
            goal: parseInt(goalNumber), // Assuming goalNumber should be an integer
            currentCount: 0, // New habit, so current count is 0
            frequency,
            logs: [], // No logs for a new habit
            beginDateTime: serverTimestamp(), // Current date and time
        };
    
        try {
          // Reference to the userProfile document
          const userProfileRef = doc(db, "userProfile", profile.uid);
          // Reference to the new habit document in the userHabits sub-collection
          const newHabitRef = doc(collection(userProfileRef, "userHabits"));
    
          await setDoc(newHabitRef, habitData);
          console.log("Habit added successfully:", newHabitRef.id);
        } catch (error) {
          console.error("Error adding habit:", error);
        }
    
        resetForm(); // Reset form fields after adding
      };
    
      const resetForm = () => {
        setHabitTitle('');
        setGoalNumber('');
        setFrequency('daily');
      };
  

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
