import React from "react";
import { Target, Eye, Shield, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const BenefitCard = ({ title, description, Icon }) => {
  const COLORS = {
    darkGreen: "#1A2F23",
    sage: "#4F6F52",
    gold: "#D4C5A8",
  };

  return (
    <div className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-out border border-transparent hover:border-[#D4C5A8] flex flex-col space-y-4 h-full">
      {/* Icon Block */}
      <div
        className="w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-500"
        style={{ backgroundColor: COLORS.sage, color: COLORS.darkGreen }}
      >
        <Icon
          size={24}
          className="text-white group-hover:text-[#D4C5A8] transition-colors"
        />
      </div>

      {/* Content */}
      <h3
        className="text-xl font-semibold mt-2 group-hover:text-[#4F6F52] transition-colors"
        style={{ color: COLORS.darkGreen }}
      >
        {title}
      </h3>

      <p className="text-gray-600 text-base flex-grow">{description}</p>

      {/* Read More Link (Subtle interaction) */}
      <Link
        to="/public-lessons"
        className="flex items-center text-sm font-medium pt-2 transition-all group-hover:translate-x-1"
        style={{ color: COLORS.sage }}
      >
        Explore Insight
        <ArrowRight size={16} className="ml-2" />
      </Link>
    </div>
  );
};

const LearningFromLifeSection = () => {
  const COLORS = {
    darkGreen: "#1A2F23",
    sage: "#4F6F52",
    mist: "#F3F5F0",
    gold: "#D4C5A8",
  };

  const benefits = [
    {
      title: "Deepened Self-Awareness",
      description:
        "By reflecting on your history, you uncover core motivations, fears, and strengths, leading to a clearer sense of purpose.",
      Icon: Eye,
    },
    {
      title: "Enhanced Decision Quality",
      description:
        "Past experiences provide a robust framework, allowing you to recognize patterns and make forward-looking choices with greater certainty.",
      Icon: Target,
    },
    {
      title: "Resilience and Fortitude",
      description:
        "Recalling how you navigated previous challenges builds mental toughness, transforming setbacks into evidence of your capability.",
      Icon: Shield,
    },
    {
      title: "Meaningful Connection",
      description:
        "Understanding your own journey enables authentic empathy, fostering deeper, more supportive relationships with others.",
      Icon: Users,
    },
  ];

  return (
    <section
      className="w-full py-24 px-4 lg:px-0"
      style={{ backgroundColor: COLORS.mist }}
    >
      <div className="max-w-[1440px] mx-auto">
        {/* --- HEADER: Context and Thesis --- */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{ backgroundColor: COLORS.sage, color: COLORS.mist }}
          >
            Core Philosophy
          </span>

          <h2
            className="text-4xl sm:text-5xl font-bold leading-tight"
            style={{ color: COLORS.darkGreen }}
          >
            Why Learning From Life{" "}
            <span className="italic" style={{ color: COLORS.sage }}>
              Matters.
            </span>
          </h2>

          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Your life is the richest textbook. We provide the tools to
            systematically extract wisdom, not just memories.
          </p>
        </div>

        {/* --- CARDS: The Four Benefits Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <BenefitCard
              key={index}
              title={benefit.title}
              description={benefit.description}
              Icon={benefit.Icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningFromLifeSection;