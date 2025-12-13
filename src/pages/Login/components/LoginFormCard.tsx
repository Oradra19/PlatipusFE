import { useState } from "react";
import { useNavigate } from "react-router-dom";
import google from "../../../assets/google.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import apiClient from "../../../services/axiosInstance"; // ⬅️ SESUAIKAN PATH

const LoginFormCard = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Email dan password wajib diisi");
      return;
    }

    try {
      setLoading(true);

      const res = await apiClient.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = res.data;

      // 🔐 simpan token & user
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // 🚀 redirect berdasarkan role
      if (user.role === "EO") {
        navigate("/dashboard/eo/home");
      } else if (user.role === "SPONSOR") {
        navigate("/dashboard/sponsor");
      } else {
        alert("Role tidak dikenali");
      }
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Terjadi kesalahan saat login";

      alert(message);
    } finally {
      setLoading(false);
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
            className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:text-[#0C1626]"
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
          disabled={loading}
          className="w-full bg-[#0C1626] text-white py-3 rounded-lg font-semibold hover:bg-[#18263C] transition disabled:opacity-60"
        >
          {loading ? "Memproses..." : "Masuk"}
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
      </form>
    </div>
  );
};

export default LoginFormCard;
