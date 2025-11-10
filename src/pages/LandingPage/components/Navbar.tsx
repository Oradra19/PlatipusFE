import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-[#0B1B2B] border-b border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-[#0B1B2B] font-bold text-lg">
            P
          </div>
          <span className="text-lg font-semibold text-yellow-400 tracking-wide">
            Platipus
          </span>
        </div>

        {/* Navigation menu */}
        <nav className="flex items-center gap-8 text-sm text-slate-200">
          <a href="#home" className="hover:text-yellow-400 transition">
            Beranda
          </a>
          <a href="#sponsor" className="hover:text-yellow-400 transition">
            Daftar Sponsor
          </a>
          <a href="#paket" className="hover:text-yellow-400 transition">
            Paket
          </a>
          <a href="#ulasan" className="hover:text-yellow-400 transition">
            Ulasan
          </a>
          <a href="#tentang" className="hover:text-yellow-400 transition">
            Tentang Kami
          </a>
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-1.5 text-sm bg-yellow-600 hover:bg-yellow-500 text-[#0B1B2B] font-medium rounded transition"
          >
            Masuk
          </Link>
          <Link
            to="/register"
            className="px-4 py-1.5 text-sm text-yellow-400 border border-yellow-500 rounded hover:bg-yellow-500/10 transition"
          >
            Daftar
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
