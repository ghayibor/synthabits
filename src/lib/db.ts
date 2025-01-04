import { openDB } from 'idb';

const DB_NAME = 'habits-db';
const STORE_NAME = 'habits';

export interface Habit {
  id: string;
  name: string;
  description?: string;
  icon: string;
  color: string;
  frequency: 'daily' | 'weekly';
  createdAt: Date;
  completedDates: Date[];
  order: number;
}

export const db = await openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      store.createIndex('order', 'order');
    }
  },
});

export const habitDB = {
  async getAll(): Promise<Habit[]> {
    return db.getAll(STORE_NAME);
  },

  async add(habit: Omit<Habit, 'id' | 'createdAt' | 'completedDates'>): Promise<Habit> {
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      completedDates: [],
      ...habit,
    };
    await db.add(STORE_NAME, newHabit);
    return newHabit;
  },

  async update(habit: Habit): Promise<void> {
    await db.put(STORE_NAME, habit);
  },

  async delete(id: string): Promise<void> {
    await db.delete(STORE_NAME, id);
  },
};