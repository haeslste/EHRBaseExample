import { FC } from 'react';

interface DateInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}

export const DateInput: FC<DateInputProps> = ({ label, value, onChange, disabled }) => (
  <div className="mb-4 flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
    <input
      type="date"
      className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
    />
  </div>
);
