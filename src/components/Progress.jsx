import React from "react";

const Progress = ({ progress = 0, status }) => {
  const getColorClasses = () => {
    switch (status) {
      case "In Progress":
        return "bg-cyan-500/90";
      case "Completed":
        return "bg-indigo-500/90";
      default:
        return "bg-violet-500/90";
    }
  };

  return (
    <div className="w-full bg-gray-200/60 rounded-full h-2 overflow-hidden">
      <div
        className={`${getColorClasses()} h-2 rounded-full transition-all duration-500 ease-out`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default Progress;
