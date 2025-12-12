import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";
import {
  ArrowLeft,
  Quote,
  User,
  Lock,
  Bookmark,
  Share2,
  MessageCircle,
  Eye,
  Clock3,
} from "lucide-react";
import Loader from "../components/Shared/Loader";
import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import ShareButton from "../components/Shared/ShareButton";

const LessonDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const THEME = {
    dark: "#1A2F23",
    primary: "#4F6F52",
    light: "#F3F5F0",
    accent: "#D4C5A8",
    white: "#FFFFFF",
  };

  const [lesson, setLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [likeId, setLikeId] = useState("");
  const [likes, setLikes] = useState(lesson?.likes);
  const [favorites, setFavorites] = useState(lesson?.favorites);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState("");
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {}, []);
  const handleLikeAdd = () => {
    if (!user) return toast.error("You must be logged in");

    const likedInfo = {
      postId: lesson._id,
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
      posterName: lesson.name,
      posterEmail: lesson.email,
      posterImage: lesson.authorImage,
      postImage: lesson.image,
    };
    axiosInstance.post("/likes", likedInfo).then((res) => {
      if (res.data.result.insertedId) {
        setIsLiked(true);
        axiosInstance.get(`/lessons/${lesson._id}`).then((res) => {
          setLikes(res.data.likes);
          toast.success("Liked!");
        });
      }
      });
  };

  const handleLikeDelete = () => {
    axiosInstance.delete(`/likes/${likeId}`).then((res) => {
      setIsLiked(false);
      axiosInstance.get(`/lessons/${lesson._id}`).then((res) => {
        setLikes(res.data.likes);
        toast.success("Removed from likes");
      });
    });
  };

  const handleFavoriteAdd = () => {
    if (!user) return toast.error("You must be logged in");

    const favoriteInfo = {
      postId: lesson._id,
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
      posterName: lesson.name,
      posterEmail: lesson.email,
      posterImage: lesson.authorImage,
      postImage: lesson.image,
    };
    axiosInstance.post("/favorites", favoriteInfo).then((res) => {
      if (res.data.result.insertedId) {
        setIsFavorite(true);
         axiosInstance.get(`/lessons/${lesson._id}`).then((res) => {
          setFavorites(res.data.favorites);
          toast.success("Added to favorites!");
        });
      }
     });
  };
  const handleFavoriteDelete = () => {
    axiosInstance.delete(`/favorites/${favoriteId}`).then((res) => {
      setIsFavorite(false);
      axiosInstance.get(`/lessons/${lesson._id}`).then((res) => {
        setFavorites(res.data.favorites);
        toast.success("Removed from favorites");
      });
    });
  };

  useEffect(() => {
    axiosInstance
      .get(`/lessons/${id}`)
      .then((res) => {
        setLesson(res.data);
        setComments(res.data.comments || []);
        setLoading(false);
        setLikes(res.data.likes);
        setFavorites(res.data.favorites);
      })
      .catch(() => setLoading(false));
  }, [axiosInstance, id]);
  useEffect(() => {
     if (!user?.email || !lesson?.email) return;

    axiosInstance
      .get(`/lessons?email=${lesson.email}`)
      .then((res) => {
        setLessons(res.data.result);
        setLoading(false);
      })
      .catch(() => setLoading(false));
   }, [id, lesson, axiosInstance, user]);;

  useEffect(() => {
    
    if (!user?.email) return;
     axiosInstance.get(`/likes?email=${user.email}`).then((res) => {
      const exists = res.data.find((item) => item.postId === id);
      if (exists) {
        setIsLiked(true);
        setLikeId(exists._id);
      } else {
        setIsLiked(false);
      }
    });
  }, [axiosInstance, id, user]);
  useEffect(() => {
      if (!user?.email) return;
    axiosInstance.get(`/favorites?email=${user.email}`).then((res) => {
      const exists = res.data.find((item) => item.postId === id);
      if (exists) {
        setIsFavorite(true);
        setFavoriteId(exists._id);
      } else {
        setIsFavorite(false);
      }
    });
  }, [axiosInstance, id, user]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  if (!lesson) return <div>Lesson not found</div>;

  const isLessonPremium =
    lesson?.isPremiumAccess === true || lesson?.isPremiumAccess === "true";
  const isUserPremium = user?.isPremium === true;
  const isAuthor = user?.email === lesson?.email;
  const isLocked = isLessonPremium && !isUserPremium && !isAuthor;

  const isPrivate = lesson?.isPrivate === true || lesson?.isPrivate === "true";
  const lastUpdated = lesson?.updatedAt
    ? new Date(lesson.updatedAt)
    : new Date(lesson.postedAt);

  const handlePostComment = () => {
    if (!newComment.trim()) return;

    const commentObj = {
      commenter: user?.displayName || "Anonymous",
      commenterEmail: user?.email || "Anonymous",
      commenterImage: user?.photoURL,
      text: newComment,
    };

    setComments([commentObj, ...comments]);
    setNewComment("");

    axiosInstance
      .patch(`/lessons/${id}`, commentObj)
      .then((res) => {
        if (res.data.modifiedCount) {
          toast.success("Comment Posted!");
        }
      })
      .catch((err) => {
        console.error("Error posting comment:", err);
      });
  };

  return (
    <div
      className="min-h-screen w-full py-20 relative  selection:bg-[#D4C5A8] selection:text-[#1A2F23]"
      style={{ backgroundColor: THEME.light }}
    >
      {/* BACKGROUND TEXTURE */}
      <div className="absolute inset-0 z-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none"></div>

      {/* NAVIGATION */}
      <nav className="relative z-20 max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
        <Link
          to="/public-lessons"
          className="flex items-center gap-2 text-gray-500 hover:text-[#1A2F23] transition-colors group"
        >
          <div className="p-2 rounded-full bg-white group-hover:bg-[#D4C5A8] transition-colors">
            <ArrowLeft size={18} />
          </div>
          <span className="font-medium">Back to Library</span>
        </Link>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
        {/* LEFT SECTION */}
        <article className="animate-fade-in-up">
          {/* HEADER */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-4 flex-wrap text-sm font-bold tracking-wider uppercase">
              <span className="text-[#4F6F52]">{lesson.category}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <div className="flex items-center gap-1 text-gray-500">
                <Eye size={14} />
                {isPrivate ? "Private" : "Public"}
              </div>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <div className="flex items-center gap-1 text-gray-500">
                <Clock3 size={14} />
                Last Updated: {lastUpdated.toDateString()}
              </div>
            </div>

            {/* TITLE */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl  font-bold text-[#1A2F23] leading-tight">
              {lesson.title}
            </h1>

            {/* AUTHOR SECTION */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-8 pt-4">
              <div className="flex items-center gap-3">
                <img
                  src={lesson.authorImage}
                  alt={lesson.name}
                  className="w-10 h-10 rounded-full object-cover border border-gray-200"
                />
                <div>
                  <p className="text-sm font-bold text-[#1A2F23]">
                    {lesson.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(lesson.postedAt).toDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* Likes */}

                {isLiked ? (
                  <button
                    onClick={handleLikeDelete}
                    className="cursor-pointer flex items-center gap-2 bg-white/10 hover:bg-[#4F6F52]/20 transition-colors rounded-full px-3 py-1 shadow-inner"
                  >
                    {" "}
                    <BsFillHandThumbsUpFill
                      size={20}
                      className="text-[#4F6F52]"
                    />
                    <span className="text-sm text-[#4F6F52] font-semibold">
                       {likes}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={handleLikeAdd}
                    className="cursor-pointer flex items-center gap-2 bg-white/10 hover:bg-[#4F6F52]/20 transition-colors rounded-full px-3 py-1 shadow-inner"
                  >
                    <BsHandThumbsUp size={20} className="text-[#4F6F52]" />
                    <span className="text-sm text-[#4F6F52] font-semibold">
                      {likes}
                    </span>
                  </button>
                )}

                {/* Favorites */}
                 {isFavorite ? (
                  <button
                    onClick={handleFavoriteDelete}
                    className="flex cursor-pointer items-center gap-2 bg-white/10 hover:bg-red-500/30 transition-colors rounded-full px-3 py-1 shadow-inner"
                  >
                    <FaHeart size={20} className="text-red-500" />
                    <span className="text-sm text-red-500 font-semibold">
                      {favorites}
                    </span>
                  </button>
                ) : (
                  <button
                    onClick={handleFavoriteAdd}
                    className="flex cursor-pointer items-center gap-2 bg-white/10 hover:bg-red-500/30 transition-colors rounded-full px-3 py-1 shadow-inner"
                  >
                    <FaRegHeart size={20} className="text-red-500" />
                    <span className="text-sm text-red-500 font-semibold">
                      {favorites}
                    </span>
                  </button>
                )}
                {/* Share */}
                <div className="flex flex-col items-center">
                  <ShareButton />
                </div>
              </div>
            </div>
          </div>

          {/* IMAGE */}
          {lesson.image && (
            <div className="mb-10 rounded-2xl overflow-hidden shadow-xl shadow-[#1A2F23]/10">
              <img
                src={lesson.image}
                alt={lesson.title}
                className="w-full h-auto object-cover max-h-[500px]"
              />
            </div>
          )}

          {/* CONTENT */}
          <div className="relative">
            {/* TONE BOX */}
            <div className="mb-10 p-6 bg-white border-l-4 border-[#D4C5A8] rounded-r-xl shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-[#D4C5A8]">
                <Quote size={20} />
                <span className="text-xs font-bold uppercase tracking-widest">
                  Lesson Tone
                </span>
              </div>
              <p className="text-xl  text-[#1A2F23] italic">{lesson.tone}</p>
            </div>

            {/* MAIN DESCRIPTION */}
            <div
              className={`prose prose-lg max-w-none prose-headings:text-[#1A2F23] prose-p:text-gray-600 ${
                isLocked
                  ? "blur-md select-none opacity-50 h-[300px] overflow-hidden"
                  : ""
              }`}
            >
              {lesson.description.split("\n").map((p, i) => (
                <p key={i} className="mb-6">
                  {p}
                </p>
              ))}
            </div>

            {/* PREMIUM LOCK OVERLAY */}
            {isLocked && (
              <div className="absolute inset-0 z-10 flex flex-col items-center pt-20 bg-gradient-to-b from-transparent via-[#F3F5F0]/80 to-[#F3F5F0]">
                <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md border border-[#D4C5A8]/30">
                  <div className="w-16 h-16 bg-[#1A2F23] rounded-full flex items-center justify-center mx-auto mb-4 text-[#D4C5A8] shadow-lg">
                    <Lock size={32} />
                  </div>
                  <h3 className="text-2xl  font-bold text-[#1A2F23] mb-2">
                    Premium Content
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Unlock this premium wisdom by upgrading your membership.
                  </p>
                  <button className="w-full py-3 bg-[#D4C5A8] hover:bg-[#c3b290] text-[#1A2F23] font-bold rounded-xl transition-colors shadow-md">
                    Upgrade Membership
                  </button>
                </div>
              </div>
            )}
          </div>
        </article>

        {/* SIDEBAR */}
        <aside className="hidden lg:block space-y-8">
          {/* AUTHOR CARD */}
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full p-1 border-2 border-[#D4C5A8] mb-4">
                <img
                  src={lesson.authorImage}
                  className="w-full h-full rounded-full object-cover"
                  alt=""
                />
              </div>
              <h3 className="text-xl  font-bold text-[#1A2F23]">
                {lesson.name}
              </h3>
              <p className="text-xs text-[#4F6F52] font-bold uppercase tracking-widest mb-4">
                Lesson Author
              </p>
              <p className="w-full py-3 border border-[#1A2F23] text-[#1A2F23] rounded-xl hover:bg-[#1A2F23] hover:text-white transition-all flex items-center justify-center gap-2 font-bold">
                Total Lessons : {lessons.length}
              </p>
            </div>
          </div>

          {/* COMMENTS SECTION */}
          <div className="bg-[#1A2F23] p-6 rounded-[2rem] text-white text-center relative overflow-hidden">
            <h4 className=" text-xl font-bold mb-4 flex items-center justify-center gap-2">
              <MessageCircle size={18} /> Comments ({comments.length})
            </h4>

            {/* ADD COMMENT INPUT */}
            <div className="flex gap-2 mt-2">
              {user && (
                <>
                  {" "}
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    className="flex-1 border border-white/50 rounded-xl px-4 py-2 focus:outline-none focus:ring focus:ring-[#D4C5A8] bg-white/10 text-white"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handlePostComment()}
                  />
                  <button
                    className="px-4 py-2 bg-[#D4C5A8] text-[#1A2F23] font-bold rounded-xl hover:bg-[#c3b290] transition-colors"
                    onClick={handlePostComment}
                  >
                    Post
                  </button>
                </>
              )}
            </div>
          </div>
          {/* COMMENTS LIST */}
          <div className="space-y-4 max-h-80 custom-scrollbar mb-4 text-left bg-[#1A2F23] p-3 rounded-2xl">
            {comments.length === 0 ? (
              <p className="text-white/70 italic text-center">
                No comments yet. Be the first to share your thoughts!
              </p>
            ) : (
              comments.slice(0, 5).map((c, index) => (
                <div
                  key={index}
                  className="bg-white/10 p-4 rounded-xl flex gap-3 items-start"
                >
                  {/* COMMENTER IMAGE */}
                  <img
                    src={
                      c.commenterImage || "https://i.ibb.co/4pDNDk1/avatar.png"
                    }
                    alt={c.commenter}
                    className="w-10 h-10 rounded-full object-cover border border-white/30"
                  />

                  <div className="flex-1">
                    {/* NAME */}
                    <p className="text-sm font-bold text-white">
                      {c.commenter}
                    </p>

                    {/* TEXT */}
                    <p className="text-sm text-white/80 mt-1">{c.text}</p>

                    {/* DATE */}
                    <p className="text-xs text-white/50 mt-1">
                      {c.commentedAt
                        ? new Date(c.commentedAt).toLocaleString()
                        : "Just now"}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>
      </main>

      {/* ANIMATION */}
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

export default LessonDetails;