
export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  createdAt: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  reminderTime?: string;
  notificationSent?: boolean;
}

export type Priority = 'High' | 'Medium' | 'Low';
