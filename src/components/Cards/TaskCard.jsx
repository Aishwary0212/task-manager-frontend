import React from "react";
import Progress from "../Progress";
import AvatarGroup from "../AvatarGroup";
import { LuPaperclip } from "react-icons/lu";
import moment from "moment";

const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo = [],
  attatchmentCount = 0,
  completedTodoCount,
  completedToDoCount,
  todoChecklist = [],
  onClick,
}) => {
  const completed = completedTodoCount ?? completedToDoCount ?? 0;

  const statusColors = {
    Pending: "bg-violet-50 text-violet-500 border border-violet-500/10",
    "In Progress": "bg-cyan-50 text-cyan-500 border border-cyan-500/10",
    Completed: "bg-lime-50 text-lime-500 border border-lime-500/10",
  };

  const priorityColors = {
    Low: "text-emerald-500 bg-emerald-50 border border-emerald-500/10",
    Medium: "text-amber-500 bg-amber-50 border border-amber-500/10",
    High: "text-rose-500 bg-rose-50 border border-rose-500/10",
  };

  const leftBorderColor =
    status === "In Progress"
      ? "border-cyan-500"
      : status === "Completed"
      ? "border-lime-500"
      : "border-violet-500";

  return (
    <div
      className="bg-white rounded-xl py-4 shadow-md hover:shadow-lg transition cursor-pointer border border-gray-200"
      onClick={onClick}
    >
      {/* Tags */}
      <div className="flex items-center gap-2 px-4">
        <div
          className={`text-[11px] font-medium px-3 py-1 rounded-full ${statusColors[status]}`}
        >
          {status}
        </div>

        <div
          className={`text-[11px] font-medium px-3 py-1 rounded-full ${priorityColors[priority]}`}
        >
          {priority} Priority
        </div>
      </div>

      {/* Task Info */}
      <div className={`px-4 border-l-4 ${leftBorderColor} mt-3`}>
        <p className="text-base font-semibold text-gray-900 line-clamp-2">
          {title}
        </p>

        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{description}</p>

        <p className="text-[13px] text-gray-700/90 font-medium mt-2 mb-2">
          Task Done:
          <span className="font-semibold text-gray-800">
            {" "}
            {completed}/{todoChecklist?.length || 0}
          </span>
        </p>

        <Progress progress={progress} status={status} />
      </div>

      {/* Dates */}
      <div className="px-4 mt-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-[11px] text-gray-500">Start Date</label>
            <p className="text-[13px] font-medium text-gray-900">
              {moment(createdAt).format("Do MMM YYYY")}
            </p>
          </div>

          <div>
            <label className="text-[11px] text-gray-500">Due Date</label>
            <p className="text-[13px] font-medium text-gray-900">
              {moment(dueDate).format("Do MMM YYYY")}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 px-4">
        <AvatarGroup avatars={assignedTo || []} />

        {attatchmentCount > 0 && (
          <div className="flex items-center gap-2 bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-100">
            <LuPaperclip className="text-blue-500" />
            <span className="text-xs font-medium text-gray-900">
              {attatchmentCount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
