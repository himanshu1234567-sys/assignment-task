
import { useEffect, useCallback } from 'react';
import { Task } from '@/types/Task';

export const useNotifications = (tasks: Task[], updateTask: (id: number, updates: Partial<Task>) => void) => {
  const requestNotificationPermission = useCallback(async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission();
    }
  }, []);

  const showNotification = useCallback((task: Task) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(`Task Reminder: ${task.title}`, {
        body: task.description || 'Don\'t forget about this task!',
        icon: '/favicon.ico',
        badge: '/favicon.ico',
      });
    }
  }, []);

  const checkReminders = useCallback(() => {
    const now = new Date();
    tasks.forEach(task => {
      if (task.reminderTime && !task.notificationSent && !task.completed) {
        const reminderTime = new Date(task.reminderTime);
        if (reminderTime <= now) {
          showNotification(task);
          updateTask(task.id, { notificationSent: true });
        }
      }
    });
  }, [tasks, showNotification, updateTask]);

  useEffect(() => {
    requestNotificationPermission();
  }, [requestNotificationPermission]);

  useEffect(() => {
    const interval = setInterval(checkReminders, 60000); // Check every minute
    checkReminders(); // Check immediately
    return () => clearInterval(interval);
  }, [checkReminders]);

  return { requestNotificationPermission };
};
