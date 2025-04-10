'use client';
import React from 'react';

interface DashboardStatCardProps {
  title: string;
  count: number;
  icon?: React.ReactNode; // optional icon
  className?: string;     // optional className for extra styles
}

export const DashboardStatCard: React.FC<DashboardStatCardProps> = ({
  title,
  count,
  icon,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-2xl aspect-square shadow-md p-6 flex flex-col justify-center items-center ${className}`}>
      {icon && <div className="mb-4 text-4xl">{icon}</div>}
      <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
      <p className="text-5xl font-bold text-indigo-600">{count}</p>
    </div>
  );
};