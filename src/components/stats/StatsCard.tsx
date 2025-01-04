import React from 'react';

interface Props {
  title: string;
  value: string;
  label: string;
}

export function StatsCard({ title, value, label }: Props) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-bold mt-1">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}