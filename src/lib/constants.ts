import { 
  Book, 
  Brain, 
  Dumbbell, 
  Heart, 
  Home, 
  Music, 
  PenTool, 
  Leaf,
  Smile, 
  Sun, 
  Type, 
  Utensils, 
  Droplets, // Remplacé Water par Droplets
  Zap,
  LucideIcon
} from 'lucide-react';

export const HABIT_ICONS: { icon: LucideIcon; label: string }[] = [
  { icon: Droplets, label: 'Eau' }, // Mise à jour de l'icône
  { icon: Dumbbell, label: 'Sport' },
  { icon: Brain, label: 'Apprentissage' },
  { icon: Book, label: 'Lecture' },
  { icon: Heart, label: 'Santé' },
  { icon: Music, label: 'Musique' },
  { icon: PenTool, label: 'Créativité' },
  { icon: Leaf, label: 'Nature' },
  { icon: Home, label: 'Maison' },
  { icon: Smile, label: 'Bien-être' },
  { icon: Sun, label: 'Méditation' },
  { icon: Type, label: 'Écriture' },
  { icon: Utensils, label: 'Alimentation' },
  { icon: Zap, label: 'Énergie' },
];

export const HABIT_COLORS = [
  { name: 'blue', value: '#60a5fa', background: '#eff6ff' },
  { name: 'green', value: '#4ade80', background: '#f0fdf4' },
  { name: 'purple', value: '#a78bfa', background: '#f5f3ff' },
  { name: 'pink', value: '#f472b6', background: '#fdf2f8' },
  { name: 'orange', value: '#fb923c', background: '#fff7ed' },
  { name: 'teal', value: '#2dd4bf', background: '#f0fdfa' },
];