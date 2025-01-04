import React from 'react';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Habit } from '../../lib/db';
import { WeeklyProgress } from './WeeklyProgress';
import { StatsCard } from './StatsCard';

interface Props {
  habits: Habit[];
}

export function StatsView({ habits }: Props) {
  const weekStart = startOfWeek(new Date(), { locale: fr });
  const weekEnd = endOfWeek(new Date(), { locale: fr });
  
  const completedToday = habits.filter(habit => 
    habit.completedDates.some(date => 
      format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
    )
  ).length;

  const completedThisWeek = habits.reduce((total, habit) => 
    total + habit.completedDates.filter(date => 
      date >= weekStart && date <= weekEnd
    ).length
  , 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <StatsCard
          title="Aujourd'hui"
          value={`${completedToday}/${habits.length}`}
          label="habitudes complétées"
        />
        <StatsCard
          title="Cette semaine"
          value={completedThisWeek.toString()}
          label="actions réalisées"
        />
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-4">Progression hebdomadaire</h2>
        <WeeklyProgress habits={habits} />
      </section>
    </div>
  );
}