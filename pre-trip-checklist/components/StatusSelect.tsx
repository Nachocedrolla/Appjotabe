import React from 'react';

interface StatusSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const StatusSelect: React.FC<StatusSelectProps> = ({ id, label, value, onChange }) => {
  const getBgColor = (selectedValue: string) => {
    if (selectedValue === 'Vigente') return 'bg-green-100 border-green-300';
    if (selectedValue === 'Vencido') return 'bg-red-100 border-red-300';
    return 'bg-white border-gray-300';
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border mb-3">
      <label htmlFor={id} className="text-gray-800 font-medium mb-2 sm:mb-0 sm:mr-4 flex-1">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className={`w-full sm:w-48 p-2.5 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition-colors duration-150 ease-in-out ${getBgColor(value)}`}
      >
        <option value="" disabled>Seleccione...</option>
        <option value="Vigente">Vigente</option>
        <option value="Vencido">Vencido</option>
      </select>
    </div>
  );
};

export default StatusSelect;