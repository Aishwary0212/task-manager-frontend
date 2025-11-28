import React from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const info = payload[0];

    return (
      <div className="bg-white shadow-lg rounded-md px-3 py-2 border border-gray-200 animate-fadeIn">
        <p className="text-xs font-semibold text-gray-800 mb-1">{info.name}</p>
        <p className="text-sm text-gray-600">
          Count:{" "}
          <span className="font-semibold text-gray-900">{info.value}</span>
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
