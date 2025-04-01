import { FC } from 'react';

interface Column {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
}

export const DataTable: FC<DataTableProps> = ({ columns, data }) => (
  <div className="overflow-auto rounded-md shadow">
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className="px-4 py-2 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, idx) => (
          <tr key={idx} className="hover:bg-gray-50">
            {columns.map((col) => (
              <td key={col.key} className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                {col.render ? col.render(row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
