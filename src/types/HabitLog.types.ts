import { Timestamp } from "firebase/firestore";

export interface HabitLog {
    dateTime: Timestamp | null;
    count: number;
    note: string;
    id: string;
  }