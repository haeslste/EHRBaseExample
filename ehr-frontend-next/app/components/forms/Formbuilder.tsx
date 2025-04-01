import { FC } from 'react';
import { TextInput } from './inputs/TextInput';
import { SelectInput } from './inputs/SelectInput';

interface FormField {
  id: string;
  type: 'TEXT' | 'CODED_TEXT';
  label: string;
  options?: { value: string; label: string }[];
}

interface FormSection {
  title: string;
  fields: FormField[];
}

interface Template {
  structure: FormSection[];
}

interface FormBuilderProps {
  template: Template;
  data?: Record<string, any>;
  readOnly?: boolean;
  onChange?: (id: string, value: any) => void;
  onSubmit?: (formData: Record<string, any>) => void;
}

export const FormBuilder: FC<FormBuilderProps> = ({ template, data = {}, readOnly = false, onChange, onSubmit }) => {
  const handleChange = (id: string, value: any) => {
    onChange && onChange(id, value);
  };

  const handleSubmit = () => {
    onSubmit && onSubmit(data);
  };

  const renderField = (field: FormField) => {
    const value = data[field.id] || '';

    switch (field.type) {
      case 'TEXT':
        return (
          <TextInput
            key={field.id}
            label={field.label}
            value={value}
            onChange={(val) => handleChange(field.id, val)}
            disabled={readOnly}
          />
        );
      case 'CODED_TEXT':
        return (
          <SelectInput
            key={field.id}
            label={field.label}
            selected={value}
            options={field.options || []}
            onChange={(val) => handleChange(field.id, val)}
            disabled={readOnly}
          />
        );
      default:
        return null;
    }
  };

  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      {template.structure.map((section, idx) => (
        <div key={idx} className="p-4 border rounded-md bg-gray-50">
          <h2 className="mb-2 font-semibold text-gray-800">{section.title}</h2>
          {section.fields.map(renderField)}
        </div>
      ))}

      {!readOnly && (
        <button
          type="button"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Submit
        </button>
      )}
    </form>
  );
};
