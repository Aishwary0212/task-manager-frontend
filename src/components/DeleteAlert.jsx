import React from "react";

const DeleteAlert = ({ content, onDelete }) => {
  return (
    <div>
      <p className="text-sm text-slate-700 leading-relaxed">{content}</p>

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="px-4 py-2 text-sm md:text-base font-medium text-rose-600 bg-rose-50 border border-rose-200 rounded-lg active:scale-[0.97] transition"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlert;
