import React from 'react';
import { useSettings } from '../../hooks/useSettings';

export function SettingsView() {
  const { settings, updateSettings } = useSettings();

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-lg font-semibold mb-4">Préférences</h2>
        <div className="bg-white rounded-xl divide-y divide-gray-100">
          <div className="p-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium">Notifications</h3>
              <p className="text-sm text-gray-500">Rappels quotidiens</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => updateSettings({ notifications: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
            </label>
          </div>

          <div className="p-4">
            <h3 className="font-medium mb-2">Heure de rappel</h3>
            <input
              type="time"
              value={settings.reminderTime}
              onChange={(e) => updateSettings({ reminderTime: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-gray-900 focus:border-transparent"
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">À propos</h2>
        <div className="bg-white rounded-xl p-4">
          <p className="text-sm text-gray-500">Version 1.0.0</p>
        </div>
      </section>
    </div>
  );
}