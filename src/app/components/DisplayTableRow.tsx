import React from "react";

interface TableRowProps {
  label: string;
  value: string | number;
  description: string;
  bgColorClass: string;
  tooltip: string;
}

const TableRow: React.FC<TableRowProps> = ({
  label,
  value,
  description,
  bgColorClass,
  tooltip,
}) => {
  return (
    <tr className="h-full w-full">
      <td
        className={`px-4 py-2 flex flex-col justify-center ${bgColorClass} h-full`}
      >
        <div className="text-sm font-semibold flex justify-between">
          <div>{label} </div>
          <div className="relative inline-block group">
            <button className="text-gray-600 transition-colors duration-200 focus:outline-none dark:text-gray-200 dark:hover:text-blue-400 hover:text-blue-500 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
            </button>
            <p
              className="absolute items-center mb-36 justify-center w-96 p-3 text-gray-600 -translate-x-1/2 bg-white rounded-lg shadow-lg -top-16 left-1/2 dark:shadow-none shadow-gray-200 dark:bg-gray-800 dark:text-white hidden group-hover:block"
              style={{ lineHeight: "1.25", letterSpacing: "-0.02em" }}
            >
              <span className="leading-none">{tooltip}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 absolute rotate-45 -translate-x-1/2 left-1/2 bottom-0.5 -mb-3 transform text-white dark:text-gray-800 fill-current"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z" />
              </svg>
            </p>
          </div>
        </div>
        <span className="text-xs text-gray-500">{description}</span>
      </td>
      <td className="px-4 py-2 h-full">
        <span className="text-teal-400 font-display text-2xl">{value}</span>
      </td>
    </tr>
  );
};

export default TableRow;
