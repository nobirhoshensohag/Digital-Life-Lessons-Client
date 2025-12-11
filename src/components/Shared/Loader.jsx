import React from "react";
import { FadeLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <FadeLoader color="#4f6f52" />
    </div>
  );
};

export default Loader;