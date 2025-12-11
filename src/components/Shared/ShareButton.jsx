import { useState } from "react";
import { Share2 } from "lucide-react";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import toast from "react-hot-toast";

const ShareButton = () => {
  const [open, setOpen] = useState(false);
  const lessonUrl = window.location.href;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(lessonUrl);
    toast.success("URL copied to clipboard!");
  };

  return (
    <div className="relative">
      <button
        className="cursor-pointer flex items-center gap-2 bg-white/10 hover:bg-[#D4C5A8]/30 transition-colors rounded-full px-3 py-1 shadow-inner"
        onClick={() => setOpen(!open)}
      >
        <Share2 size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 p-4 bg-white rounded-xl shadow-lg flex flex-col gap-3 z-50 w-40">
          <FacebookShareButton url={lessonUrl}>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded">
              <FacebookIcon size={24} round />
              <span className="text-sm font-medium text-gray-700">
                Facebook
              </span>
            </div>
          </FacebookShareButton>

          <TwitterShareButton url={lessonUrl}>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded">
              <TwitterIcon size={24} round />
              <span className="text-sm font-medium text-gray-700">Twitter</span>
            </div>
          </TwitterShareButton>

          <WhatsappShareButton url={lessonUrl}>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded">
              <WhatsappIcon size={24} round />
              <span className="text-sm font-medium text-gray-700">
                WhatsApp
              </span>
            </div>
          </WhatsappShareButton>

          <div
            onClick={handleCopyUrl}
            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-1 rounded"
          >
            <Share2 size={24} />
            <span className="text-sm font-medium text-gray-700">Copy URL</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;