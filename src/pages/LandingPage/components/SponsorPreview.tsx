import { useNavigate } from "react-router-dom";
import SponsorCard from "../../../components/common/SponsorCard";

const SponsorPreview = () => {
  const navigate = useNavigate();

  const sponsors = [
    {
      logo: "/logos/logo1.png",
      name: "CV. Overlogic Universe",
      category: "Teknologi",
      description:
        "Overlogic Universe was founded with a passion to bring revolutionary changes to the digital world. Since 2024, we’ve been helping companies turn their visions into reality.",
      type: ["Dana", "Media Partner", "Layanan"],
      coverage: "Nasional Sponsorship",
      status: "open",
    },
    {
      logo: "/logos/logo2.png",
      name: "Logipus Corp",
      category: "Teknologi",
      description:
        "Mitra terpercaya dalam solusi digital kreatif dan kolaboratif.",
      type: ["Dana", "Media Partner"],
      coverage: "Regional Sponsorship",
      status: "close",
    },
    {
      logo: "/logos/logo3.png",
      name: "NeoBright Media",
      category: "Media & Komunikasi",
      description:
        "Media partner inovatif yang siap membantu event kamu menjangkau audiens lebih luas.",
      type: ["Media Partner"],
      coverage: "Lokal Sponsorship",
      status: "open",
    },
    {
      logo: "/logos/logo4.png",
      name: "GreenField Indonesia",
      category: "Lingkungan",
      description:
        "Perusahaan yang fokus pada keberlanjutan dan dukungan terhadap event ramah lingkungan.",
      type: ["Layanan"],
      coverage: "Nasional Sponsorship",
      status: "close",
    },
    {
      logo: "/logos/logo5.png",
      name: "BrightSpark Agency",
      category: "Kreatif",
      description:
        "Agensi kreatif dengan pengalaman dalam mendukung berbagai event lokal dan nasional.",
      type: ["Dana", "Media Partner"],
      coverage: "Regional Sponsorship",
      status: "open",
    },
    {
      logo: "/logos/logo6.png",
      name: "Eduverse Labs",
      category: "Edukasi",
      description:
        "Startup edukasi yang berfokus pada kolaborasi untuk mengembangkan potensi pelajar di seluruh Indonesia.",
      type: ["Layanan", "Dana"],
      coverage: "Nasional Sponsorship",
      status: "open",
    },
  ];

  return (
    <section id="sponsor" className="py-20 bg-slate-50 text-center">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-biru-tua mb-2">
        Daftar Sponsor
      </h2>
      <p className="text-slate-600 mb-10 text-[13px] sm:text-sm md:text-[15px] lg:text-base leading-relaxed max-w-2xl mx-auto px-4 md:px-0">
        Buat kalian para{" "}
        <span className="font-medium text-biru-tua">Event Organizer</span>{" "}
        yang siap bekerja sama dengan Sponsorship ternama
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-5xl mx-auto px-4 md:px-6">
        {sponsors.map((s, i) => (
          <div key={i} className="scale-[0.92] hover:scale-95 transition-transform">
            <SponsorCard {...s} />
          </div>
        ))}
      </div>

      {/* Tombol Lihat Lebih Banyak */}
      <div className="mt-12">
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-2.5 md:px-7 md:py-3 bg-emas text-biru-tua font-semibold rounded-lg hover:bg-yellow-400 transition text-sm md:text-base"
        >
          Lihat Lebih Banyak
        </button>
      </div>
    </section>
  );
};

export default SponsorPreview;
