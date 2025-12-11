import React from "react";
import { Clock, ExternalLink, Lock, Sparkles, User, Crown } from "lucide-react";
import { Link } from "react-router";

const COLORS = {
  darkGreen: "#1A2F23",
  sage: "#4F6F52",
  mist: "#F3F5F0",
  gold: "#D4C5A8",
  white: "#FFFFFF",
};

const LessonCard = ({ lesson, user }) => {
  const isLessonPremium =
    lesson?.isPremium === true ||
    lesson?.isPremium === "true" ||
    lesson?.isPremiumAccess === true ||
    lesson?.isPremiumAccess === "true";

  const isUserPremium = user?.isPremium === true;

  const isLocked = isLessonPremium && !isUserPremium;

  return (
    <div
      className={`relative w-full max-w-md mx-auto bg-white rounded-[2rem] overflow-hidden border transition-all duration-300 group ${
        isLocked
          ? "border-gray-200"
          : `border-gray-100 hover:shadow-2xl hover:-translate-y-1`
      }`}
      style={{
        boxShadow: isLocked
          ? "none"
          : "0 25px 50px -12px rgba(26, 47, 35, 0.1)",
      }}
    >
      {/* ====================
          PREMIUM LOCK SCREEN
      ===================== */}
      {isLocked && (
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center backdrop-blur-md"
          style={{ backgroundColor: `${COLORS.darkGreen}CC` }}
        >
          <div
            className="p-4 rounded-full mb-4 shadow-lg"
            style={{ backgroundColor: COLORS.sage }}
          >
            <Lock size={32} color={COLORS.gold} />
          </div>

          <h3 className="text-2xl font-serif font-bold mb-2 text-white">
            Premium Lesson
          </h3>

          <p className="text-white/80 mb-6 max-w-xs">
            This lesson is exclusive for premium members. Upgrade to unlock.
          </p>

          <button
            className="px-6 py-3 rounded-xl text-sm font-bold uppercase shadow-lg"
            style={{ backgroundColor: COLORS.gold, color: COLORS.darkGreen }}
          >
            Upgrade to View
          </button>
        </div>
      )}

      {/* ====================
          MAIN CONTENT
      ===================== */}
      <div
        className={`p-6 md:p-8 h-full flex flex-col ${
          isLocked
            ? "filter blur-sm grayscale opacity-70 pointer-events-none select-none"
            : ""
        }`}
      >
        {/* Header - Category & Date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
              style={{ backgroundColor: COLORS.mist, color: COLORS.sage }}
            >
              <Sparkles size={12} /> {lesson.category}
            </span>
          </div>

          {/* Access Badge */}
          {lesson.isPremium ? (
            <span
              className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-lg"
              style={{ color: COLORS.darkGreen, backgroundColor: COLORS.gold }}
            >
              <Crown size={12} /> Premium
            </span>
          ) : (
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider px-2 py-1 bg-gray-100 rounded-lg">
              Free
            </span>
          )}
        </div>

        {/* Title & Description */}
        <div className="mb-6 flex-grow">
          <h2
            className="text-2xl font-serif font-bold leading-tight mb-3"
            style={{ color: COLORS.darkGreen }}
          >
            {lesson.title}
          </h2>

          <p className="text-gray-600 leading-relaxed line-clamp-3">
            {lesson.description}
          </p>
        </div>

        {/* Tone */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 bg-gray-50 font-medium">
            {lesson.toneEmoji} {lesson.tone}
          </span>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-gray-100 xl:flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-full overflow-hidden border-2"
              style={{ borderColor: COLORS.gold }}
            >
              {lesson.authorImage ? (
                <img
                  src={lesson.authorImage}
                  alt={lesson.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <User size={20} />
                </div>
              )}
            </div>

            <div>
              <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
                Posted By
              </p>
              <p
                className="text-sm font-bold"
                style={{ color: COLORS.darkGreen }}
              >
                {lesson.name}
              </p>
              <span className="text-gray-400 text-xs flex items-center gap-1">
                <Clock size={12} /> {new Date(lesson.postedAt).toDateString()}
              </span>
            </div>
          </div>

          <Link
            to={`/lesson-details/${lesson._id}`}
            className="flex items-center cursor-pointer gap-2 px-4 py-3 mt-3 xl:mt-0 rounded-xl font-medium transition-all hover:gap-3 hover:shadow-md active:scale-95"
            style={{ backgroundColor: COLORS.mist, color: COLORS.darkGreen }}
          >
            <span>See Details</span>
            <ExternalLink size={18} style={{ color: COLORS.sage }} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;