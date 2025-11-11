import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/Logo.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-biru-tua border-b border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-8 lg:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <img
            src={logo}
            alt="Logo Platipus"
            className="w-9 h-9 object-contain"
          />
          <span className="text-lg font-semibold text-emas tracking-wide">
            Platipus
          </span>
        </div>

        {/* Navigation(Desktop) */}
        <nav className="hidden md:flex items-center gap-10 text-sm text-putih">
          <a href="#beranda" className="hover:text-emas transition">
            Beranda
          </a>
          <a href="#sponsor" className="hover:text-emas transition">
            Daftar Sponsor
          </a>
          <a href="#paket" className="hover:text-emas transition">
            Paket
          </a>
          <a href="#ulasan" className="hover:text-emas transition">
            Ulasan
          </a>
          <a href="#tentang" className="hover:text-emas transition">
            Tentang Kami
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link
            to="/login"
            className="px-4 py-1.5 text-sm bg-emas hover:bg-yellow-300 text-biru-tua font-medium rounded transition"
          >
            Masuk
          </Link>
          <Link
            to="/register"
            className="px-4 py-1.5 text-sm font-medium text-yellow-400 border border-emas rounded hover:bg-emas/10 transition"
          >
            Daftar
          </Link>
        </div>

        {/* Mobile menu*/}
        <button
          className="md:hidden text-emas text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-biru-tua border-t border-slate-700 py-4 px-8 space-y-3 text-putih">
          <a
            href="#home"
            className="block hover:text-emas transition"
            onClick={() => setMenuOpen(false)}
          >
            Beranda
          </a>
          <a
            href="#sponsor"
            className="block hover:text-emas transition"
            onClick={() => setMenuOpen(false)}
          >
            Daftar Sponsor
          </a>
          <a
            href="#paket"
            className="block hover:text-emas transition"
            onClick={() => setMenuOpen(false)}
          >
            Paket
          </a>
          <a
            href="#ulasan"
            className="block hover:text-emas transition"
            onClick={() => setMenuOpen(false)}
          >
            Ulasan
          </a>
          <a
            href="#tentang"
            className="block hover:text-emas transition"
            onClick={() => setMenuOpen(false)}
          >
            Tentang Kami
          </a>

          <div className="flex flex-col gap-2 pt-3 border-t border-slate-700">
            <Link
              to="/login"
              className="block text-center px-4 py-2 bg-emas text-biru-tua font-medium rounded hover:bg-yellow-300 transition"
              onClick={() => setMenuOpen(false)}
            >
              Masuk
            </Link>
            <Link
              to="/register"
              className="block text-center px-4 py-2 text-emas border border-emas rounded hover:bg-emas/10 transition"
              onClick={() => setMenuOpen(false)}
            >
              Daftar
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
