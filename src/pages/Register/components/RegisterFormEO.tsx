import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import google from "../../../assets/google.png";

const RegisterFormEO = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full md:w-1/2 max-w-lg">
      <h2 className="text-center text-2xl font-bold mb-4">
        Selamat datang EO!
      </h2>
      <p className="text-center text-sm text-gray-500 mb-6">
        Daftarkan dan dapatkan kerjasama dengan sponsor dengan cepat.
      </p>

      <form className="space-y-4">
        <input
          type="text"
          placeholder="Nama Pengguna / Organisasi EO"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#0C1626] outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#0C1626] outline-none"
        />
        <input
          type="tel"
          placeholder="Nomor WhatsApp"
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#0C1626] outline-none"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#0C1626] outline-none"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Konfirmasi Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#0C1626] outline-none"
          />
          <span
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-3 text-gray-500 cursor-pointer"
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-[#0C1626] text-white py-3 rounded-lg font-semibold hover:bg-[#18263C] transition"
        >
          Daftar
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <div className="flex items-center justify-center text-sm text-gray-500 mt-4">
          <span>Sudah mempunyai akun?</span>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 ml-1 hover:underline"
          >
            Masuk
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

export default RegisterFormEO;
