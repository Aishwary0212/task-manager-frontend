import React, { useState, useRef, useEffect } from "react";
import { LuChevronDown } from "react-icons/lu";

const SelectDropdown = ({ options = [], value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (option) => {
    onChange(option); // Return full option object
    setIsOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Selected Field */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full text-sm text-gray-900 bg-white border border-gray-200 px-3 py-3 rounded-md mt-2 flex justify-between items-center active:scale-[0.98] transition"
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>

        <LuChevronDown
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <div
          className="absolute w-full bg-white border border-gray-200 rounded-md mt-1 shadow-md z-20 animate-fadeIn max-h-52 overflow-auto"
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <div
                key={option.value}
                onClick={() => handleSelect(option)}
                className={`px-3 py-2.5 text-sm cursor-pointer transition 
                  ${
                    isSelected
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-gray-100 text-gray-700"
                  }
                `}
              >
                {option.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
