
import React from 'react';
import { Option, Language } from '../types';

interface SelectInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  language: Language;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, value, onChange, options, language }) => (
  <div className="w-full">
    <label className="block text-sm font-semibold mb-2 text-emerald-300">{label}</label>
    <select
      value={value}
      onChange={onChange}
      className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3 text-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-300"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label[language]}
        </option>
      ))}
    </select>
  </div>
);

export default SelectInput;
