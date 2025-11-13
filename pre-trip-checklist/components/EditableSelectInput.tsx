
import React from 'react';

interface EditableSelectInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

const EditableSelectInput: React.FC<EditableSelectInputProps> = ({
  label,
  id,
  value,
  onChange,
  options,
  placeholder,
  required,
  disabled = false,
}) => {
  const datalistId = `${id}-datalist`;

  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        list={datalistId}
        className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
      <datalist id={datalistId}>
        {options.map((option) => (
          <option key={option.value} value={option.label} />
        ))}
      </datalist>
    </div>
  );
};

export default EditableSelectInput;
