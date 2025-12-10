import React from "react";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="bg-[#F3F5F0]">
      <Outlet />
    </div>
  );
};

export default MainLayout;