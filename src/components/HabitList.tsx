import React from 'react';
import { Reorder } from 'framer-motion';
import { GripVertical } from 'lucide-react';
import { HabitCheckButton } from './HabitCheckButton';
import type { Habit } from '../lib/db';

interface Props {
  habits: Habit[];
  onToggleHabit: (habit: Habit) => void;
  onEditHabit: (habit: Habit) => void;
  onReorder: (newOrder: string[]) => void;
}

export function HabitList({ habits, onToggleHabit, onEditHabit, onReorder }: Props) {
  return (
    <Reorder.Group 
      axis="y" 
      values={habits.map(h => h.id)} 
      onReorder={onReorder}
      className="space-y-5"
    >
      {habits.map((habit) => (
        <Reorder.Item
          key={habit.id}
          value={habit.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="group touch-none"
        >
          <div 
            onClick={() => onEditHabit(habit)}
            className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors shadow-sm"
          >
            <div 
              className="cursor-grab active:cursor-grabbing"
              onClick={(e) => e.stopPropagation()}
            >
              <GripVertical className="w-6 h-6 text-gray-400" />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-medium">{habit.name}</h3>
              {habit.description && (
                <p className="text-sm text-gray-500 mt-0.5">{habit.description}</p>
              )}
            </div>

            <HabitCheckButton habit={habit} onToggle={onToggleHabit} />
          </div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}