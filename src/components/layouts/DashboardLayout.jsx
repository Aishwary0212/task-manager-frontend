import React, { useContext, useState } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div>
      <Navbar
        activeMenu={activeMenu}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen(!menuOpen)}
      />

      {user && (
        <div className="flex">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Mobile Sidebar + Transparent Overlay */}
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-40 lg:hidden"
                onClick={() => setMenuOpen(false)}
              ></div>

              <div
                className="fixed left-0 top-0 w-64 h-full z-50 bg-white shadow-lg lg:hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <SideMenu activeMenu={activeMenu} />
              </div>
            </>
          )}

          {/* Main content */}
          <div className="grow mx-4 md:mx-5">{children}</div>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
