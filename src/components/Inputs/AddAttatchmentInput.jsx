import React, { useState } from "react";
import { HiMiniPlus, HiOutlineTrash } from "react-icons/hi2";
import { LuPaperclip } from "react-icons/lu";

const AddAttatchmentInput = ({ attatchments, setAttatchments }) => {
  const [option, setOption] = useState("");

  const handleAddOption = () => {
    const value = option.trim();
    if (!value) return;

    // avoid duplicates
    if (attatchments.includes(value)) return;

    setAttatchments([...attatchments, value]);
    setOption("");
  };

  const handleDeleteOption = (index) => {
    const updated = attatchments.filter((_, i) => i !== index);
    setAttatchments(updated);
  };

  return (
    <div>

      {/* Existing Attachments */}
      {attatchments.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between bg-gray-50 border border-gray-200 px-3 py-2 rounded-md mb-2 animate-fadeIn"
        >
          <div className="flex items-center gap-3">
            <LuPaperclip className="text-gray-400" />
            <p className="text-sm text-gray-800 break-all">{item}</p>
          </div>

          <button
            onClick={() => handleDeleteOption(index)}
            className="p-1 rounded-md hover:bg-red-50 active:scale-95 transition"
          >
            <HiOutlineTrash className="text-lg text-red-500" />
          </button>
        </div>
      ))}

      {/* Add New Attachment */}
      <div className="flex items-center gap-4 mt-4">
        <div className="flex-1 flex items-center gap-3 border border-gray-200 rounded-md px-3 bg-white">
          <LuPaperclip className="text-gray-400" />
          <input
            type="text"
            value={option}
            placeholder="Add file link"
            onChange={(e) => setOption(e.target.value)}
            className="w-full text-sm text-gray-900 outline-none py-2 bg-white"
          />
        </div>

        <button
          onClick={handleAddOption}
          className="card-btn flex items-center gap-1 whitespace-nowrap active:scale-95 transition"
        >
          <HiMiniPlus className="text-lg" /> Add
        </button>
      </div>
    </div>
  );
};

export default AddAttatchmentInput;
