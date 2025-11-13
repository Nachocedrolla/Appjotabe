
import React from 'react';

interface SelectInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  label,
  id,
  value,
  onChange,
  options,
  placeholder,
  required,
  disabled = false,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out disabled:bg-gray-100 disabled:cursor-not-allowed"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
