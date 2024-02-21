import { HabitLog } from "./HabitLog.types";

export interface Habit {
    id: number; // Unique identifier for each habit
    title: string;
    goal: number;
    currentCount: number;
    frequency: string;
    logs: HabitLog[];  
  }