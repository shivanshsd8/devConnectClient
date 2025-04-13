import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DevconnectContext } from "../../context/DevconnectContext";
import InputBox from "../../components/InputBox";

export default function Register() {
  const navigate = useNavigate();
  const { signupHandler } = useContext(DevconnectContext);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    bio: '',
    profileImage:''
  });

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleSignup() {
    const { username, email, password, name, bio,profileImage } = form;
    signupHandler(username, email, password, name, bio,profileImage);
  }

  return (
    <div className="flex flex-col items-center px-4 mt-10 text-center">
      <div className="mb-10">
        <p className="text-3xl sm:text-5xl text-[#3949ab] font-black">&lt;DevConnect/&gt;</p>
        <p className="mt-4 text-xl font-semibold">Create your account</p>
        <p className="text-sm text-gray-500">Start connecting with developers worldwide</p>
      </div>

      <div className="w-full sm:w-[80%] md:w-[50%] lg:w-[40%] p-6 rounded-lg bg-white shadow-md">
        <InputBox label="Username" placeholder="Enter Username" value={form.username} onChange={(val) => handleChange('username', val)} />
        <InputBox label="Email" placeholder="Enter Email" value={form.email} onChange={(val) => handleChange('email', val)} />
        <InputBox label="Password" placeholder="Enter Password" type="password" value={form.password} onChange={(val) => handleChange('password', val)} />
        <InputBox label="Name" placeholder="Enter Full Name" value={form.name} onChange={(val) => handleChange('name', val)} />
        <InputBox label="Bio" placeholder="Tell us something about yourself" value={form.bio} onChange={(val) => handleChange('bio', val)} />
        <InputBox label="Profile Image Link" placeholder="Give your profile image link" value={form.profileImage} onChange={(val) => handleChange('profileImage', val)} />

        <button
          onClick={handleSignup}
          className="mt-6 bg-[#3949ab] hover:bg-[#303f9f] text-white px-6 py-2 rounded-md w-full transition"
        >
          Signup
        </button>

        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <button onClick={() => navigate("/auth/signin")} className="text-[#3949ab] underline">
            Signin
          </button>
        </p>
      </div>
    </div>
  );
}
