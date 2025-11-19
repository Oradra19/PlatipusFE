export interface EventData {
  id: string;
  title: string;
  location: string;
  date: string;
  audience: string;
  logo: string;
  tags: string[];
}

export const mockEvent: EventData[] = [
  {
    id: "1",
    title: "Solo Event Global Tech",
    location: "Surakarta",
    date: "13–15 Agustus 2024",
    audience: "Mahasiswa",
    logo: "/logo1.png",
    tags: ["2–3 Juta", "Dana", "Besar", "Offline"],
  },
  {
    id: "2",
    title: "Tech Expo 2024",
    location: "Jakarta",
    date: "20–21 Mei 2024",
    audience: "Profesional",
    logo: "/logo2.png",
    tags: ["5–10 Juta", "Dana", "Sedang", "Online"],
  },
  {
    id: "3",
    title: "Startup Pitch Day",
    location: "Bandung",
    date: "10–11 Juni 2024",
    audience: "Komunitas",
    logo: "/logo3.png",
    tags: ["1–2 Juta", "Produk", "Kecil", "Offline"],
  },
];
