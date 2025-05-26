
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Priority } from '@/types/Task';

interface PriorityFilterProps {
  selectedPriority: Priority | 'All';
  onPriorityChange: (priority: Priority | 'All') => void;
}

const PriorityFilter = ({ selectedPriority, onPriorityChange }: PriorityFilterProps) => {
  return (
    <div className="flex items-center space-x-2">
      <span className="text-white/90 font-medium">Filter by Priority:</span>
      <Select value={selectedPriority} onValueChange={onPriorityChange}>
        <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="High">High</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Low">Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default PriorityFilter;
