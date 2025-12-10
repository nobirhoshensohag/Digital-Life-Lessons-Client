import React from "react";
import logo from "../../assets/logo2.png";
const Logo2 = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer group">
      <div className={`p-2 rounded-lg transition-colors`}>
        <img className="w-20 h-10" src={logo} alt="Sage Logo" />
      </div>
    </div>
  );
};

export default Logo2;