import React, { useState } from "react";
import {
  Mail,
  MapPin,
  ArrowRight,
  CheckCircle,
  Globe,
  MessageSquare,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Collaboration",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setIsSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "Collaboration",
        message: "",
      });
    } catch (err) {
      console.error("EmailJS Error:", err);
      alert("Failed to send message. Please try again later.");
    }

    setIsSubmitting(false);
  };

  const SUBJECT_OPTIONS = ["Collaboration", "Support", "Feedback", "Other"];

  return (
    <div className="min-h-screen w-full bg-[#F3F5F0] pt-28 pb-12 px-4 lg:px-8 flex items-center justify-center font-sans text-slate-800">
      <div className="w-full max-w-6xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
        {/* Left Panel */}
        <div className="relative w-full lg:w-[40%] bg-[#1A2F23] text-white p-10 lg:p-16 flex flex-col justify-between overflow-hidden">
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[#D4C5A8] text-xs font-medium tracking-wider uppercase">
              <MessageSquare className="w-3 h-3" />
              <span>Get in Touch</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif leading-tight">
              Start a <br />
              <span className="text-[#D4C5A8] italic">conversation.</span>
            </h1>
            <p className="text-white/70 text-base leading-relaxed max-w-sm">
              We believe in the power of shared wisdom. Whether you have a
              question or a story to tell, our door is always open.
            </p>
          </div>

          <div className="relative z-10 grid gap-6 mt-12">
            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#D4C5A8] group-hover:text-[#1A2F23] transition-all duration-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[#D4C5A8] uppercase tracking-wider font-medium">
                  Email Us
                </p>
                <p className="text-lg">hello@sage.app</p>
              </div>
            </div>

            <div className="flex items-center gap-4 group cursor-pointer">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#D4C5A8] group-hover:text-[#1A2F23] transition-all duration-300">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-[#D4C5A8] uppercase tracking-wider font-medium">
                  Visit HQ
                </p>
                <p className="text-lg">San Francisco, CA</p>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-12 flex items-center gap-2 text-white/30 text-sm">
            <Globe className="w-4 h-4" />
            <span>sage.app &copy; 2025</span>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-[60%] bg-white p-10 lg:p-16 flex flex-col justify-center">
          <AnimatePresence exitBeforeEnter>
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="max-w-lg w-full mx-auto"
              >
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-[#1A2F23] mb-2">
                    Send a Message
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Fill out the form below and we'll get back to you shortly.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Name"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[#1A2F23] focus:outline-none focus:border-[#4F6F52] focus:ring-1 focus:ring-[#4F6F52] transition-all placeholder:text-slate-400"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[#1A2F23] focus:outline-none focus:border-[#4F6F52] focus:ring-1 focus:ring-[#4F6F52] transition-all placeholder:text-slate-400"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Subject
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SUBJECT_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, subject: opt })
                          }
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                            formData.subject === opt
                              ? "bg-[#1A2F23] text-white border-[#1A2F23] shadow-md"
                              : "bg-white text-slate-600 border-slate-200 hover:border-[#4F6F52] hover:text-[#4F6F52]"
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      rows="4"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-[#1A2F23] focus:outline-none focus:border-[#4F6F52] focus:ring-1 focus:ring-[#4F6F52] transition-all placeholder:text-slate-400 resize-none"
                      required
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full cursor-pointer bg-[#4F6F52] hover:bg-[#3A523C] text-white font-medium py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col items-center justify-center text-center space-y-6 px-8"
              >
                <div className="w-20 h-20 rounded-full bg-[#E8F5E9] text-[#4F6F52] flex items-center justify-center mb-2 shadow-inner">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-serif text-[#1A2F23]">Received</h2>
                <p className="text-slate-500 max-w-xs mx-auto">
                  Thank you for reaching out, {formData.name}. We have received
                  your message and will be in touch soon.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="btn btn-ghost hover:bg-slate-50 text-[#4F6F52] normal-case"
                >
                  Send another
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Contact;