import { FC } from 'react';

interface NumberInputProps {
  label: string;
  value: number | string;
  onChange: (val: number) => void;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
}

export const NumberInput: FC<NumberInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  min,
  max,
  step,
  disabled,
}) => (
  <div className="mb-4 flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
    <input
      type="number"
      className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) => onChange(Number(e.target.value))}
      placeholder={placeholder}
      disabled={disabled}
    />
  </div>
);
