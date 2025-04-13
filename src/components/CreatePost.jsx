import { useContext, useRef, useState } from "react";
import playIcon from '../assets/play.png';
import imageIcon from '../assets/image.png';
import codeIcon from "../assets/code.png";
import { DevconnectContext } from "../context/DevconnectContext";
import AiAssistDropdown from "./AiAssistDropdown";

export default function CreatePost() {
  const { postHandler, user } = useContext(DevconnectContext);

  const [imagePopupOpen, setImagePopupOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const contentRef = useRef('');
  const [isPosting, setIsPosting] = useState(false);

  // Handle post creation
  async function handlePost() {
    try {
      setIsPosting(true); // Set posting in progress
      const content = contentRef.current.value;
      await postHandler(content, imageUrl); // Call post handler from context
      setIsPosting(false); // Reset posting state
      contentRef.current.value = ''; // Reset content area
      setImageUrl(''); // Reset image URL after posting
    } catch (err) {
      setIsPosting(false);
      alert('❌ Error posting!');
    }
  }

  // Handle opening image URL modal
  function handleImagePopupClose() {
    setImagePopupOpen(false);
  }

  if (!user) {
    return <div>Loading...</div>; // or your skeleton
  }

  const profileImage = user.profileImage;

  return (
    <div className="flex flex-col md:flex-row items-start w-full p-5 border-none rounded-lg bg-white shadow-sm">
      {/* Profile Image */}
      <div className="md:mr-6 mb-4 md:mb-0">
        <img
          src={profileImage}
          alt="Profile"
          className="w-14 h-14 rounded-full object-cover"
        />
      </div>

      {/* Textarea and Button */}
      <div className="flex flex-col flex-1 w-full">
        <textarea
          placeholder="Share your code or thoughts with other developers..."
          className="w-full h-[120px] border-2 border-gray-200 rounded-lg p-3 resize-y focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-none"
          ref={contentRef}
        ></textarea>

        {/* If there's an image URL, show preview */}
        {imageUrl && (
          <div className="mt-3">
            <img src={imageUrl} alt="Preview" className="w-40 h-40 object-cover rounded-lg" />
          </div>
        )}

        {/* Icons + AI + Post */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mt-3">
          <div className="flex gap-4">
            <img
              src={imageIcon}
              alt="Image"
              className="w-5 h-5 cursor-pointer"
              onClick={() => setImagePopupOpen(true)}
            />
            <img src={playIcon} alt="Play" className="w-5 h-5 cursor-pointer" />
            <img src={codeIcon} alt="Code" className="w-5 h-5 cursor-pointer" />
          </div>

          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <AiAssistDropdown
              onPostSuggest={() => {}}
              onHashtagSuggest={() => {}}
            />
            <button
              className="px-6 py-2 rounded-lg font-semibold bg-[#3949ab] text-white hover:bg-[#303f9f] transition-all cursor-pointer w-full sm:w-auto"
              onClick={handlePost} // Trigger post creation
              disabled={isPosting} // Disable the button during posting
            >
              {isPosting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </div>
      </div>

      {/* Popup Modal for Image URL */}
      {imagePopupOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-opacity-40 flex items-center justify-center">
          <div className="relative top-10 left-20 bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-lg font-semibold mb-4">Enter Image URL</h2>
            <input
              type="text"
              placeholder="https://example.com/image.jpg"
              className="w-full p-2 border border-gray-300 rounded mb-4"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={handleImagePopupClose} // Close modal without saving
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded"
                onClick={handleImagePopupClose} // Close and save image URL
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
