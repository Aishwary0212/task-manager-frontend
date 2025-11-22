import React from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const Navbar = ({ activeMenu, menuOpen, onMenuToggle }) => {
  return (
    <div className="flex gap-5 bg-white border-b border-gray-200/50 py-4 px-7 sticky top-0 z-30">
      {/* Mobile Menu Button */}
      <button className="block lg:hidden text-black" onClick={onMenuToggle}>
        {menuOpen ? (
          <HiOutlineX className="text-2xl" />
        ) : (
          <HiOutlineMenu className="text-2xl" />
        )}
      </button>

      <div className="text-lg font-medium text-black">Task Manager</div>
    </div>
  );
};

export default Navbar;
