import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Trash2, X } from 'lucide-react';
import type { Habit } from '../lib/db';

interface Props {
  habit?: Habit;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (habit: Habit) => void;
  onDelete: (habit: Habit) => void;
}

export function EditHabitSheet({ habit, isOpen, onClose, onUpdate, onDelete }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');

  // Mettre à jour les états locaux quand l'habitude change
  useEffect(() => {
    if (habit) {
      setName(habit.name);
      setDescription(habit.description ?? '');
      setFrequency(habit.frequency);
    }
  }, [habit]);

  if (!habit) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate({ ...habit, name, description, frequency });
    onClose();
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-lg"
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Modifier l'habitude</h2>
          <button onClick={onClose} className="p-2">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (optionnelle)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fréquence
            </label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value as 'daily' | 'weekly')}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            >
              <option value="daily">Quotidienne</option>
              <option value="weekly">Hebdomadaire</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <Pencil className="w-5 h-5" />
              Modifier
            </button>
            <button
              type="button"
              onClick={() => {
                onDelete(habit);
                onClose();
              }}
              className="px-4 py-3 rounded-xl font-semibold bg-red-100 text-red-600 flex items-center justify-center"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}