export interface SimpleEOCard {
  id: string;
  category: string; // Teknologi
  status: string; // Open Sponsorship
  logo: string; // Logoipsum / gambar logo
  brandName: string; // Logoipsum
  companyName: string; // Cv. Overlogic Universe
  description: string; // Deskripsi singkat
  isFastTrack?: boolean;
  sponsorTypes: string[]; // Dana, Media Partner, Layanan
  coverage: string; // Nasional Sponsorship
  budget: string; // 2–5 Juta
}

export const mockSimpleEO: SimpleEOCard[] = [
  {
    id: "S1",
    category: "Teknologi",
    status: "Open Sponsorship",
    logo: "/logoipsum1.png",
    brandName: "Logoipsum",
    companyName: "Cv. Overlogic Universe",
    description:
      "Overlogic Universe is committed to building innovative digital solutions that help individuals and companies transform ideas into real impact.",
    sponsorTypes: ["Dana", "Media Partner", "Layanan"],
    coverage: "Nasional Sponsorship",
    budget: "2–5 Juta",
    isFastTrack: true,
  },

  {
    id: "S2",
    category: "Startup",
    status: "Open Sponsorship",
    logo: "/logoipsum2.png",
    brandName: "StartupHub",
    companyName: "PT Startup Maju",
    description:
      "StartupHub membantu startup Indonesia berkembang melalui inkubasi, workshop, dan networking dengan investor serta perusahaan besar.",
    sponsorTypes: ["Dana", "Produk"],
    coverage: "Regional Sponsorship",
    budget: "1–3 Juta",
  },

  {
    id: "S3",
    category: "Pendidikan",
    status: "Open Sponsorship",
    logo: "/logoipsum3.png",
    brandName: "EduNation",
    companyName: "PT Edukasi Nusantara",
    description:
      "EduNation menghadirkan program edukasi modern dan inovatif untuk meningkatkan kualitas pembelajaran pelajar dan mahasiswa di seluruh Indonesia.",
    sponsorTypes: ["Media Partner", "Layanan"],
    coverage: "Nasional Sponsorship",
    budget: "3–6 Juta",
  },

  {
    id: "S4",
    category: "Komunitas",
    status: "Open Sponsorship",
    logo: "/logoipsum4.png",
    brandName: "CreativeCircle",
    companyName: "CV Lingkar Kreasi",
    description:
      "CreativeCircle adalah ruang kolaborasi bagi komunitas kreatif untuk mengembangkan karya, berbagi ide, dan menciptakan gerakan kreatif baru.",
    sponsorTypes: ["Dana", "Media Partner"],
    coverage: "Kota Sponsorship",
    budget: "1–2 Juta",
  },

  {
    id: "S5",
    category: "Teknologi",
    status: "Open Sponsorship",
    logo: "/logoipsum5.png",
    brandName: "TechWave",
    companyName: "PT Gelombang Teknologi",
    description:
      "TechWave berfokus pada pengembangan teknologi berbasis AI dan automasi yang membantu perusahaan meningkatkan efisiensi operasional.",
    sponsorTypes: ["Produk", "Layanan"],
    coverage: "Nasional Sponsorship",
    budget: "5–10 Juta",
  },
];

export const mockSimpleProposal: SimpleEOCard[] = [
  {
    id: "PR1",
    category: "Teknologi",
    status: "Open Sponsorship",
    logo: "/logo1.png",
    brandName: "Cv. Overlogic Universe",
    companyName: "Overlogic Universe",
    description:
      "Overlogic Universe was founded with a passion to bring revolutionary changes to the digital world. Since 2024, we have been helping individuals and companies turn their visions into reality through smart and innovative digital solutions.",
    sponsorTypes: ["Dana", "Media Partner", "Layanan"],
    coverage: "Nasional Sponsorship",
    budget: "2–5 Juta",
    isFastTrack: true,
  },

  {
    id: "PR2",
    category: "Pendidikan",
    status: "Open Sponsorship",
    logo: "/logo2.png",
    brandName: "Kampus Cendekia",
    companyName: "PT Kampus Cendekia Mandiri",
    description:
      "Kampus Cendekia berfokus pada inovasi pendidikan dan pengembangan ekosistem kampus modern untuk mahasiswa Indonesia.",
    sponsorTypes: ["Produk", "Media Partner"],
    coverage: "Regional Sponsorship",
    budget: "1–3 Juta",
  },

  {
    id: "PR3",
    category: "Kreativitas",
    status: "Open Sponsorship",
    logo: "/logo3.png",
    brandName: "CreativeHub Indonesia",
    companyName: "CreativeHub Corp",
    description:
      "CreativeHub Indonesia adalah komunitas kreator dan seniman yang aktif mengadakan pameran, workshop, dan project kolaborasi.",
    sponsorTypes: ["Dana", "Layanan"],
    coverage: "Nasional Sponsorship",
    budget: "3–6 Juta",
  },

  {
    id: "PR4",
    category: "Startup",
    status: "Open Sponsorship",
    logo: "/logo4.png",
    brandName: "Startup Mandiri Group",
    companyName: "PT Startup Mandiri",
    description:
      "Startup Mandiri membantu founder tahap awal dengan program mentoring, networking, dan kompetisi untuk mendorong pertumbuhan inovasi.",
    sponsorTypes: ["Dana", "Produk", "Media Partner"],
    coverage: "Regional Sponsorship",
    budget: "1–2 Juta",
  },

  {
    id: "PR5",
    category: "Komunitas",
    status: "Open Sponsorship",
    logo: "/logo5.png",
    brandName: "Community Space",
    companyName: "PT Komunitas Nusantara",
    description:
      "Community Space adalah wadah kolaborasi antar komunitas kreatif dan teknologi dengan berbagai agenda sharing, gathering, dan mini expo.",
    sponsorTypes: ["Media Partner", "Layanan"],
    coverage: "Nasional Sponsorship",
    budget: "2–4 Juta",
  },
];
