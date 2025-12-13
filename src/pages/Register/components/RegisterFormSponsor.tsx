import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import apiClient from "../../../services/axiosInstance"; 

const RegisterFormSponsor = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ✨ STATE FORM
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !phone || !password || !confirmPassword) {
      alert("Semua field wajib diisi");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password tidak sama");
      return;
    }

    try {
      setLoading(true);

      await apiClient.post("auth/register", {
        name,
        email,
        phone,
        password,
        confirm_password: confirmPassword,
        role: "SPONSOR",
      });

      alert("Registrasi berhasil, silakan login");
      navigate("/login");
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Registrasi gagal";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full md:w-1/2 max-w-lg">
      <h2 className="text-center text-2xl font-bold mb-4">
        Selamat datang!
      </h2>

      <p className="text-center text-sm text-gray-500 mb-6">
        Daftarkan dan dapatkan kerjasama dengan sponsor dengan cepat.
      </p>

      <form className="space-y-4" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nama Pengguna / Organisasi EO"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#0C1626] outline-none"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#0C1626] outline-none"
        />

        <input
          type="tel"
          placeholder="Nomor WhatsApp"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#0C1626] outline-none"
        />

        {/* PASSWORD */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#0C1626] outline-none"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500 cursor-pointer"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* CONFIRM PASSWORD */}
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Konfirmasi Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          disabled={loading}
          className="w-full bg-[#0C1626] text-white py-3 rounded-lg font-semibold hover:bg-[#18263C] transition disabled:opacity-60"
        >
          {loading ? "Memproses..." : "Daftar"}
        </button>

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
      </form>
    </div>
  );
};

export default RegisterFormSponsor;
