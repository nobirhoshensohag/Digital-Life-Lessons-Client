import React from "react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router";

const SocialLogin = () => {
  const { googleLogin } = useAuth();

   const axiosInstance = useAxios();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    googleLogin()
       .then((result) => {
        axiosInstance
          .post("/users", {
            displayName: result.user.displayName,
            photoURL: result.user.photoURL,
            email: result.user.email,
            isPremium: false,
          })
          .then((res) => {
            if (res.data.insertedId) {
              toast.success("Sign in successful");
              navigate("/");
            }
          });
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