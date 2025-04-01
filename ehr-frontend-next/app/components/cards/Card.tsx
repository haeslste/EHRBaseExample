import { FC, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card: FC<CardProps> = ({ children, className }) => (
  <div className={`bg-white rounded shadow p-4 ${className ?? ''}`}>{children}</div>
);
