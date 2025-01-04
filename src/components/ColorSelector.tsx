import React from 'react';
import { HABIT_COLORS } from '../lib/constants';

interface Props {
  value: string;
  onChange: (color: string) => void;
}

export function ColorSelector({ value, onChange }: Props) {
  return (
    <div className="flex gap-3">
      {HABIT_COLORS.map((color) => (
        <button
          key={color.name}
          type="button"
          onClick={() => onChange(color.name)}
          className={`w-8 h-8 rounded-full transition-transform ${
            value === color.name ? 'scale-110 ring-2 ring-offset-2 ring-blue-500' : ''
          }`}
          style={{ backgroundColor: color.value }}
        />
      ))}
    </div>
  );
}