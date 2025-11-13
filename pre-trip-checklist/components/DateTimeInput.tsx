
import React from 'react';

interface DateTimeInputProps {
  label: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);


const DateTimeInput: React.FC<DateTimeInputProps> = ({ label, id, value, onChange, required }) => {
  return (
    <div className="w-full">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type="datetime-local"
          id={id}
          name={id}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full p-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out appearance-none"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <CalendarIcon />
        </div>
      </div>
    </div>
  );
};

export default DateTimeInput;
