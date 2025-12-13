import { useState } from "react";
import { useNavigate } from "react-router-dom";
import google from "../../../assets/google.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginFormCard = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  // ✨ TAMBAHAN STATE BUAT AMBIL INPUT LOGIN
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✨ LOGIC LOGIN SEMENTARA
  const handleLogin = () => {
    const lowered = email.toLowerCase();

    if (lowered.includes("eo")) {
      navigate("/dashboard/eo/home");
    } else if (lowered.includes("sponsor")) {
      navigate("/dashboard/sponsor");
    } else {
      alert("Email harus mengandung eo atau sponsor untuk testing login!");
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 sm:p-10 md:p-12 lg:p-16 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl">
      <h2 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
        Selamat Datang PlaTeam!
      </h2>

      <p className="text-center text-gray-500 text-sm sm:text-base mb-8">
        Masuk ke dalam akun EO atau Sponsor yang telah dibuat!
      </p>

      <form className="w-full space-y-5" onSubmit={(e) => e.preventDefault()}>

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-[#0C1626]"
        />

        {/* PASSWORD */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-[#0C1626]"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-[#0C1626] transition"
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </span>
        </div>

        <div className="text-right text-xs sm:text-sm text-blue-600 cursor-pointer hover:underline">
          Lupa Password?
        </div>

        {/* BUTTON LOGIN */}
        <button
          type="button"
          onClick={handleLogin}
          className="w-full bg-[#0C1626] text-white py-3 rounded-lg font-semibold hover:bg-[#18263C] transition"
        >
          Masuk
        </button>

        <div className="flex items-center my-4">
          <hr className="grow border-gray-300" />
          <span className="px-3 text-gray-400 text-sm">atau</span>
          <hr className="grow border-gray-300" />
        </div>

        <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
          <span>Belum mempunyai akun?</span>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="text-blue-600 ml-1 hover:underline"
          >
            Daftar
          </button>
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-3 hover:bg-gray-100 transition text-sm"
        >
          <img
            src={google}
            alt="Google"
            className="w-8 h-8 mr-2 object-contain"
          />
          Lanjutkan dengan Google
        </button>
      </form>
    </div>
  );
};

export default LoginFormCard;
