import React from "react";
import { X, ArrowLeft, RefreshCw, ShieldAlert } from "lucide-react";
import { Link } from "react-router";

const PaymentCancelled = () => {
  const THEME = {
    dark: "#1A2F23", // Dark Forest
    primary: "#4F6F52", // Sage
    light: "#F3F5F0", // Mist
    accent: "#D4C5A8", // Gold
    white: "#FFFFFF",
    error: "#9F5F5F", // Muted Earthy Red for errors
  };

  return (
    <div
      className="min-h-screen w-full relative flex items-center justify-center font-sans p-4"
      style={{ backgroundColor: THEME.light }}
    >
      {/* --- BACKGROUND TEXTURE --- */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `url("https://www.transparenttextures.com/patterns/cream-paper.png")`,
        }}
      />

      {/* Ambient Gradient */}
      <div
        className="absolute inset-0 z-0 opacity-30"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${THEME.accent}40 0%, transparent 60%)`,
        }}
      />

      {/* --- MAIN CARD --- */}
      <div className="relative my-20 z-10 w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-10 md:p-12 text-center animate-fade-in-up border border-white/50">
        {/* Icon Circle */}
        <div
          className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center relative"
          style={{ backgroundColor: `${THEME.error}15` }} // 15% opacity red
        >
          {/* Pulsing ring effect */}
          <div
            className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ backgroundColor: THEME.error }}
          ></div>

          <X size={40} style={{ color: THEME.error }} strokeWidth={3} />
        </div>

        {/* Headlines */}
        <h1
          className="text-3xl md:text-4xl font-serif font-bold mb-4"
          style={{ color: THEME.dark }}
        >
          Payment Cancelled
        </h1>

        <p className="text-gray-500 text-lg leading-relaxed mb-10">
          The transaction process was interrupted. No charges have been made to
          your account.
        </p>

        {/* Details Box */}
        <div className="bg-[#F9FAF8] border border-gray-100 rounded-2xl p-5 mb-10 flex items-start gap-4 text-left">
          <ShieldAlert
            size={24}
            className="flex-shrink-0 mt-1"
            style={{ color: THEME.primary }}
          />
          <div>
            <h3
              className="font-bold text-sm uppercase tracking-wide mb-1"
              style={{ color: THEME.dark }}
            >
              Secure Status
            </h3>
            <p className="text-sm text-gray-500">
              Your payment data remains secure. If you encountered an error, you
              may try again.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <button
            className="w-full cursor-pointer py-4 rounded-xl font-medium text-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-2"
            style={{ backgroundColor: THEME.dark }}
          >
            <RefreshCw size={20} />
            Try Payment Again
          </button>

          <Link to="/">
            <button
              className="w-full py-4 rounded-xl font-medium transition-colors hover:bg-gray-50 flex items-center justify-center gap-2 cursor-pointer"
              style={{ color: THEME.primary }}
            >
              <ArrowLeft size={20} />
              Return to Home
            </button>
          </Link>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default PaymentCancelled;