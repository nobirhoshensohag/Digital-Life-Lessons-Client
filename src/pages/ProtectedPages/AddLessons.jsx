import React, { useState } from "react";
import {
  Feather,
  Image as ImageIcon,
  Send,
  Sparkles,
  X,
  Check,
  UploadCloud,
} from "lucide-react";
import useAxios from "../../hooks/useAxios";
import { useForm } from "react-hook-form";
import usePremium from "../../hooks/usePremium";
import { Link } from "react-router";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const AddLessons = () => {
  const axiosInstance = useAxios();
  const isPremium = usePremium();
  const { user } = useAuth();

  const { register, handleSubmit, setValue, watch, reset } = useForm();

  const THEME = {
    dark: "#1A2F23",
    primary: "#4F6F52",
    light: "#F3F5F0",
    accent: "#D4C5A8",
    white: "#FFFFFF",
  };

  const categories = [
    "Personal Growth",
    "Career",
    "Relationships",
    "Mindset",
    "Mistakes Learned",
    "Philosophy",
  ];

  const tones = [
    { label: "Motivational", emoji: "🔥" },
    { label: "Sad", emoji: "🌧️" },
    { label: "Gratitude", emoji: "🗿" },
    { label: "Realization", emoji: "✨" },
  ];

  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const title = watch("title");
  const description = watch("description");

  const handleImageChange = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_KEY}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        const imageUrl = res.data.data.url;
        setValue("image", imageUrl);
        setImagePreview(imageUrl);
      } else {
        console.error("Image upload failed:", res.data);
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  const onSubmit = async (data) => {
    try {
      await axiosInstance.post("/lessons", {
        title: data.title,
        description: data.description,
        category: data.category,
        tone: data.tone,
        isPrivate: data.isPrivate ? "true" : "false",
        isPremiumAccess: data?.isPremiumAccess ? "true" : "false", // optional chaining
        image: data.image,
        email: user?.email,
        name: user?.displayName,
        authorImage: user?.photoURL,
      });

      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        reset();
        setImagePreview(null);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col items-center justify-center py-26 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* --- BACKGROUND --- */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: THEME.light,
          backgroundImage: `
            radial-gradient(circle at 10% 20%, ${THEME.accent}30 0%, transparent 20%),
            radial-gradient(circle at 90% 80%, ${THEME.primary}20 0%, transparent 25%)
          `,
        }}
      />

      <div className="absolute inset-0 opacity-20 pointer-events-none z-0 mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>

      {/* --- MAIN CARD --- */}
      <div className="relative z-10 w-full max-w-5xl bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border border-white/50 overflow-hidden animate-slide-up">
        <div className="h-2 bg-gradient-to-r from-[#1A2F23] via-[#4F6F52] to-[#1A2F23]" />

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT SIDE */}
          <div className="lg:col-span-4 bg-[#1A2F23] text-[#F3F5F0] p-10 flex flex-col justify-between relative overflow-hidden">
            {/* decorative background */}
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#4F6F52] rounded-full blur-3xl opacity-30"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-medium uppercase text-[#D4C5A8] mb-6">
                <Feather size={12} />
                Knowledge Vault
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Share Your <br />
                <span className="text-[#D4C5A8] italic">Wisdom</span>
              </h1>

              <p className="text-white/60 text-sm">
                "Knowledge increases by sharing but not by saving."
              </p>
            </div>

            {/* steps */}
            <div className="relative z-10 mt-12 space-y-6">
              <div className="flex items-center gap-4 text-sm text-white/40">
                <div
                  className={`h-8 w-8 rounded-full border border-[#D4C5A8] flex items-center justify-center ${
                    title ? "bg-[#D4C5A8] text-[#1A2F23]" : "text-[#D4C5A8]"
                  }`}
                >
                  1
                </div>

                <div className="h-[1px] flex-1 bg-white/10" />

                <div
                  className={`h-8 w-8 rounded-full border border-[#D4C5A8] flex items-center justify-center ${
                    description
                      ? "bg-[#D4C5A8] text-[#1A2F23]"
                      : "text-[#D4C5A8]"
                  }`}
                >
                  2
                </div>

                <div className="h-[1px] flex-1 bg-white/10" />

                <div
                  className={`h-8 w-8 rounded-full border border-[#D4C5A8] flex items-center justify-center ${
                    isSubmitted
                      ? "bg-[#D4C5A8] text-[#1A2F23]"
                      : "text-[#D4C5A8]"
                  }`}
                >
                  3
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE – FORM */}
          <div className="lg:col-span-8 p-8 md:p-12">
            {isSubmitted ? (
              /* success screen */
              <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
                <div className="w-20 h-20 bg-[#4F6F52] rounded-full flex items-center justify-center text-white shadow-xl mb-2">
                  <Check size={40} strokeWidth={3} />
                </div>

                <h2 className="text-3xl font-bold text-[#1A2F23]">
                  Wisdom Recorded
                </h2>
                <p className="text-gray-500 max-w-sm">
                  Your insight has been added to the Book of Wisdom.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Title */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-[#4F6F52] uppercase mb-2 ml-1">
                      The Headline
                    </label>
                    <input
                      {...register("title", { required: true })}
                      type="text"
                      placeholder="e.g. The Quiet Power of Patience"
                      className="w-full bg-[#F3F5F0] border-2 border-transparent focus:bg-white focus:border-[#D4C5A8] rounded-2xl px-5 py-4 text-lg outline-none transition-all shadow-inner"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold text-[#4F6F52] uppercase mb-2 ml-1">
                      The Lesson
                    </label>
                    <textarea
                      {...register("description", { required: true })}
                      rows="4"
                      placeholder="What did experience teach you?"
                      className="w-full bg-[#F3F5F0] border-2 border-transparent focus:bg-white focus:border-[#D4C5A8] rounded-2xl px-5 py-4 text-base outline-none transition-all shadow-inner resize-none"
                    />
                  </div>
                </div>

                <div className="w-full h-[1px] bg-gray-100" />

                {/* CATEGORY + TONE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold text-[#4F6F52] uppercase mb-3 ml-1">
                      Category
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setValue("category", cat)}
                          className={`px-4 py-2 rounded-xl text-sm border ${
                            watch("category") === cat
                              ? "bg-[#1A2F23] text-[#D4C5A8] border-[#1A2F23]"
                              : "bg-white text-gray-500 border-gray-200 hover:border-[#4F6F52] cursor-pointer"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>

                    {/* default value */}
                    <input
                      type="hidden"
                      {...register("category")}
                      defaultValue={categories[0]}
                    />
                  </div>

                  {/* Tone */}
                  <div>
                    <label className="block text-xs font-bold text-[#4F6F52] uppercase mb-3 ml-1">
                      Emotional Tone
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {tones.map((t) => (
                        <button
                          key={t.label}
                          type="button"
                          onClick={() => setValue("tone", t.label)}
                          className={`px-3 py-2 rounded-xl text-sm border flex items-center gap-2 justify-center cursor-pointer ${
                            watch("tone") === t.label
                              ? "bg-[#1A2F23] border-[#D4C5A8] text-[#D4C5A8] "
                              : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {t.emoji} {t.label}
                        </button>
                      ))}
                    </div>

                    <input
                      type="hidden"
                      {...register("tone")}
                      defaultValue={tones[0].label}
                    />
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-xs font-bold text-[#4F6F52] uppercase mb-3 ml-1">
                    Visual Context (Optional)
                  </label>

                  {!imagePreview ? (
                    <div
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true);
                      }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        const file = e.dataTransfer.files[0];
                        handleImageChange(file);
                      }}
                      className={`relative w-full h-32 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer ${
                        isDragging
                          ? "border-[#4F6F52] bg-[#4F6F52]/5"
                          : "border-gray-200 hover:border-[#D4C5A8] hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        {...register("image")}
                        onChange={(e) => handleImageChange(e.target.files[0])}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="text-gray-400 flex flex-col items-center gap-2">
                        <UploadCloud size={24} />
                        <span className="text-sm">Drop image or click</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden group shadow-md">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview(null);
                          setValue("image", null);
                        }}
                        className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                      >
                        <X className="text-white bg-white/20 backdrop-blur-md border border-white/30 p-2 rounded-full" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Visibility */}
                <div>
                  <label className="block text-xs font-bold text-[#4F6F52] uppercase mb-3 ml-1">
                    Visibility
                  </label>
                  <label className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("isPrivate")}
                      className="w-5 h-5 accent-[#4F6F52]"
                      disabled={!isPremium}
                    />
                    <span className="text-sm text-gray-700">
                      Private — Only you can see{" "}
                      {!isPremium && (
                        <Link className="underline text-blue-500">
                          (Be a Premium Member to access this)
                        </Link>
                      )}
                    </span>
                  </label>
                </div>
                {/* Access Level */}
                <div>
                  <label className="block text-xs font-bold text-[#4F6F52] uppercase mb-3 ml-1">
                    Access Level
                  </label>
                  <label className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("isPremiumAccess")}
                      className="w-5 h-5 accent-[#4F6F52]"
                      disabled={!isPremium}
                    />

                    <span className="text-sm text-gray-700">
                      Premium Content{" "}
                      {!isPremium && (
                        <Link className="underline text-blue-500">
                          (Be a Premium Member to access this)
                        </Link>
                      )}
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="group relative w-full rounded-2xl bg-[#1A2F23] py-4 text-white shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className="relative z-10 flex justify-center gap-2 text-lg cursor-pointer items-center">
                      Publish <Send size={18} />
                    </div>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* animations */}
      <style jsx>{`
        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease forwards;
        }
        @keyframes fade-in {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default AddLessons;