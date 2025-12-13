import React, { useState } from "react";
import {
  Feather,
  Mail,
  Lock,
  EyeOff,
  Eye,
  User,
  ImagePlus,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import Logo from "../../components/Shared/Logo";
import SocialLogin from "../../components/Shared/SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import useAxios from "../../hooks/useAxios"

const Register = () => {
  const [showPass, setShowPass] = useState(false);
const { createUser, updateUser, setUser } = useAuth();
const [loading, setLoading] = useState(false);
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
   
  const handleRegister = (data) => {
    setLoading(true);
    const profileImage = data.image[0];
    createUser(data.email, data.password)
      .then(() => {
        const formData = new FormData();
        formData.append("image", profileImage);
        axios
          .post(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_IMAGE_HOST_KEY
            }`,
            formData
          )
          .then((res) => {
            const userProfile = {
              displayName: data.name,
              photoURL: res.data.data.url,
            };
            updateUser(userProfile)
              .then(() => {
                const newUser = {
                  displayName: data.name,
                  email: data.email,
                  photoURL: userProfile.photoURL,
                  isPremium: false,
                };

                 axiosInstance
                  .post("/users", { ...newUser, role: "user" })
                  .then((r) => {
                    if (r.data.insertedId) {
                      setUser({ ...newUser, role: "user" });
                      toast.success("Registration Successful");
                      navigate("/");
                    }
                  });
              })
              .catch((e) => {
                console.log(e);
                 })
              .finally(() => {
                setLoading(false);
              });
          });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div className="w-full overflow-y-auto md:w-1/2 bg-[#F7F7F2] flex justify-center p-8 lg:p-16 text-[#2C3E30]">
      <div className="max-w-md w-full space-y-8">
        {/* Logo Area */}
        <div className="flex flex-col items-center">
          <div className="text-[#8FA895] mb-2">
            <Logo />
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-serif font-bold tracking-tight">
            Become a Sage
          </h1>
          <p className="text-gray-500 text-sm">
            Sign up to access your personal wisdom journal.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleRegister)}
          className="space-y-6 mt-8"
        >
          {/* Name Field */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              Your Name
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User
                  size={18}
                  className="text-gray-400 group-focus-within:text-[#8FA895]"
                />
              </div>
              <input
                type="text"
                {...register("name", { required: true })}
                placeholder="Your Name"
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8FA895]/50 focus:border-[#8FA895] transition-all text-sm placeholder-gray-400"
              />
            </div>
             {errors.name?.type === "required" && (
              <p className="text-red-500 text-xs">Name is required</p>
            )}
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              Profile Photo
            </label>
            <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-[#8FA895] transition-all">
              
              <input
                type="file"
                accept="image/*"
                 {...register("image", { required: true })}
                className="file-input file-input-ghost w-full"
              />
            </div>
             {errors?.image?.type === "required" && (
              <p className="text-red-500 text-xs">Image is required</p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail
                  size={18}
                  className="text-gray-400 group-focus-within:text-[#8FA895]"
                />
              </div>
              <input
                type="email"
                {...register("email", { required: true })}
                placeholder="your.wisdom@sage.co"
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8FA895]/50 focus:border-[#8FA895] transition-all text-sm placeholder-gray-400"
              />
            </div>
              {errors.email?.type === "required" && (
              <p className="text-red-500 text-xs">Email is required</p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock
                  size={18}
                  className="text-gray-400 group-focus-within:text-[#8FA895]"
                />
              </div>
              <input
                type={showPass ? "text" : "password"}
                 {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                })}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8FA895]/50 focus:border-[#8FA895] transition-all text-sm placeholder-gray-400"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                {showPass ? (
                  <Eye
                    onClick={() => setShowPass(false)}
                    size={18}
                    className="text-gray-400 hover:text-gray-600"
                  />
                ) : (
                  <EyeOff
                    onClick={() => setShowPass(true)}
                    size={18}
                    className="text-gray-400 hover:text-gray-600"
                  />
                )}
              </div>
            </div>
             {errors.password?.type === "required" && (
              <p className="text-red-500 text-xs">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500 text-xs">
                Password must be 6 characters or longer
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500 text-xs">
                Password must have an uppercase and lowercase character
              </p>
            )}
          </div>

          {/* Sign up Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-[#8FA895] hover:bg-[#7D9483] text-white font-medium py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg transform active:scale-[0.99]"
          >
            {loading ? "Creating User..." : " Sign up"}
          </button>
        </form>
        {/* Google Login */}
        <SocialLogin />
        {/* Footer Text */}
        <div className="text-center text-sm text-gray-500 mt-6">
          Already in Sage?{" "}
          <Link
            to="/auth/login"
            className="text-[#8FA895] font-semibold hover:underline"
          >
            Sign in
          </Link>
        </div>

        {/* Bottom Meta */}
        <div className="pt-12 border-t border-gray-200 mt-8">
          <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
            <span>App ID: sage_x8ds_irn</span>
            <span className="border border-gray-300 rounded px-2 py-0.5">
              Register
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;