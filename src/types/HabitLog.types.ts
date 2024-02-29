import { Timestamp } from "firebase/firestore";

export interface HabitLog {
    dateTime: Timestamp;
    count: number;
    note: string;
    id: string;
  }