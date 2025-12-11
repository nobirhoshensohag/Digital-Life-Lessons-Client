import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";

const MainLayout = () => {
  return (
    <div className="bg-[#F3F5F0]">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;