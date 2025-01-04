import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Navigation } from './components/Navigation';
import { HabitList } from './components/HabitList';
import { StatsView } from './components/stats/StatsView';
import { SettingsView } from './components/settings/SettingsView';
import { AddHabitSheet } from './components/AddHabitSheet';
import { EditHabitSheet } from './components/EditHabitSheet';
import { DailyTracking } from './components/DailyTracking';
import { useHabits } from './hooks/useHabits';
import type { Habit } from './lib/db';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'habits' | 'stats' | 'settings'>('habits');
  const { habits, addHabit, updateHabit, deleteHabit, toggleHabit, reorderHabits } = useHabits();
  const [isAddSheetOpen, setIsAddSheetOpen] = useState(false);
  const [habitToEdit, setHabitToEdit] = useState<Habit>();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="safe-area-inset-top" />
      <header className="sticky top-0 bg-gray-50/80 backdrop-blur-lg z-10">
        <div className="max-w-md mx-auto px-6 py-6">
          {currentTab === 'habits' ? (
            <>
              <h2 className="text-lg font-medium mb-1">Bonjour.</h2>
              <p className="text-gray-400 text-sm mb-8">
                {format(new Date(), 'd MMMM', { locale: fr })}
              </p>
              <DailyTracking habits={habits} />
            </>
          ) : (
            <h1 className="text-2xl font-bold">
              {currentTab === 'stats' && 'Statistiques'}
              {currentTab === 'settings' && 'Réglages'}
            </h1>
          )}
        </div>
      </header>

      <main className="max-w-md mx-auto px-6 pb-32">
        {currentTab === 'habits' && (
          <HabitList 
            habits={habits} 
            onToggleHabit={toggleHabit}
            onEditHabit={setHabitToEdit}
            onReorder={reorderHabits}
          />
        )}
        {currentTab === 'stats' && <StatsView habits={habits} />}
        {currentTab === 'settings' && <SettingsView />}
      </main>

      {currentTab === 'habits' && (
        <button
          onClick={() => setIsAddSheetOpen(true)}
          className="fixed bottom-24 right-6 w-14 h-14 bg-black rounded-full shadow-lg flex items-center justify-center text-white"
        >
          <Plus className="w-6 h-6" />
        </button>
      )}

      <Navigation currentTab={currentTab} onChangeTab={setCurrentTab} />

      <AddHabitSheet
        isOpen={isAddSheetOpen}
        onClose={() => setIsAddSheetOpen(false)}
        onAdd={addHabit}
      />

      <EditHabitSheet
        habit={habitToEdit}
        isOpen={!!habitToEdit}
        onClose={() => setHabitToEdit(undefined)}
        onUpdate={updateHabit}
        onDelete={deleteHabit}
      />
    </div>
  );
}