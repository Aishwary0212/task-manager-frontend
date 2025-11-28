import React from "react";

const UserCard = ({ userInfo }) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
      {/* User Header */}
      <div className="flex items-center gap-3">
        <img
          src={userInfo?.profileImageUrl}
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover border"
        />

        <div>
          <p className="text-sm font-semibold text-gray-900">
            {userInfo?.name}
          </p>
          <p className="text-xs text-gray-500">{userInfo?.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 mt-5">
        <StatCard
          label="Pending"
          count={userInfo?.pendingTasks || 0}
          status="Pending"
        />
        <StatCard
          label="In Progress"
          count={userInfo?.inProgressTasks || 0}
          status="In Progress"
        />
        <StatCard
          label="Completed"
          count={userInfo?.completedTasks || 0}
          status="Completed"
        />
      </div>
    </div>
  );
};

export default UserCard;

const StatCard = ({ label, count, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case "In Progress":
        return "bg-cyan-50 text-cyan-600 border border-cyan-100";
      case "Completed":
        return "bg-lime-50 text-lime-600 border border-lime-100";
      default:
        return "bg-violet-50 text-violet-600 border border-violet-100";
    }
  };

  return (
    <div
      className={`flex-1 px-3 py-2 rounded-lg text-center text-xs font-medium ${getStatusColor()}`}
    >
      <span className="text-sm font-semibold">{count}</span>
      <br />
      {label}
    </div>
  );
};
