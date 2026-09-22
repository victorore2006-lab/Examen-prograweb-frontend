export interface TaskItem {
  id: string;
  title: string;
  priorityLevel: number;
  notes: string;
  userId: string;
  createdAt: string;
}

export interface NewTask {
  title: string;
  priorityLevel: number;
  notes?: string;
}
