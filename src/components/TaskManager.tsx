
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Task, Priority } from '@/types/Task';
import TaskList from './TaskList';
import { useNotifications } from '@/hooks/useNotifications';
import Header from './Header';
import TaskForm from './TaskForm';

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTaskId, setCurrentTaskId] = useState(1);
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'All'>('All');
  const { toast } = useToast();

  const updateTask = (id: number, updates: Partial<Task>) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => 
        task.id === id ? { ...task, ...updates } : task
      );
      saveTasksToStorage(updatedTasks, currentTaskId);
      return updatedTasks;
    });
  };

  const { requestNotificationPermission } = useNotifications(tasks, updateTask);

  useEffect(() => {
    console.log('🚀 Initializing Task Tango...');
    loadTasksFromStorage();
    requestNotificationPermission();
    console.log('✅ Task Tango initialized successfully!');
  }, [requestNotificationPermission]);

  const loadTasksFromStorage = () => {
    try {
      const storedData = localStorage.getItem('taskTango_data');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        // Migrate old tasks to include priority if needed
        const migratedTasks = (parsedData.tasks || []).map((task: any) => ({
          ...task,
          priority: task.priority || 'Medium',
          reminderTime: task.reminderTime || undefined,
          notificationSent: task.notificationSent || false,
        }));
        setTasks(migratedTasks);
        setCurrentTaskId(parsedData.currentTaskId || 1);
        console.log(`📂 Loaded ${migratedTasks.length} tasks from localStorage`);
      } else {
        console.log('📂 No existing tasks found in localStorage');
      }
    } catch (error) {
      console.error('❌ Error loading tasks from localStorage:', error);
      setTasks([]);
      setCurrentTaskId(1);
      toast({
        title: "Error!",
        description: "Failed to load saved tasks.",
        variant: "destructive",
      });
    }
  };

  const saveTasksToStorage = (newTasks: Task[], newCurrentTaskId: number) => {
    try {
      const tasksJson = JSON.stringify({
        tasks: newTasks,
        currentTaskId: newCurrentTaskId
      });
      localStorage.setItem('taskTango_data', tasksJson);
      console.log('💾 Tasks saved to localStorage');
    } catch (error) {
      console.error('❌ Error saving tasks to localStorage:', error);
      toast({
        title: "Error!",
        description: "Failed to save tasks. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleTaskCreate = (taskData: Omit<Task, 'id' | 'createdAt' | 'completed' | 'notificationSent'>) => {
    const newTask: Task = {
      id: currentTaskId,
      ...taskData,
      createdAt: new Date().toISOString(),
      completed: false,
      notificationSent: false
    };

    const newTasks = [...tasks, newTask];
    const newCurrentTaskId = currentTaskId + 1;
    
    setTasks(newTasks);
    setCurrentTaskId(newCurrentTaskId);
    saveTasksToStorage(newTasks, newCurrentTaskId);
  };

  const handleReorderTasks = (reorderedTasks: Task[]) => {
    setTasks(reorderedTasks);
    saveTasksToStorage(reorderedTasks, currentTaskId);
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="task-main">
        <div className="task-main-container">
          <TaskForm onTaskCreate={handleTaskCreate} />

          <TaskList 
            tasks={tasks} 
            onReorderTasks={handleReorderTasks}
            priorityFilter={priorityFilter}
            onPriorityFilterChange={setPriorityFilter}
          />
        </div>
      </main>
    </div>
  );
};

export default TaskManager;
