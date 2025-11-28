import React from "react";

const InfoCard = ({ icon: Icon, label, value, color }) => {
  return (
    <div className="flex items-center gap-3 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition">
      {/* Color indicator */}
      <div className={`w-3 h-10 md:h-12 rounded-full ${color}`} />

      {/* Text */}
      <div>
        <p className="text-lg md:text-xl font-semibold text-gray-900 leading-none">
          {value}
        </p>
        <p className="text-xs md:text-sm text-gray-500">{label}</p>
      </div>
    </div>
  );
};

export default InfoCard;
