import React from 'react';

interface ConditionSelectProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ConditionSelect: React.FC<ConditionSelectProps> = ({ id, label, value, onChange }) => {
  const getBgColor = (selectedValue: string) => {
    if (selectedValue === 'Normal') return 'bg-green-100 border-green-300';
    if (selectedValue === 'Falla') return 'bg-red-100 border-red-300';
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
        <option value="Normal">Normal</option>
        <option value="Falla">Falla</option>
      </select>
    </div>
  );
};

export default ConditionSelect;