import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <Navbar activeMenu={activeMenu} onMenuToggle={() => setMenuOpen(!menuOpen)} />

      {user && (
        <div className="flex">
          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Mobile Slide Menu */}
          {menuOpen && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-40 lg:hidden"
                 onClick={() => setMenuOpen(false)}>
              <div
                className="w-64 h-full bg-white"
                onClick={(e) => e.stopPropagation()}
              >
                <SideMenu activeMenu={activeMenu} />
              </div>
            </div>
          )}

          <div className="grow mx-4 md:mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
