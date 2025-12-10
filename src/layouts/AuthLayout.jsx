import React from "react";
import { Outlet } from "react-router";
import { Feather, Mail, Lock, EyeOff, ArrowRight } from "lucide-react";

import Logo2 from "../components/Shared/Logo2";

const AuthLayout = () => {
  return (
    <div className="h-screen w-full flex flex-col md:flex-row">
      <Outlet />

      <div className="hidden md:flex w-1/2 bg-gray-900 relative overflow-hidden">
        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=2574&auto=format&fit=crop"
          alt="Dark coastal ocean"
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        {/* Content Container */}
        <div className="relative z-10 flex flex-col justify-between p-16 h-full w-full text-white">
          {/* Top Logo */}
          <div className="opacity-90">
            <Logo2 />
          </div>

          {/* Center/Bottom Text */}
          <div className="space-y-6 mb-12">
            <h2 className="text-5xl font-serif font-bold leading-tight">
              Unlock Your <br /> Inner Archive.
            </h2>
            <p className="text-gray-300 text-lg max-w-md font-light leading-relaxed">
              Sage helps you curate a lifetime of knowledge. Your wisdom,
              organized and shared.
            </p>

            <button className="group cursor-pointer mt-4 px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/10 rounded-full text-white text-sm font-medium transition-all flex items-center gap-2">
              Learn More
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

          {/* Bottom Footer Area */}
          <div className="pt-8 border-t border-white/20">
            <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
              <span>App ID: spp_id_60e_set</span>
              <span className="border border-white/20 rounded px-2 py-0.5">
                v2.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;