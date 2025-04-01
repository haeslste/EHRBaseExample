import { FC } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  options: Option[];
  selected: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export const SelectInput: FC<SelectInputProps> = ({ label, options, selected, onChange, disabled }) => (
  <div className="mb-4 flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
    <select
      className="rounded border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      value={selected}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);
