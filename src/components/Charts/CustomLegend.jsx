import React from "react";

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-5 px-2">
      {payload?.map((entry, index) => (
        <div
          key={`legend-${index}`}
          className="flex items-center gap-2 bg-white shadow-sm px-3 py-1.5 rounded-full border border-gray-100"
        >
          {/* Colored Dot */}
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>

          {/* Label */}
          <span className="text-sm font-medium text-gray-700">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
