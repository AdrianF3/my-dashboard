import { HabitLog } from "./HabitLog.types";
import { Timestamp } from "firebase/firestore";

export interface Habit {
    id: string; // Unique identifier for each habit
    title: string;
    goal: number;    
    beginDateTime: Timestamp;
    frequency: string;
    logs: HabitLog[];  
  }