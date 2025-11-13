
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, children }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200/80 mb-6">
      <h2 className="text-xl font-semibold text-[#1e3a8a] mb-5 border-b pb-3">{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default Card;
