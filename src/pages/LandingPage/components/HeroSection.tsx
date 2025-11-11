
const HeroSection = () => {
  const sponsorLogos = [
    "/logos/logo1.png",
    "/logos/logo2.png",
    "/logos/logo3.png",
    "/logos/logo4.png",
    "/logos/logo5.png",
    "/logos/logo6.png",
  ];

  const eoLogos = [
    "/logos/eo1.png",
    "/logos/eo2.png",
    "/logos/eo3.png",
    "/logos/eo4.png",
    "/logos/eo5.png",
    "/logos/eo6.png",
  ];

  return (
    <section className="pt-40 md:pt-48 pb-40 md:pb-48 bg-putih text-center overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-biru-tua leading-snug mb-6">
          Bangun Kolaborasi Sukses antara{" "}
          <span className="text-emas">EO</span> dan{" "}
          <span className="text-emas">Sponsor</span> di Satu Platform
        </h1>

        <p className="text-slate-600 text-sm sm:text-base md:text-lg mt-2 mb-14 max-w-3xl mx-auto">
          Platipus mempermudah Event Organizer dan Perusahaan menemukan
          kolaborasi sponsor yang saling menguntungkan — cepat, aman, dan
          transparan.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-7 mb-24">
          <button className="w-full sm:w-auto px-8 py-3 text-sm md:text-base bg-emas text-biru-tua font-semibold rounded-xl hover:bg-yellow-400 transition">
            Mulai Sebagai Sponsor
          </button>
          <button className="w-full sm:w-auto px-8 py-3 text-sm md:text-base bg-biru-tua text-putih border border-slate-700 font-semibold rounded-xl hover:bg-biru-tua/80 transition">
            Mulai Sebagai EO
          </button>
        </div>

        {/* Logo Sponsor */}
        <div className="relative overflow-hidden mb-8 md:mb-10">
          <div className="flex items-center gap-10 sm:gap-12 whitespace-nowrap animate-scroll-left">
            {[...sponsorLogos, ...sponsorLogos].map((logo, i) => (
              <img
                key={`sponsor-${i}`}
                src={logo}
                alt="Logo Sponsor"
                className="h-8 sm:h-9 md:h-10 lg:h-10 min-w-[90px] object-contain opacity-90 hover:opacity-100 transition"
              />
            ))}
          </div>
          <div className="absolute left-0 top-0 h-full w-24 sm:w-32 bg-linear-to-r from-putih to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 h-full w-24 sm:w-32 bg-linear-to-l from-putih to-transparent pointer-events-none"></div>
        </div>

        {/* Logo EO */}
        <div className="relative overflow-hidden">
          <div className="flex items-center gap-10 sm:gap-12 whitespace-nowrap animate-scroll-right">
            {[...eoLogos, ...eoLogos].map((logo, i) => (
              <img
                key={`eo-${i}`}
                src={logo}
                alt="Logo EO"
                className="h-8 sm:h-9 md:h-10 lg:h-10 min-w-[90px] object-contain opacity-90 hover:opacity-100 transition"
              />
            ))}
          </div>
          <div className="absolute left-0 top-0 h-full w-24 sm:w-32 bg-linear-to-r from-putih to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 h-full w-24 sm:w-32 bg-linear-to-l from-putih to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
