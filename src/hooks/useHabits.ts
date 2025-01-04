import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { habitDB, type Habit } from '../lib/db';

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const loadHabits = async () => {
      const habits = await habitDB.getAll();
      setHabits(habits.sort((a, b) => a.order - b.order));
    };
    loadHabits();
  }, []);

  const addHabit = async (habitData: { 
    name: string; 
    description?: string; 
    icon: string;
    color: string;
    frequency: 'daily' | 'weekly' 
  }) => {
    const maxOrder = Math.max(0, ...habits.map(h => h.order));
    const newHabit = await habitDB.add({ ...habitData, order: maxOrder + 1 });
    setHabits(prev => [...prev, newHabit]);
  };

  const updateHabit = async (habit: Habit) => {
    await habitDB.update(habit);
    setHabits(prev => prev.map(h => h.id === habit.id ? habit : h));
  };

  const reorderHabits = async (newOrder: string[]) => {
    const updatedHabits = habits.map((habit, index) => ({
      ...habit,
      order: newOrder.indexOf(habit.id)
    }));
    
    await Promise.all(
      updatedHabits.map(habit => habitDB.update(habit))
    );
    
    setHabits(updatedHabits.sort((a, b) => a.order - b.order));
  };

  const deleteHabit = async (habit: Habit) => {
    await habitDB.delete(habit.id);
    setHabits(prev => prev.filter(h => h.id !== habit.id));
  };

  const toggleHabit = async (habit: Habit) => {
    const today = new Date();
    const todayStr = format(today, 'yyyy-MM-dd');
    
    const isCompletedToday = habit.completedDates.some(
      date => format(date, 'yyyy-MM-dd') === todayStr
    );

    const updatedHabit = {
      ...habit,
      completedDates: isCompletedToday
        ? habit.completedDates.filter(
            date => format(date, 'yyyy-MM-dd') !== todayStr
          )
        : [...habit.completedDates, today],
    };

    await habitDB.update(updatedHabit);
    setHabits(prev =>
      prev.map(h => (h.id === habit.id ? updatedHabit : h))
    );
  };

  return {
    habits,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabit,
    reorderHabits
  };
}