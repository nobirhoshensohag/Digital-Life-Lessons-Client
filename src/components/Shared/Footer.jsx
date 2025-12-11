import React from "react";
import {
  Feather,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Globe,
} from "lucide-react";
import Logo from "./Logo";

const FooterLink = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-400 hover:text-[#D4C5A8] transition-colors text-sm font-light"
  >
    {children}
  </a>
);

const SocialIcon = ({ Icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-white hover:bg-[#4F6F52] transition-all duration-300 border border-gray-700 hover:border-[#4F6F52]"
  >
    <Icon size={16} />
  </a>
);

const Footer = () => {
  const COLORS = {
    darkGreen: "#1A2F23",
    sage: "#4F6F52",
    mist: "#F3F5F0",
    gold: "#D4C5A8",
  };

  return (
    <footer
      className="w-full text-white font-sans pt-16 pb-8 border-t border-gray-800"
      style={{ backgroundColor: COLORS.darkGreen }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 border-b border-gray-800 pb-12">
          {/* 1. Brand Identity */}
          <div className="col-span-2 md:col-span-2 space-y-4 pr-8">
            <Logo />

            <p className="text-gray-400 text-sm max-w-sm font-light leading-relaxed">
              A repository of curated knowledge and profound insights, designed
              for the modern contemplative.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <SocialIcon Icon={Linkedin} href="#" />
              <SocialIcon Icon={Twitter} href="#" />
              <SocialIcon Icon={Instagram} href="#" />
            </div>
          </div>

          {/* 2. Resources */}
          <div className="space-y-4">
            <h4
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: COLORS.gold }}
            >
              Resources
            </h4>
            <div className="flex flex-col space-y-3">
              <FooterLink href="#">Knowledge Base</FooterLink>
              <FooterLink href="#">Community Forum</FooterLink>
              <FooterLink href="#">Developer Docs</FooterLink>
              <FooterLink href="#">Case Studies</FooterLink>
            </div>
          </div>

          {/* 3. Company */}
          <div className="space-y-4">
            <h4
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: COLORS.gold }}
            >
              Company
            </h4>
            <div className="flex flex-col space-y-3">
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Careers</FooterLink>
              <FooterLink href="#">Press</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
            </div>
          </div>

          {/* 4. Legal */}
          <div className="space-y-4">
            <h4
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: COLORS.gold }}
            >
              Legal
            </h4>
            <div className="flex flex-col space-y-3">
              <FooterLink href="#">Terms of Service</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Cookie Settings</FooterLink>
            </div>
          </div>
        </div>

        {/* --- Copyright Bar --- */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-xs tracking-wide">
          <p className="order-2 md:order-1 mt-4 md:mt-0">
            &copy; {new Date().getFullYear()} Sage, Inc. All rights reserved.
          </p>
          <div className="order-1 md:order-2 flex items-center space-x-2 text-gray-400">
            <Globe size={12} />
            <span className="uppercase">Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;