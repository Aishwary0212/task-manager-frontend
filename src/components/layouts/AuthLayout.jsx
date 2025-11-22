import React from "react";
import UI_IMG from "../../assets/images/auth-img.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
      {/* Left side - content */}
      <div className="flex-1 flex flex-col justify-center px-10 md:px-20 py-8 bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Task Manager</h2>
        <div className="max-w-md w-full">{children}</div>
      </div>

      {/* Right side - image */}
      <div className="hidden md:flex md:w-1/2 h-full items-center justify-center bg-blue-50 bg-[url(./bg-img.png)] bg-cover bg-no-repeat bg-center overflow-hidden p-8">
        <img src={UI_IMG} alt="Auth UI" className="w-80 max-w-[90%]" />
      </div>
    </div>
  );
};

export default AuthLayout;
