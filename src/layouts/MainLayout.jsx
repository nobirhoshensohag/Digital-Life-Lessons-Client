import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar";

const MainLayout = () => {
  return (
    <div className="bg-[#F3F5F0]">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default MainLayout;