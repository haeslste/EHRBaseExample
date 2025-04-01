import { FC } from 'react';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const TextInput: FC<TextInputProps> = ({ label, value, onChange, placeholder, disabled }) => (
  <div className="mb-4 flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
    <input
      type="text"
      className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
    />
  </div>
);
