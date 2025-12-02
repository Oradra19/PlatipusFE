export interface EventData {
  id: string;
  title: string;
  location: string;
  date: string;
  audience: string;
  tags: string[];
  logo: string;
  isFastTrack?: boolean;
  eoName: string;   
  eoPhoto: string;   
  category: string;  
  description: string;
  image: string;       
}

export const mockEvent: EventData[] = [
  {
    id: "FT1",
    title: "Innovation Summit Asia 2024",
    location: "Jakarta",
    date: "3–5 Januari 2024",
    audience: "Profesional",
    logo: "/logo1.png",
    tags: [">10 Juta", "Dana", "Besar", "Offline"],
    isFastTrack: true,

    eoName: "PT Event Nusantara",
    eoPhoto: "/eo1.png",
    category: "Teknologi",

    image: "event1.png",
    description:
      "Innovation Summit Asia 2024 adalah acara tahunan yang mempertemukan para inovator, pengusaha, dan pemimpin industri dari seluruh Asia untuk berbagi ide dan teknologi terbaru."
  },

  {
    id: "FT2",
    title: "Future Tech Expo 2024",
    location: "Bandung",
    date: "17–20 Februari 2024",
    audience: "Mahasiswa",
    logo: "/logo2.png",
    tags: ["5–10 Juta", "Produk", "Sedang", "Offline"],
    isFastTrack: true,

    eoName: "PT Event Nusantara",
    eoPhoto: "/eo1.png",
    category: "Teknologi",

    image: "/event2.png",
    description:
      "Future Tech Expo 2024 menampilkan teknologi terbaru dalam bidang AI, robotik, dan inovasi digital."
  },

  {
    id: "FT3",
    title: "Startup Founder Day",
    location: "Surabaya",
    date: "8–10 Maret 2024",
    audience: "Komunitas",
    logo: "/logo3.png",
    tags: ["3–6 Juta", "Dana", "Sedang", "Online"],
    isFastTrack: true,

    eoName: "PT Founder Indonesia",
    eoPhoto: "/eo2.png",
    category: "Startup",

    image: "/event3.png",
    description: "Event networking besar untuk para founder startup di Indonesia."
  },

  {
    id: "FT4",
    title: "National Creativity Week",
    location: "Semarang",
    date: "25–27 April 2024",
    audience: "Umum",
    logo: "/logo4.png",
    tags: ["2–3 Juta", "Dana", "Kecil", "Offline"],
    isFastTrack: true,

    eoName: "PT Kreativa Nusantara",
    eoPhoto: "/eo3.png",
    category: "Kreativitas",

    image: "/event4.png",
    description: "Pekan kreativitas nasional dengan berbagai kompetisi seni dan kreasi."
  },

  {
    id: "FT5",
    title: "Digital Innovation Hackfest",
    location: "Yogyakarta",
    date: "12–14 Mei 2024",
    audience: "Developer",
    logo: "/logo5.png",
    tags: ["5–10 Juta", "Produk", "Sedang", "Offline"],
    isFastTrack: false,

    eoName: "PT Digital Academy",
    eoPhoto: "/eo4.png",
    category: "Teknologi",

    image: "/event5.png",
    description: "Hackfest teknologi terbesar dengan ratusan peserta developer."
  },
];
export const mockProposal: EventData[] = [
  {
    id: "P1",
    title: "Creator Mini Expo",
    location: "Jakarta",
    date: "11–12 Januari 2024",
    audience: "Umum",
    logo: "/logo3.png",
    tags: ["1–2 Juta", "Dana", "Kecil", "Offline"],

    isFastTrack: true,

    // INFO EO
    eoName: "PT Creator Indonesia",
    eoPhoto: "/eo5.png",
    category: "Kreator & Komunitas",

    // DETAIL PAGE
    image: "/event-prop1.png",
    description:
      "Creator Mini Expo adalah ajang pertemuan komunitas kreator untuk menampilkan karya, bertukar ide, serta menjalin kolaborasi dengan berbagai brand dan sponsor. Acara ini menghadirkan booth mini, sesi sharing, dan kompetisi kreatif."
  },

  {
    id: "P2",
    title: "Campus Innovation Day",
    location: "Bandung",
    date: "5–7 Februari 2024",
    audience: "Mahasiswa",
    logo: "/logo4.png",
    tags: ["2–3 Juta", "Produk", "Kecil", "Online"],

    eoName: "PT Kampus Hebat",
    eoPhoto: "/eo6.png",
    category: "Pendidikan",

    image: "/event-prop2.png",
    description:
      "Campus Innovation Day menghadirkan mahasiswa inovatif dari berbagai kampus untuk mempresentasikan karya riset dan teknologi. Acara ini juga menyediakan sesi mentoring dan virtual expo."
  },

  {
    id: "P3",
    title: "Youth Developer Gathering",
    location: "Surabaya",
    date: "8–9 Maret 2024",
    audience: "Developer",
    logo: "/logo5.png",
    tags: ["3–6 Juta", "Dana", "Sedang", "Offline"],

    eoName: "PT DevHUB Indonesia",
    eoPhoto: "/eo7.png",
    category: "Teknologi",

    image: "/event-prop3.png",
    description:
      "Youth Developer Gathering mempertemukan developer muda Indonesia dalam satu forum besar. Acara mencakup workshop, sesi live coding, dan kompetisi pemrograman."
  },

  {
    id: "P4",
    title: "National StartUp Meetup",
    location: "Solo",
    date: "1–2 April 2024",
    audience: "Startup",
    logo: "/logo6.png",
    tags: ["1–2 Juta", "Dana", "Kecil", "Offline"],

    eoName: "PT Startup Mandiri",
    eoPhoto: "/eo8.png",
    category: "Startup & Bisnis",

    image: "/event-prop4.png",
    description:
      "National StartUp Meetup adalah forum interaktif bagi startup pemula untuk mempresentasikan ide mereka kepada komunitas dan sponsor potensial. Termasuk sesi pitching dan networking."
  },

  {
    id: "P5",
    title: "Design & Creator Fest",
    location: "Malang",
    date: "22–23 April 2024",
    audience: "Content Creator",
    logo: "/logo7.png",
    tags: ["1–2 Juta", "Produk", "Kecil", "Online"],

    eoName: "PT DesignHub",
    eoPhoto: "/eo9.png",
    category: "Desain & Kreatif",

    image: "/event-prop5.png",
    description:
      "Design & Creator Fest menggabungkan berbagai komunitas kreatif mulai dari desain grafis, UI/UX, video creator hingga fotografi dalam satu festival besar dengan workshop intensif dan kompetisi."
  }
];
