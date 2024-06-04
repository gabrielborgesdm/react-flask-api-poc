import React from "react";

export type StringOrNumber = string | number;

export interface TableAction {
  label: string;
  onClick: (rowData: Array<StringOrNumber>, metaData?: Record<string, unknown>) => void;
}

export interface TableProps {
  tableHeaders: string[];
  tableColumns: StringOrNumber[][];
  actions?: TableAction[];
  metaData: Record<string, unknown>[];
}

const Table: React.FC<TableProps> = ({ tableHeaders, tableColumns, actions, metaData }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
            {actions && <th className="px-6 py-3"></th>}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tableColumns.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell: StringOrNumber, cellIndex: number) => (
                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {cell}
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {actions.map((action, actionIndex) => (
                    <button
                      type="button"
                      key={actionIndex}
                      onClick={() => action.onClick(row, metaData?.[rowIndex])}
                      className="text-indigo-600 hover:text-indigo-900 mr-2"
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
