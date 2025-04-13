import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function AiAssistDropdown({ onPostSuggest, onHashtagSuggest }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block w-full sm:w-auto" ref={dropdownRef}>
      {/* Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="px-8 py-2 rounded-lg font-semibold bg-[#3949ab] text-white hover:bg-[#303f9f] transition-all cursor-pointer w-full sm:w-auto flex items-center justify-center gap-2"
      >
        ✨ AI Assist ✨
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* Animated Dropdown */}
      <div
        className={`absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/10 z-10 transition-all duration-300 ease-out transform ${
          open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="py-1">
          <button
            onClick={() => {
              onPostSuggest();
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:rounded-md cursor-pointer"
          >
            ✨ Generate Post Idea
          </button>
          <button
            onClick={() => {
              onHashtagSuggest();
              setOpen(false);
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:rounded-md cursor-pointer"
          >
            🏷️ Suggest Hashtags
          </button>
        </div>
      </div>
    </div>
  );
}
