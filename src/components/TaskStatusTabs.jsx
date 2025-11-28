import React from "react";

const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="my-2 overflow-x-auto pb-1">
      <div className="flex gap-1 min-w-max">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.label;

          return (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`
                relative px-4 py-2 rounded-md 
                text-sm font-medium transition-all duration-300
                ${
                  isActive
                    ? "text-primary"
                    : "text-gray-600 hover:text-gray-800"
                }
              `}
            >
              <div className="flex items-center gap-2">
                <span className="text-xs md:text-sm">{tab.label}</span>

                <span
                  className={`
                    text-xs md:text-xs px-2 py-0.5 rounded-full
                    transition-colors duration-300
                    ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-gray-200 text-gray-600"
                    }
                  `}
                >
                  {tab.count}
                </span>
              </div>

              {/* Underline effect */}
              {isActive && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TaskStatusTabs;
