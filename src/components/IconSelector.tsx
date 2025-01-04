import React from 'react';
import { HABIT_ICONS } from '../lib/constants';

interface Props {
  value: string;
  onChange: (iconName: string) => void;
}

export function IconSelector({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-5 gap-3">
      {HABIT_ICONS.map(({ icon: Icon, label }) => {
        const isSelected = value === Icon.name;
        return (
          <button
            key={Icon.name}
            type="button"
            onClick={() => onChange(Icon.name)}
            className={`p-3 rounded-xl flex flex-col items-center gap-1 transition-colors ${
              isSelected 
                ? 'bg-gray-900 text-white' 
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs">{label}</span>
          </button>
        );
      })}
    </div>
  );
}