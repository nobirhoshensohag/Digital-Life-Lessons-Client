import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const SocialLogin = () => {
  const { googleLogin } = useAuth();

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success("Sign in successful");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <button
      onClick={handleGoogleLogin}
      type="button"
      className="w-full cursor-pointer mt-3 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-3.5 rounded-full shadow-sm hover:shadow-md transition-all"
    >
      <FcGoogle />
      Continue with Google
    </button>
  );
};

export default SocialLogin;