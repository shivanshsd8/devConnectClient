import { useContext, useState } from "react";
import { DevconnectContext } from "../../context/DevconnectContext";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
    const { user, updateUserProfile } = useContext(DevconnectContext);
    const navigate = useNavigate();
    const [editableField, setEditableField] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [profileData, setProfileData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        bio: user?.bio || '',
        profileImage: user?.profileImage || '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleFieldClick = (field) => setEditableField(field);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const updatedData = { ...profileData };
        if (!updatedData.password) delete updatedData.password; // Only send if changed

        try {
            await updateUserProfile(updatedData);
            alert("Profile updated successfully!");
        } catch (error) {
            alert("Failed to update profile");
        } finally {
            setLoading(false);
            setEditableField(null);
        }
    };

    const handleCancel = () => {
        setProfileData({
            name: user?.name || '',
            email: user?.email || '',
            bio: user?.bio || '',
            profileImage: user?.profileImage || '',
            password: ''
        });
        setEditableField(null);
        navigate("/profile");
    };

    const renderInputField = (label, field, type = "text") => {
        const isPassword = field === "password";

        return (
            <div className="mb-4">
                <label htmlFor={field} className="block text-sm font-medium text-gray-700">{label}</label>
                {editableField === field ? (
                    <div className="relative">
                        <input
                            type={isPassword && !showPassword ? "password" : type}
                            id={field}
                            name={field}
                            value={profileData[field]}
                            onChange={handleChange}
                            onBlur={() => setEditableField(null)}
                            autoFocus
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#3949ab] pr-10"
                        />
                        {isPassword && (
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute top-[50%] right-2 transform -translate-y-1/2 text-sm text-blue-600"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        )}
                    </div>
                ) : (
                    <div
                        onClick={() => handleFieldClick(field)}
                        className="mt-1 block w-full p-2 border border-gray-200 rounded-md bg-gray-50 text-gray-800 cursor-pointer hover:border-gray-400 transition"
                    >
                        {field === "password"
                            ? "••••••••"
                            : profileData[field] || <span className="text-gray-400">Click to add</span>}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="w-full flex justify-center bg-gray-50 min-h-screen px-4 py-10">
            <div className="w-full max-w-2xl bg-white rounded-2xl p-6 shadow-md">
                <h2 className="text-3xl font-bold mb-6">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {renderInputField("Name", "name")}
                    {renderInputField("Email", "email", "email")}
                    <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                        {editableField === "bio" ? (
                            <textarea
                                id="bio"
                                name="bio"
                                value={profileData.bio}
                                onChange={handleChange}
                                onBlur={() => setEditableField(null)}
                                rows="4"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-[#3949ab]"
                                autoFocus
                            />
                        ) : (
                            <div
                                onClick={() => handleFieldClick("bio")}
                                className="mt-1 block w-full p-2 border border-gray-200 rounded-md bg-gray-50 text-gray-800 cursor-pointer hover:border-gray-400 transition"
                            >
                                {profileData.bio || <span className="text-gray-400">Click to add bio</span>}
                            </div>
                        )}
                    </div>
                    {renderInputField("Profile Image URL", "profileImage")}
                    {renderInputField("Change Password", "password", "password")}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`mt-4 w-full py-2 text-white bg-[#3949ab] rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>

                <div className="mt-4">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="w-full py-2 mt-2 text-white bg-gray-500 hover:bg-gray-600 rounded-md transition"
                    >
                        Cancel
                    </button>
                </div>

                <div className="mt-8">
                    <h3 className="text-xl font-semibold">Current Profile</h3>
                    <div className="flex items-center mt-4">
                        <img src={profileData.profileImage} alt="Profile" className="w-16 h-16 rounded-full object-cover mr-4" />
                        <div>
                            <p className="text-lg font-bold">{profileData.name}</p>
                            <p className="text-gray-600">{profileData.email}</p>
                            <p className="text-gray-600">{profileData.bio}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
