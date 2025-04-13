import ProfileCard from "../../components/ProfileCard";
import CreatePost from "../../components/CreatePost";
import Posts from '../../components/Posts';

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row gap-6 px-4 md:px-12 mt-8 md:h-[calc(100vh-64px)] md:overflow-hidden">
      {/* Left Sidebar */}
      <div className="md:w-1/3 w-full space-y-6 md:sticky md:top-20 relative">
        <ProfileCard />
        {/* Top Topics */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-2">Top Topics</h2>
          <div className="flex flex-wrap gap-2">
            {["#React", "#JavaScript", "#TypeScript"].map((topic) => (
              <span key={topic} className="px-3 py-1 bg-gray-100 text-sm rounded-full text-gray-700">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right/Main Content */}
      <div className="md:w-2/3 w-full flex flex-col gap-6 md:overflow-y-auto pr-2 md:h-[calc(100vh-64px)]">
        {/* Create Post */}
        <div className="-mx-4 md:mx-0">
          <CreatePost />
        </div>

        <div>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            <Posts />
          </div>
        </div>
      </div>
    </div>
  );
}
