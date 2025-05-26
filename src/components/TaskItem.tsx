
import React from 'react';
import { Card } from '@/components/ui/card';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task, Priority } from '@/types/Task';

interface TaskItemProps {
  task: Task;
}

const TaskItem = ({ task }: TaskItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
  };

  const getDateStatus = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    
    if (due.getTime() === today.getTime()) {
      return { class: 'bg-yellow-100 text-yellow-800', text: 'Today' };
    } else if (due < today) {
      return { class: 'bg-red-100 text-red-800', text: 'Overdue' };
    }
    return { class: 'bg-gray-100 text-gray-700', text: formatDate(dueDate) };
  };

  const getPriorityStyle = (priority: Priority) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800 border-l-red-500';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800 border-l-yellow-500';
      case 'Low':
        return 'bg-green-100 text-green-800 border-l-green-500';
      default:
        return 'bg-gray-100 text-gray-800 border-l-gray-500';
    }
  };

  const dateStatus = getDateStatus(task.dueDate);
  const priorityStyle = getPriorityStyle(task.priority);

  return (
    <Card 
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 ${priorityStyle.split(' ').slice(-1)[0]} animate-in slide-in-from-bottom-4 cursor-grab active:cursor-grabbing`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-semibold text-gray-800 flex-1">
          {task.title}
        </h3>
        <div className="flex space-x-2 ml-4">
          <span className={`px-2 py-1 rounded-md text-xs font-medium ${priorityStyle.split('border-l-')[0]}`}>
            {task.priority}
          </span>
          <span className={`px-3 py-1 rounded-md text-xs font-medium ${dateStatus.class}`}>
            {dateStatus.text}
          </span>
        </div>
      </div>
      {task.description && (
        <p className="text-gray-600 mb-3 leading-relaxed">
          {task.description}
        </p>
      )}
      {task.reminderTime && (
        <div className="text-sm text-blue-600 mb-2">
          🔔 Reminder: {formatDateTime(task.reminderTime)}
        </div>
      )}
      <div className="text-xs text-gray-500">
        Task #{task.id} • Created {formatDateTime(task.createdAt)}
      </div>
    </Card>
  );
};

export default TaskItem;
