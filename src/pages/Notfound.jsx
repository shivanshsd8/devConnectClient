import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-6">Oops! Page not found.</p>
            <button
                onClick={() => navigate('/home')}
                className="px-6 py-2 text-white bg-[#3949ab] hover:bg-[#303f9f] transition rounded-md shadow cursor-pointer"
            >
                Go to Home
            </button>
        </div>
    );
}
