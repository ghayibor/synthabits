import { useState, useEffect } from 'react';

interface Settings {
  notifications: boolean;
  reminderTime: string;
}

const DEFAULT_SETTINGS: Settings = {
  notifications: false,
  reminderTime: '20:00'
};

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return { settings, updateSettings };
}