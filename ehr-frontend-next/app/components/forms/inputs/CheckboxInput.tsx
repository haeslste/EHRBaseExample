import { FC } from 'react';

interface CheckboxInputProps {
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
  disabled?: boolean;
}

export const CheckboxInput: FC<CheckboxInputProps> = ({ label, checked, onChange, disabled }) => (
  <div className="mb-4 flex items-center">
    <input
      type="checkbox"
      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:bg-gray-100 disabled:border-gray-200"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      disabled={disabled}
    />
    <label className="ml-2 text-sm font-medium text-gray-700">{label}</label>
  </div>
);
