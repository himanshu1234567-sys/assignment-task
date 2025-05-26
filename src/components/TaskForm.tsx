
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Task, Priority } from '@/types/Task';

interface TaskFormProps {
  onTaskCreate: (task: Omit<Task, 'id' | 'createdAt' | 'completed' | 'notificationSent'>) => void;
}

const TaskForm = ({ onTaskCreate }: TaskFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [reminderTime, setReminderTime] = useState('');
  const [titleError, setTitleError] = useState('');
  const [dateError, setDateError] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    setMinDate();
  }, []);

  const setMinDate = () => {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('taskDueDate') as HTMLInputElement;
    if (dateInput) {
      dateInput.setAttribute('min', today);
    }
  };

  const validateForm = (titleValue: string, dueDateValue: string) => {
    let isValid = true;
    setTitleError('');
    setDateError('');

    if (!titleValue) {
      setTitleError('Task title is required');
      isValid = false;
    } else if (titleValue.length < 2) {
      setTitleError('Task title must be at least 2 characters');
      isValid = false;
    } else if (titleValue.length > 100) {
      setTitleError('Task title must be less than 100 characters');
      isValid = false;
    }

    if (!dueDateValue) {
      setDateError('Due date is required');
      isValid = false;
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(dueDateValue);
      
      if (selectedDate < today) {
        setDateError('Due date cannot be in the past');
        isValid = false;
      }
    }

    return isValid;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('📝 Form submitted');

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!validateForm(trimmedTitle, dueDate)) {
      console.log('❌ Form validation failed');
      return;
    }

    const newTask = {
      title: trimmedTitle,
      description: trimmedDescription,
      dueDate,
      priority,
      reminderTime: reminderTime || undefined,
    };

    console.log('✨ Creating new task:', newTask);

    onTaskCreate(newTask);
    
    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('Medium');
    setReminderTime('');
    setTitleError('');
    setDateError('');
    
    toast({
      title: "Success!",
      description: `Task "${trimmedTitle}" has been added successfully.`,
    });
    
    console.log('✅ Task created successfully');
  };

  return (
    <section className="task-form-section">
      <div className="task-form-card">
        <h2 className="task-form-title">
          <span className="task-form-title-icon">➕</span>
          Add New Task
        </h2>
        <form onSubmit={handleFormSubmit} className="task-form">
          <div className="form-group">
            <Label htmlFor="taskTitle" className="form-label">
              Task Title *
            </Label>
            <Input
              id="taskTitle"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your task title..."
              className="form-input"
              required
            />
            {titleError && (
              <p className="error-message">{titleError}</p>
            )}
          </div>

          <div className="form-group">
            <Label htmlFor="taskDescription" className="form-label">
              Description
            </Label>
            <Textarea
              id="taskDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add task details (optional)..."
              rows={3}
              className="form-textarea"
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <Label htmlFor="taskDueDate" className="form-label">
                Due Date *
              </Label>
              <Input
                id="taskDueDate"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="form-input"
                required
              />
              {dateError && (
                <p className="error-message">{dateError}</p>
              )}
            </div>

            <div className="form-group">
              <Label htmlFor="taskPriority" className="form-label">
                Priority
              </Label>
              <Select value={priority} onValueChange={(value: Priority) => setPriority(value)}>
                <SelectTrigger className="form-select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="form-group">
            <Label htmlFor="taskReminder" className="form-label">
              Reminder Time (Optional)
            </Label>
            <Input
              id="taskReminder"
              type="datetime-local"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="form-input"
            />
          </div>

          <Button 
            type="submit" 
            className="submit-button"
          >
            <span>Add Task</span>
            <span>→</span>
          </Button>
        </form>
      </div>
    </section>
  );
};

export default TaskForm;
