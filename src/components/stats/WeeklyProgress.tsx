import React from 'react';
import { format, eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Habit } from '../../lib/db';

interface Props {
  habits: Habit[];
}

export function WeeklyProgress({ habits }: Props) {
  const weekStart = startOfWeek(new Date(), { locale: fr });
  const weekEnd = endOfWeek(new Date(), { locale: fr });
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map(day => {
        const completedCount = habits.filter(habit =>
          habit.completedDates.some(date =>
            format(date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
          )
        ).length;

        const progress = habits.length > 0 ? (completedCount / habits.length) * 100 : 0;

        return (
          <div key={day.toString()} className="flex flex-col items-center">
            <div className="text-xs text-gray-500 mb-1">
              {format(day, 'E', { locale: fr })}
            </div>
            <div className="w-full bg-gray-100 rounded-full h-24 relative">
              <div
                className="absolute bottom-0 w-full bg-gray-900 rounded-full transition-all"
                style={{ height: `${progress}%` }}
              />
            </div>
            <div className="text-xs font-medium mt-1">
              {completedCount}
            </div>
          </div>
        );
      })}
    </div>
  );
}