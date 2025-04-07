import React from 'react';

const Quantity = ({ path, label, units = [], defaultValue = '', onChange }) => (
  <div className="mb-4 flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
    <input
      type="number"
      defaultValue={defaultValue}
      name={path}
      className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      onChange={onChange}
    />
    {units.length > 0 && (
      <select className="mt-2 border rounded w-full py-2 px-3" onChange={onChange}>
        {units.map(unit => (
          <option key={unit.unit} value={unit.unit}>
            {unit.label}
          </option>
        ))}
      </select>
    )}
  </div>
);

const Select = ({ path, label, options = [], multiple = false, onChange }) => (
  <div className="mb-4 flex flex-col">
    <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
    <select
      name={path}
      multiple={multiple}
      className="rounded border border-gray-300 px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      onChange={onChange}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const Input = ({ path, label, textarea = false, onChange }) => (
  <div className="mb-4 flex flex-col">
   <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
    {textarea ? (
      <textarea
        name={path}
        className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        onChange={onChange}
      ></textarea>
    ) : (
      <input
        type="text"
        name={path}
        className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        onChange={onChange}
      />
    )}
  </div>
);

const Checkbox = ({ path, label, onChange }) => (
  <div className="mb-4 flex items-center">
    <label className="inline-flex items-center">
      <input 
        type="checkbox" 
        name={path} 
         className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:bg-gray-100 disabled:border-gray-200"
        onChange={onChange} />
      <label className="ml-2 text-sm font-medium text-gray-700">{label}</label>
    </label>
  </div>
);

const DatePicker = ({ path, label, time = false, onChange }) => (
  <div className="mb-4">
    <label className="mb-1 text-sm font-medium text-gray-700">{label}</label>
    <input
      type={time ? "datetime-local" : "date"}
      name={path}
      className="rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      onChange={onChange}
    />
  </div>
);

const Count = ({ path, label, min, max, onChange }) => (
  <div className="mb-4">
    <label className="block text-gray-700">{label}</label>
    <input
      type="number"
      min={min}
      max={max}
      name={path}
      className="border rounded w-full py-2 px-3"
      onChange={onChange}
    />
  </div>
);

const transformations = {
  DV_QUANTITY: n => [
    {
      name: 'Quantity',
      component: props => (
        <Quantity
          {...props}
          defaultValue={n?.inputs?.[1]?.list?.[0]?.value || ''}
          units={
            n.inputs?.[1]?.list?.map(unit => ({
              unit: unit.value,
              label: unit.label,
            })) || []
          }
        />
      ),
    },
  ],
  DV_CODED_TEXT: n => [
    {
      name: n.max === -1 ? 'Select-Multiple' : 'Select',
      component: props => (
        <Select
          {...props}
          multiple={n.max === -1}
          options={
            n.inputs?.[0]?.list?.map(option => ({
              value: option.value,
              label: option.label,
            })) || []
          }
        />
      ),
    },
  ],
  DV_TEXT: n => [
    { name: 'Input', component: props => <Input {...props} /> },
    { name: 'Textarea', component: props => <Input textarea {...props} /> },
  ],
  DV_BOOLEAN: n => [
    { name: 'Checkbox', component: props => <Checkbox {...props} /> },
  ],
  DV_DATE: n => [
    { name: 'Date', component: props => <DatePicker {...props} /> },
  ],
  DV_DATE_TIME: n => [
    { name: 'DateTime', component: props => <DatePicker {...props} time /> },
  ],
  DV_COUNT: n => [
    { name: 'Count', component: props => <Count {...props} min={n.min} max={n.max} /> },
  ],
};

export default leaf => transformations[leaf.rmType]?.(leaf) || [];