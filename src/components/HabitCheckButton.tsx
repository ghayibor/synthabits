import React from 'react';
import { Check } from 'lucide-react';
import type { Habit } from '../lib/db';

interface Props {
  habit: Habit;
  onToggle: (habit: Habit) => void;
}

export function HabitCheckButton({ habit, onToggle }: Props) {
  const isCompletedToday = habit.completedDates.some(
    date => new Date(date).toDateString() === new Date().toDateString()
  );

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle(habit);
  };

  return (
    <button
      onClick={handleClick}
      className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
        isCompletedToday 
          ? 'bg-black text-white' 
          : 'bg-white text-gray-400 hover:bg-gray-100'
      }`}
    >
      <Check className="w-5 h-5" />
    </button>
  );
}