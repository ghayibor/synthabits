import React from 'react';
import { LayoutGrid, BarChart2, Settings } from 'lucide-react';

interface Props {
  currentTab: 'habits' | 'stats' | 'settings';
  onChangeTab: (tab: 'habits' | 'stats' | 'settings') => void;
}

export function Navigation({ currentTab, onChangeTab }: Props) {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-gray-50 border-t border-gray-200">
      <div className="max-w-md mx-auto px-4 flex justify-between">
        {[
          { id: 'habits', icon: LayoutGrid, label: 'Habitudes' },
          { id: 'stats', icon: BarChart2, label: 'Statistiques' },
          { id: 'settings', icon: Settings, label: 'Réglages' }
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => onChangeTab(id as 'habits' | 'stats' | 'settings')}
            className={`flex flex-col items-center gap-1 py-4 px-6 transition-colors ${
              currentTab === id 
                ? 'text-gray-900' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
      <div className="safe-area-inset-bottom" />
    </nav>
  );
}