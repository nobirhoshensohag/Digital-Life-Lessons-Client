import React, { useEffect, useState } from "react";
import { Search, Filter, BookOpen } from "lucide-react";
import Loader from "../components/Shared/Loader";
import LessonCard from "../components/Shared/LessonCard";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";

const PublicLessons = () => {
   const THEME = {
    dark: "#1A2F23",
    primary: "#4F6F52",
    light: "#F3F5F0",
    accent: "#D4C5A8",
    white: "#FFFFFF",
  };

  const [lessons, setLessons] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const { user } = useAuth();
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/lessons?isPrivate=false`)
      .then((res) => {
        setLessons(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [axiosInstance]);

  useEffect(() => {
    if (!user?.email) return;
    axiosInstance.get(`/users?email=${user.email}`).then((res) => {
      setCurrentUser(res.data[0]);
    });
  }, [axiosInstance, user]);

  return (
    <div
      className="min-h-screen w-full relative py-20"
      style={{ backgroundColor: THEME.light }}
    >
      {/* --- BACKGROUND AMBIENCE --- */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 10%, ${THEME.accent}20 0%, transparent 25%),
            radial-gradient(circle at 85% 90%, ${THEME.primary}15 0%, transparent 30%)
          `,
        }}
      />

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 1. HERO SECTION */}
        <div className="text-center mb-16 space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-white shadow-md mb-4">
            <BookOpen size={24} style={{ color: THEME.primary }} />
          </div>
          <h1
            className="text-4xl md:text-6xl font-serif font-bold tracking-tight"
            style={{ color: THEME.dark }}
          >
            The Collective Wisdom
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 font-light">
            A curated library of life lessons, hard-earned truths, and moments
            of clarity shared by the community.
          </p>
        </div>

        {/* 2. SEARCH & FILTER BAR (Visual) */}
        <div
          className="max-w-4xl mx-auto mb-16 animate-fade-in-up"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="bg-white rounded-2xl shadow-xl shadow-[#1A2F23]/5 p-2 flex flex-col md:flex-row items-center gap-2 border border-gray-100">
            <div className="flex-1 flex items-center px-4 py-3 w-full">
              <Search size={20} className="text-gray-400 mr-3" />
              <input
                type="text"
                placeholder="Search for wisdom..."
                className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder:text-gray-400 font-medium"
              />
            </div>
            <div className="h-px w-full md:h-8 md:w-px bg-gray-200"></div>
            <button className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors hover:bg-gray-50 text-gray-600">
              <Filter size={18} />
              <span>Filter</span>
            </button>
            <button
              className="w-full md:w-auto px-8 py-3 rounded-xl font-bold text-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              style={{ backgroundColor: THEME.dark }}
            >
              Search
            </button>
          </div>
        </div>

        {/* 3. LESSON GRID */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader />
            <p className="mt-4 text-gray-400 font-serif italic">
              Retrieving archives...
            </p>
          </div>
        ) : lessons.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson._id}
                lesson={lesson}
                user={currentUser || { isPremium: false }} // Fallback if user not loaded yet
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 opacity-60">
            <h3 className="text-2xl font-serif text-gray-400 mb-2">
              The pages are blank.
            </h3>
            <p className="text-gray-400">Be the first to share your wisdom.</p>
          </div>
        )}
      </div>

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
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default PublicLessons;