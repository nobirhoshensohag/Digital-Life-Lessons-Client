import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  PenTool,
  LogOut,
  User as UserIcon,
  Settings,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { NavLink, Link } from "react-router";
import Logo from "./Logo";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const UserDropdown = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 group focus:outline-none"
      >
        <div className="relative cursor-pointer">
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="w-9 h-9 rounded-full object-cover border-2 border-[#D4DEC9] group-hover:border-[#4F6F52] transition-colors"
          />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        <ChevronDown
          size={16}
          className={`text-[#2C3E2E] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-xl border border-[#D4DEC9]/50 py-2 transform transition-all duration-200 origin-top-right z-50">
          {/* Header with User Info */}
          <div className="px-4 py-3 border-b border-dashed border-[#D4DEC9]/50">
            <p className="text-sm font-bold text-[#2C3E2E] truncate">
              {user.displayName}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              to="/dashboard"
              className="flex items-center px-4 py-2 text-sm text-[#2C3E2E]/80 hover:bg-[#F3F5F0] hover:text-[#4F6F52] transition-colors"
            >
              <LayoutDashboard size={16} className="mr-3" />
              Dashboard
            </Link>
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-sm text-[#2C3E2E]/80 hover:bg-[#F3F5F0] hover:text-[#4F6F52] transition-colors"
            >
              <UserIcon size={16} className="mr-3" />
              Profile
            </Link>
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-sm text-[#2C3E2E]/80 hover:bg-[#F3F5F0] hover:text-[#4F6F52] transition-colors"
            >
              <Settings size={16} className="mr-3" />
              Settings
            </Link>
          </div>

          {/* Footer with Logout */}
          <div className="border-t border-dashed border-[#D4DEC9]/50 pt-2 mt-1 px-2">
             <button
              onClick={handleLogout}
              className="flex w-full items-center px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut size={16} className="mr-3 " />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const { user, logoutUser } = useAuth();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#7d9483",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser()
          .then(() => {
            Swal.fire({
              title: "Signed Out!",
              text: "Your have been signed out.",
              icon: "success",
              confirmButtonColor: "#7d9483",
            });
          })
          .catch((err) => {
            toast.error(err.message);
          });
      }
    });
  };
  useEffect(() => {
   const handleScroll = () => setIsScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

   const links = (
    <>
      {" "}
      <NavLink
        to="/"
        className={({ isActive }) =>
          `text-sm font-medium text-[#2C3E2E]/80 hover:text-[#4F6F52] relative pb-1 transition-colors ${
            isActive
              ? "after:w-full after:bg-[#4F6F52] text-[#4F6F52]"
              : "after:w-0 after:bg-transparent"
          } after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:transition-all after:duration-300`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/public-lessons"
        className={({ isActive }) =>
          `text-sm font-medium text-[#2C3E2E]/80 hover:text-[#4F6F52] relative pb-1 transition-colors ${
            isActive
              ? "after:w-full after:bg-[#4F6F52] text-[#4F6F52]"
              : "after:w-0 after:bg-transparent"
          } after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:transition-all after:duration-300`
        }
      >
        Public Lessons
      </NavLink>
      {user && (
        <NavLink
          to="/add-lessons"
          className={({ isActive }) =>
            `text-sm font-medium text-[#2C3E2E]/80 hover:text-[#4F6F52] relative pb-1 transition-colors ${
              isActive
                ? "after:w-full after:bg-[#4F6F52] text-[#4F6F52]"
                : "after:w-0 after:bg-transparent"
            } after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:transition-all after:duration-300`
          }
        >
          Add Lessons
        </NavLink>
      )}
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          `text-sm font-medium text-[#2C3E2E]/80 hover:text-[#4F6F52] relative pb-1 transition-colors ${
            isActive
              ? "after:w-full after:bg-[#4F6F52] text-[#4F6F52]"
              : "after:w-0 after:bg-transparent"
          } after:absolute after:left-0 after:-bottom-0.5 after:h-[2px] after:transition-all after:duration-300`
        }
      >
        Contact
      </NavLink>
    </>
  );

  return (
          <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3 border-b border-[#D4DEC9]/30"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-0">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop Links */}
         <div className="hidden md:flex items-center space-x-8">{links}</div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            <div className="h-6 w-px bg-[#D4DEC9]"></div>

            {user ? (
              <UserDropdown user={user} handleLogout={handleLogout} />
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="btn btn-ghost btn-sm text-[#2C3E2E] hover:text-[#4F6F52] font-medium"
            
                >
                   Sign In
                </Link>
                <Link
                  to="/auth/register"
                  className="btn bg-[#2C3E2E] hover:bg-[#4F6F52] text-white border-none btn-sm px-5 rounded-full shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <PenTool className="w-4 h-4" />
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center gap-4">
            {/* Show mini avatar on mobile if logged in, optional */}
            {user && (
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D4DEC9]">
                <img
                  src={user.photoURL}
                  alt="Me"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#2C3E2E] hover:text-[#4F6F52] transition-colors focus:outline-none"
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
          

          {/* Mobile Menu */}
      <div
        className={`absolute top-full left-0 w-full bg-white border-b border-[#D4DEC9]/50 shadow-xl md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          <NavLink
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-lg font-medium py-2 border-b border-dashed border-[#D4DEC9]/50 text-[#2C3E2E]"
          >
            Home
          </NavLink>
          <NavLink
            to="/public-lessons"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-lg font-medium py-2 border-b border-dashed border-[#D4DEC9]/50 text-[#2C3E2E]"
          >
            Public Lessons
          </NavLink>
           {user && (
            <NavLink
              to="/add-lessons"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-lg font-medium py-2 border-b border-dashed border-[#D4DEC9]/50 text-[#2C3E2E]"
            >
              Add Lessons
            </NavLink>
          )}
          <NavLink
            to="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block text-lg font-medium py-2 border-b border-dashed border-[#D4DEC9]/50 text-[#2C3E2E]"
          >
            Contact
          </NavLink>

             <div className="pt-4 flex flex-col gap-3">
            {user ? (
              // Mobile State for Logged In User
              <>
                <div className="flex items-center gap-3 p-3 bg-[#F7F7F2] rounded-lg">
                  <img
                    src={user.photoURL}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-[#2C3E2E] text-sm">
                      {user.displayName}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  className="btn btn-outline border-[#D4DEC9] text-[#2C3E2E] w-full rounded-full flex gap-2"
                >
                  <LayoutDashboard size={16} /> Dashboard
                </Link>
                 <button
                  onClick={handleLogout}
                  className="btn bg-red-50 text-red-600 hover:bg-red-100 border-none w-full rounded-full flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              // Mobile State for Guest
              <>
                <Link
                  to="/auth/login"
                  className="btn btn-outline border-[#D4DEC9] text-[#2C3E2E] hover:bg-[#F3F5F0] hover:border-[#4F6F52] w-full rounded-full"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  className="btn bg-[#4F6F52] hover:bg-[#3A523C] text-white border-none w-full rounded-full shadow-md flex items-center justify-center gap-2"
                >
                  <PenTool className="w-4 h-4" /> Sign up
                </Link>
              </>
            )}
          </div>
        </div>
        </div>
    </nav>
  );
};

export default Navbar;