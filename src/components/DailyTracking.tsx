import React from 'react';
import { Check } from 'lucide-react';
import { format, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { Habit } from '../lib/db';

interface Props {
  habits: Habit[];
}

export function DailyTracking({ habits }: Props) {
  const weekStart = startOfWeek(new Date(), { locale: fr });
  const weekEnd = endOfWeek(new Date(), { locale: fr });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div className="flex justify-between px-2 mb-4">
      {days.map((day, index) => {
        const isToday = format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
        const completedCount = habits.filter(habit =>
          habit.completedDates.some(date =>
            format(date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
          )
        ).length;
        const allCompleted = completedCount === habits.length && habits.length > 0;

        return (
          <div 
            key={day.toString()} 
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs text-gray-400">
              {format(day, 'EEE', { locale: fr }).slice(0, 2)}
            </span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isToday ? 'bg-white shadow-sm' : ''
            }`}>
              {allCompleted ? (
                <Check className="w-4 h-4 text-gray-900" />
              ) : (
                <span className={`text-sm ${isToday ? 'text-gray-900' : 'text-gray-400'}`}>
                  {format(day, 'dd')}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}