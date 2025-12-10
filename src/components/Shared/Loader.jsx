import React from "react";
import { ClockLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <ClockLoader color="#4f6f52" />
    </div>
  );
};

export default Loader;