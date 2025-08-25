
import React from 'react';

interface SectionHeaderProps {
  title: string;
  action?: React.ReactNode;
}

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
    </svg>
)


export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, action }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      {action}
    </div>
  );
};
