import user1 from "../../../assets/logo.png";

const testimonials = [
  {
    name: "Rani Setiawan",
    role: "Event Organizer",
    text: "Sebelumnya kami kesulitan mencari sponsor yang cocok untuk event kampus. Setelah pakai Platipus, prosesnya jauh lebih cepat dan mudah. Sekarang kami bisa fokus ke konsep acara tanpa khawatir soal pendanaan.",
    title: "Website Platipus Solutif",
    image: user1,
  },
  {
    name: "Rani Setiawan",
    role: "Event Organizer",
    text: "Platipus membantu kami menemukan sponsor dalam waktu singkat. Fiturnya sederhana tapi sangat membantu dalam pengajuan proposal.",
    title: "Efisien dan Mudah Dipakai",
    image: user1,
  },
  {
    name: "Rani Setiawan",
    role: "Event Organizer",
    text: "Kolaborasi jadi jauh lebih gampang. Kami bisa langsung menemukan sponsor yang relevan dengan acara kami.",
    title: "Kolaborasi Jadi Gampang",
    image: user1,
  },
];

const Testimoni = () => {
  return (
    <section className="py-24 bg-putih text-center overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-biru-tua mb-2">
          Mereka yang tau Platipus
        </h2>
        <p className="text-slate-600 text-sm md:text-base">
          Dinding kepercayaan pengguna di platform yang menjanjikan
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex items-stretch gap-6 whitespace-nowrap animate-scroll-right">
          {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-6 sm:p-7 md:p-8 shrink-0 border border-slate-200 text-left 
                         w-[260px] sm:w-[300px] md:w-[340px] lg:w-[360px] transition-transform duration-300 hover:scale-[1.02]"
            >
              <h3 className="font-semibold text-biru-tua text-sm md:text-base mb-2 leading-snug">
                “{t.title}”
              </h3>
              <p className="text-slate-600 text-xs md:text-sm mb-5 leading-relaxed line-clamp-5">
                {t.text}
              </p>
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-biru-tua text-sm">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute left-0 top-0 h-full w-16 bg-linear-to-r from-putih to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 h-full w-16 bg-linear-to-l from-putih to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
};

export default Testimoni;
