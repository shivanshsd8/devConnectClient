import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DevconnectContext } from "../../context/DevconnectContext";
import InputBox from "../../components/InputBox";

export default function Login() {
  const navigate = useNavigate();
  const { signinHandler } = useContext(DevconnectContext);

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleSignin() {
    const { username, password } = form;
    signinHandler(username, password);
  }

  return (
    <div className="flex flex-col items-center px-4 mt-20 text-center">
      <div className="mb-10">
        <p className="text-3xl sm:text-5xl text-[#3949ab] font-black">&lt;DevConnect/&gt;</p>
        <p className="mt-4 text-xl font-semibold">Sign in to your account</p>
        <p className="text-sm text-gray-500">Connect with developers around the world</p>
      </div>

      <div className="w-full sm:w-[80%] md:w-[50%] lg:w-[40%] p-6 rounded-lg bg-white shadow-md">
        <InputBox label="Username" placeholder="Enter Username" value={form.username} onChange={(val) => handleChange('username', val)} />
        <InputBox label="Password" placeholder="Enter Password" type="password" value={form.password} onChange={(val) => handleChange('password', val)} />

        <button
          onClick={handleSignin}
          className="mt-6 bg-[#3949ab] hover:bg-[#303f9f] text-white px-6 py-2 rounded-md w-full transition"
        >
          Signin
        </button>

        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <button onClick={() => navigate("/auth/signup")} className="text-[#3949ab] underline">
            Signup
          </button>
        </p>
      </div>
    </div>
  );
}
