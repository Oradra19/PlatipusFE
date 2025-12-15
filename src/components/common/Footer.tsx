import {
  FaFacebookF,
  FaInstagram,
  FaTelegramPlane,
  FaTwitter,
} from "react-icons/fa";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-[#0D1B2A] text-white/90 py-16 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto">

        {/* === ROW ATAS === */}
        <div className="flex flex-col md:flex-row justify-between gap-10">

          {/* === KIRI (Logo + Deskripsi + Sosmed) === */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Platipus Logo" className="w-7 h-7" />
              <h2 className="text-lg font-semibold text-emas">Platipus</h2>
            </div>

            <p className="text-sm text-white/80 mb-4 leading-relaxed">
              Satu tempat untuk membangun koneksi, menjalin kerja sama, 
              dan mengembangkan event impianmu.
            </p>

            <a href="#about" className="text-xs text-white/70 hover:text-emas transition">
              More about us
            </a>

            {/* Sosial media */}
            <div className="flex items-center gap-3 mt-6">
              {[FaTwitter, FaFacebookF, FaTelegramPlane, FaInstagram].map(
                (Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-full bg-white flex items-center justify-center 
                               text-[#0D1B2A] hover:bg-emas transition group"
                  >
                    <Icon size={14} className="group-hover:text-white text-biru-tua" />
                  </a>
                )
              )}
            </div>
          </div>

          {/* === NAVIGASI HORIZONTAL DI KANAN ATAS === */}
          <div className="flex flex-wrap gap-5 text-sm text-white/70 md:justify-end">
            <a href="#sponsor" className="hover:text-emas transition">Daftar Sponsor.</a>
            <a href="#paket" className="hover:text-emas transition">Paket.</a>
            <a href="#testimoni" className="hover:text-emas transition">Ulasan.</a>
            <a href="#about" className="hover:text-emas transition">Tentang Kami.</a>
          </div>
        </div>

       {/* === HUBUNGI + LOCATION (blok di kanan, teks rata kiri) === */}
        <div className="flex flex-col gap-10 mt-14 text-sm md:items-end">
          {/* Hubungi Kami */}
          <div className="text-left w-full md:w-auto">
            <h4 className="font-semibold text-white mb-1">Hubungi Kami</h4>
            <p className="text-white/70">08123456789</p>
            <p className="text-white/70">platipustech@gmail.com</p>
          </div>
          {/* Location */}
          <div className="text-left w-full md:w-auto">
            <h4 className="font-semibold text-white mb-1">Lokasi</h4>
            <p className="text-white/70">Surakarta, Indonesia</p>
          </div>
        </div>

        {/* === COPYRIGHT === */}
        <div className="border-t border-white/10 mt-10 pt-6 text-xs text-white/60 text-center">
          © 2025 — Copyright <span className="text-white">All Rights Reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
