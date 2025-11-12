import { FaFacebookF, FaInstagram, FaTelegramPlane, FaVk, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0D1B2A] text-white/90 py-16 px-6 sm:px-10 lg:px-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
        {/* === Kolom kiri === */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img
              src="../../../assets/Logo.png"
              alt="Platipus Logo"
              className="w-7 h-7 object-contain"
            />
            <h2 className="text-lg font-semibold text-emas">Platipus</h2>
          </div>

          <p className="text-sm text-white/80 mb-4 leading-relaxed max-w-xs">
            Satu tempat untuk membangun koneksi, menjalin kerja sama, dan
            mengembangkan event impianmu.
          </p>

          <a
            href="#about"
            className="text-xs text-white/70 hover:text-emas transition"
          >
            More about us
          </a>

          {/* Sosial media */}
          <div className="flex items-center gap-4 mt-6">
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#0D1B2A] hover:bg-emas transition"
            >
              <FaTwitter size={14} />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#0D1B2A] hover:bg-emas transition"
            >
              <FaVk size={14} />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#0D1B2A] hover:bg-emas transition"
            >
              <FaFacebookF size={14} />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#0D1B2A] hover:bg-emas transition"
            >
              <FaTelegramPlane size={14} />
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#0D1B2A] hover:bg-emas transition"
            >
              <FaInstagram size={14} />
            </a>
          </div>
        </div>

        {/* === Kolom tengah === */}
        <div className="flex flex-col md:items-center md:text-center">
          <h3 className="text-sm font-semibold text-white mb-4">Navigasi</h3>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <a href="#sponsor" className="hover:text-emas transition">
                Daftar Sponsor.
              </a>
            </li>
            <li>
              <a href="#paket" className="hover:text-emas transition">
                Paket.
              </a>
            </li>
            <li>
              <a href="#ulasan" className="hover:text-emas transition">
                Ulasan.
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-emas transition">
                Tentang Kami.
              </a>
            </li>
          </ul>
        </div>

        {/* === Kolom kanan === */}
        <div className="flex flex-col gap-6 text-sm">
          <div>
            <h4 className="font-semibold text-white mb-1">Hubungi Kami</h4>
            <p className="text-white/70">08123456789</p>
            <p className="text-white/70">platipustech@gmail.com</p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-1">Location</h4>
            <p className="text-white/70">Surakarta, Indonesia</p>
          </div>
        </div>
      </div>

      {/* === Footer bawah === */}
      <div className="border-t border-white/10 mt-10 pt-6 text-xs text-white/60 text-center md:text-left">
        © 2025 — Copyright <span className="text-white">All Rights Reserved</span>
      </div>
    </footer>
  );
};

export default Footer;
