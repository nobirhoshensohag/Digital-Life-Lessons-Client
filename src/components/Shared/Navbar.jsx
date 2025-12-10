import React, { useState, useEffect } from "react";
import { Menu, X, Feather, User, Search, PenTool } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm py-3 border-b border-[#D4DEC9]/30"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* --- LOGO AREA --- */}
            <div className="flex items-center gap-2 cursor-pointer group">
              <div
                className={`p-2 rounded-lg transition-colors ${
                  isScrolled ? "bg-[#F3F5F0]" : "bg-white"
                }`}
              >
                <Feather className="w-6 h-6 text-[#4F6F52]" />
              </div>
              <span className="text-2xl font-bold font-serif tracking-tight text-[#2C3E2E] group-hover:text-[#4F6F52] transition-colors">
                Sage.
              </span>
            </div>

            {/* --- DESKTOP NAVIGATION --- */}
            <div className="hidden md:flex items-center space-x-8">
              {["Explore", "Journal", "Mentors", "Philosophy"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-[#2C3E2E]/80 hover:text-[#4F6F52] transition-colors relative group"
                >
                  {item}
                  {/* Hover Underline Animation */}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4F6F52] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/*  PC view */}
            <div className="hidden md:flex items-center gap-4">
              <div className="h-6 w-px bg-[#D4DEC9]"></div>

              <button className="btn btn-ghost btn-sm text-[#2C3E2E] hover:text-[#4F6F52] normal-case font-medium">
                Sign In
              </button>

              <button className="btn bg-[#2C3E2E] hover:bg-[#4F6F52] text-white border-none btn-sm px-5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2">
                <PenTool className="w-4 h-4" />
                Write Lesson
              </button>
            </div>

            {/* --- MOBILE HAMBURGER --- */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-[#2C3E2E] hover:text-[#4F6F52] transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* --- MOBILE MENU (Slide Down) --- */}
        <div
          className={`absolute top-full left-0 w-full bg-white border-b border-[#D4DEC9]/50 shadow-xl md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-6 py-6 space-y-4">
            {["Explore", "Journal", "Mentors", "Philosophy"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-lg font-medium text-[#2C3E2E] hover:text-[#4F6F52] py-2 border-b border-dashed border-[#D4DEC9]/50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <button className="btn btn-outline border-[#D4DEC9] text-[#2C3E2E] hover:bg-[#F3F5F0] hover:border-[#4F6F52] w-full rounded-full normal-case">
                Sign In
              </button>
              <button className="btn bg-[#4F6F52] hover:bg-[#3A523C] text-white border-none w-full rounded-full shadow-md flex items-center justify-center gap-2 normal-case">
                <PenTool className="w-4 h-4" />
                Write a Lesson
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;