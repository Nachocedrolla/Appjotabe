
import React from 'react';

interface ChecklistItemProps {
  id: string;
  label: string;
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isHighlighted?: boolean;
}

const RadioOption: React.FC<{id: string, name: string, value: string, label: string, checked: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, colorClass: string}> = 
({id, name, value, label, checked, onChange, colorClass}) => {
    return (
        <label htmlFor={`${id}-${value}`} className="flex items-center space-x-2 cursor-pointer">
            <input
                type="radio"
                id={`${id}-${value}`}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className={`form-radio h-4 w-4 ${colorClass} text-indigo-600 border-gray-300 focus:ring-indigo-500 transition duration-150`}
            />
            <span className="text-gray-700 text-sm">{label}</span>
        </label>
    );
};

const ChecklistItem: React.FC<ChecklistItemProps> = ({ id, label, selectedValue, onChange, isHighlighted = false }) => {
  const baseClasses = "flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg";
  const highlightedClasses = "bg-blue-50 border-l-4 border-blue-500";
  const normalClasses = "border";

  return (
    <div className={`${baseClasses} ${isHighlighted ? highlightedClasses : normalClasses} mb-3`}>
      <span className="text-gray-800 font-medium mb-2 sm:mb-0">{label}</span>
      <div className="flex items-center space-x-4">
        <RadioOption id={id} name={id} value="bueno" label="Bueno" checked={selectedValue === 'bueno'} onChange={onChange} colorClass="checked:bg-green-500" />
        <RadioOption id={id} name={id} value="malo" label="Malo" checked={selectedValue === 'malo'} onChange={onChange} colorClass="checked:bg-red-500" />
        <RadioOption id={id} name={id} value="na" label="N/A" checked={selectedValue === 'na'} onChange={onChange} colorClass="checked:bg-gray-500" />
      </div>
    </div>
  );
};

export default ChecklistItem;
