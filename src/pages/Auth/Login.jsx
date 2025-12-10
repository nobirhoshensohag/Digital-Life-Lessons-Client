import React, { useState } from "react";
import { Feather, Mail, Lock, EyeOff, ArrowRight, Eye } from "lucide-react";
import { Link, useLocation, useNavigate  } from "react-router";
import Logo from "../../components/Shared/Logo";
import SocialLogin from "../../components/Shared/SocialLogin";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleLogin = (data) => {
    loginUser(data.email, data.password)
      .then(() => {
        toast.success("Sign in successful");
        navigate(location?.state || "/");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div className="w-full md:w-1/2 bg-[#F7F7F2] flex justify-center p-8 lg:p-16 text-[#2C3E30] overflow-y-scroll">
      <div className="max-w-md w-full space-y-8">
        {/* Logo Area */}
        <div className="flex flex-col items-center">
          <Logo />
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-serif font-bold tracking-tight">
            Welcome Back, Sage.
          </h1>
          <p className="text-gray-500 text-sm">
            Sign in to access your personal wisdom journal.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6 mt-8">
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
            {errors?.email?.type === "required" && (
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
             {errors?.password?.type === "required" && (
              <p className="text-red-500 text-xs">Password is required</p>
            )}
            {errors?.password?.type === "minLength" && (
              <p className="text-red-500 text-xs">Password didn't match</p>
            )}
            {errors?.password?.type === "pattern" && (
              <p className="text-red-500 text-xs">Password didn't match</p>
            )}
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <a
              href="#"
              className="text-xs text-gray-500 hover:text-[#8FA895] transition-colors"
            >
              Forgot Password?
            </a>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-[#8FA895] hover:bg-[#7D9483] text-white font-medium py-3.5 rounded-full transition-all duration-200 shadow-md hover:shadow-lg transform active:scale-[0.99] cursor-pointer"
          >
            Sign In
          </button>
        </form>
        <SocialLogin />
        {/* Footer Text */}
        <div className="text-center text-sm text-gray-500 mt-6">
          New to Sage?{" "}
          <Link
            to="/auth/register"
            className="text-[#8FA895] font-semibold hover:underline"
          >
            Create an account
          </Link>
        </div>

        {/* Bottom Meta (Mimicking the image small text) */}
        <div className="pt-12 border-t border-gray-200 mt-8">
          <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
            <span>App ID: sage_x8ds_irn</span>
            <span className="border border-gray-300 rounded px-2 py-0.5">
              Login
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;