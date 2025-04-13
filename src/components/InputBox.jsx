export default function InputBox({ label, value, onChange, placeholder, type = "text" }) {
    return (
      <div className="mb-4 w-full text-left">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#3949ab] transition"
        />
      </div>
    );
  }
  