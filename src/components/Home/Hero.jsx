import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronLeft,
  BookOpen,
  Star,
  Share2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router";

const slides = [
  {
    id: 1,
    tagline: "Capture Your Journey",
    headline: "Preserve Your Life's Greatest Lessons",
    description:
      "Don't let wisdom fade. Sage is your secure vault for storing personal growth insights, meaningful moments, and the philosophy that guides you.",
    cta: "Start Your Journal",
    image:
      "https://images.unsplash.com/photo-1527856263669-12c3a0af2aa6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    icon: <BookOpen className="w-6 h-6" />,
  },
  {
    id: 2,
    tagline: "Curated Wisdom",
    headline: "Discover Perspectives That Resonate",
    description:
      "Browse a public library of life lessons shared by others. Mark your favorites, organize by theme, and accelerate your personal growth through shared experience.",
    cta: "Explore Library",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2500&auto=format&fit=crop",
    icon: <Star className="w-6 h-6" />,
  },
  {
    id: 3,
    tagline: "Leave a Legacy",
    headline: "Share Your Insight with the World",
    description:
      "Turn your experiences into guidance for others. Publish your most profound realizations and track how many lives your wisdom touches.",
    cta: "Share a Lesson",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2500&auto=format&fit=crop",
    icon: <Share2 className="w-6 h-6" />,
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full overflow-hidden font-sans text-slate-800">
      {/* Decorative Background Blob */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#D4DEC9] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8E6D9] rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 py-12 lg:py-24 relative z-10 min-h-[650px] flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full mt-12 lg:mt-0">
          {" "}
          {/* --- Left: Carousel Mobile--- */}
          <div
            className="relative h-[200px] lg:hidden w-full"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Image Frame */}
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                    index === currentSlide
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.headline}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlay for text readability if needed, or just style */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E2E]/60 to-transparent opacity-40"></div>
                </div>
              ))}

              {/* Floating Glass Card (Social Proof/Stats) */}
              <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-lg max-w-[200px] hidden md:block animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="avatar-group -space-x-3 rtl:space-x-reverse">
                    <div className="avatar border-none">
                      <div className="w-8">
                        <img src="https://i.pravatar.cc/100?img=1" />
                      </div>
                    </div>
                    <div className="avatar border-none">
                      <div className="w-8">
                        <img src="https://i.pravatar.cc/100?img=2" />
                      </div>
                    </div>
                    <div className="avatar border-none placeholder">
                      <div className="w-8 bg-[#4F6F52] text-neutral-content text-xs">
                        <span>+99</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-white font-medium">
                    Join 10k+ Sages sharing wisdom.
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons (Floating) */}
            <div className="absolute bottom-6 left-6 flex gap-2">
              <button
                onClick={prevSlide}
                className="btn btn-circle btn-sm bg-white/20 hover:bg-white/40 border-none text-white backdrop-blur-sm"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="btn btn-circle btn-sm bg-white/20 hover:bg-white/40 border-none text-white backdrop-blur-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          {/* --- LEFT: Text Content  --- */}
          <div className="space-y-8">
            {slides.map(
              (slide, index) =>
                index === currentSlide && (
                  <div key={slide.id} className="animate-fade-in-up space-y-6">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#D4DEC9] shadow-sm text-[#4F6F52] text-sm font-medium">
                      {slide.icon}
                      <span>{slide.tagline}</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-[#2C3E2E]">
                      {slide.headline}
                    </h1>

                    {/* Description */}
                    <p className="text-lg text-slate-600 leading-relaxed max-w-lg">
                      {slide.description}
                    </p>

                    {/* CTA Buttons using DaisyUI */}
                    <div className="flex flex-wrap gap-4 pt-2">
                        <Link
                        to={
                          slide.cta === "Explore Library"
                            ? "/public-lessons"
                            : "/add-lesson"
                        }
                        className="btn bg-[#4F6F52] hover:bg-[#3A523C] text-white border-none px-8 h-12 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                      >
                        {slide.cta}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      <button className="btn btn-ghost hover:bg-[#D4DEC9] hover:bg-opacity-30 text-[#4F6F52] h-12 px-6 rounded-full">
                        How it works
                      </button>
                    </div>
                  </div>
                )
            )}

            {/* Custom Carousel Indicators */}
            <div className="flex items-center gap-4 pt-8">
              <div className="flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentSlide(idx);
                      setIsAutoPlaying(false);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx
                        ? "w-8 bg-[#4F6F52]"
                        : "w-2 bg-[#D4DEC9]"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>{" "}
          {/* --- Right: Carousel PC --- */}
          <div
            className="relative h-[400px] lg:h-[550px] w-full"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Image Frame */}
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50">
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
                    index === currentSlide
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-105"
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.headline}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlay for text readability if needed, or just style */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E2E]/60 to-transparent opacity-40"></div>
                </div>
              ))}

              {/* Floating Glass Card (Social Proof/Stats) */}
              <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl shadow-lg max-w-[200px] hidden md:block animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="avatar-group -space-x-3 rtl:space-x-reverse">
                    <div className="avatar border-none">
                      <div className="w-8">
                        <img src="https://i.pravatar.cc/100?img=1" />
                      </div>
                    </div>
                    <div className="avatar border-none">
                      <div className="w-8">
                        <img src="https://i.pravatar.cc/100?img=2" />
                      </div>
                    </div>
                    <div className="avatar border-none placeholder">
                      <div className="w-8 bg-[#4F6F52] text-neutral-content text-xs">
                        <span>+99</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-white font-medium">
                    Join 10k+ Sages sharing wisdom.
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons (Floating) */}
            <div className="absolute bottom-6 left-6 flex gap-2">
              <button
                onClick={prevSlide}
                className="btn btn-circle btn-sm bg-white/20 hover:bg-white/40 border-none text-white backdrop-blur-sm"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="btn btn-circle btn-sm bg-white/20 hover:bg-white/40 border-none text-white backdrop-blur-sm"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animation textfade*/}
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
          animation: fade-in-up 0.6s ease-out forwards;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;