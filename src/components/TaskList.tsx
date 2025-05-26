
import React from 'react';
import { Card } from '@/components/ui/card';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Task, Priority } from '@/types/Task';
import TaskItem from './TaskItem';
import PriorityFilter from './PriorityFilter';

interface TaskListProps {
  tasks: Task[];
  onReorderTasks: (reorderedTasks: Task[]) => void;
  priorityFilter: Priority | 'All';
  onPriorityFilterChange: (priority: Priority | 'All') => void;
}

const TaskList = ({ tasks, onReorderTasks, priorityFilter, onPriorityFilterChange }: TaskListProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const filteredTasks = priorityFilter === 'All' 
    ? tasks 
    : tasks.filter(task => task.priority === priorityFilter);

  // Sort tasks by priority (High -> Medium -> Low) and then by due date
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = sortedTasks.findIndex(task => task.id === active.id);
      const newIndex = sortedTasks.findIndex(task => task.id === over.id);
      
      const newOrder = arrayMove(sortedTasks, oldIndex, newIndex);
      
      // Update the original tasks array with new positions
      const updatedTasks = tasks.map(task => {
        const newPosition = newOrder.findIndex(t => t.id === task.id);
        return newPosition !== -1 ? { ...task, order: newPosition } : task;
      });
      
      onReorderTasks(updatedTasks);
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h2 className="text-2xl font-semibold text-white flex items-center">
          <span className="mr-2">📋</span>
          Your Tasks
        </h2>
        <div className="flex items-center space-x-4">
          <PriorityFilter 
            selectedPriority={priorityFilter}
            onPriorityChange={onPriorityFilterChange}
          />
          <div className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">
            {filteredTasks.length} tasks
          </div>
        </div>
      </div>

      {filteredTasks.length === 0 ? (
        <Card className="p-12 text-center bg-white/10 backdrop-blur-sm border border-white/20">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-semibold text-white mb-2">
            {priorityFilter === 'All' ? 'No tasks yet' : `No ${priorityFilter.toLowerCase()} priority tasks`}
          </h3>
          <p className="text-white/80 text-lg">
            {priorityFilter === 'All' 
              ? 'Create your first task to get started on your journey to productivity!'
              : `Try changing the priority filter or create a new ${priorityFilter.toLowerCase()} priority task.`
            }
          </p>
        </Card>
      ) : (
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToVerticalAxis]}
        >
          <SortableContext items={sortedTasks.map(task => task.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {sortedTasks.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </section>
  );
};

export default TaskList;
