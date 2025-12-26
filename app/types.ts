export type Task = {
  id: string;
  title: string;
  description?: string | null;
  dueDate?: string | null; // ✅ serialized
  completed: boolean;
};
