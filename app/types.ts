export type Task = {
  id: string;
  title: string;
  description?: string | null;
  dueDate?: string | null; // ✅ serialized
  completed: boolean;
};

export enum Frequency {
  DAILY = "DAILY",
  WEEKLY = "WEEKLY",
}
export type Habit = {
  id:string;
  title:string;
  frequency:Frequency | null;
  date?:string[]
}