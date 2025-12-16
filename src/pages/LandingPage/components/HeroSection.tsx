import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const sponsorLogos = [
    "/logo/logo1.png",
    "/logo/logo2.png",
    "/logo/logo3.png",
    "/logo/logo4.png",
  ];

  const eoLogos = [
    "/logo/logo5.png",
    "/logo/logo6.png",
    "/logo/logo7.png",
    "/logo/logo8.png",
  ];

  return (
    <section className="pt-40 md:pt-48 pb-40 md:pb-48 bg-putih text-center overflow-hidden">
      <style>{`
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
        .marquee {
          display: flex;
          width: max-content;
        }
        .marquee-left {
          animation: marqueeLeft 35s linear infinite;
        }
        .marquee-right {
          animation: marqueeRight 35s linear infinite;
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-biru-tua mb-6">
          Bangun Kolaborasi Sukses antara{" "}
          <span className="text-emas">EO</span> dan{" "}
          <span className="text-emas">Sponsor</span> di Satu Platform
        </h1>

        <p className="text-slate-600 text-sm sm:text-base md:text-lg mb-14 max-w-3xl mx-auto">
          Platipus mempermudah Event Organizer dan Perusahaan menemukan
          kolaborasi sponsor yang saling menguntungkan — cepat, aman, dan
          transparan.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-7 mb-24 max-w-md mx-auto">
          <button
            onClick={() => navigate("/login")}
            className="flex-1 min-w-[220px] whitespace-nowrap px-6 py-2.5 bg-emas text-biru-tua font-semibold rounded-2xl hover:bg-yellow-400 transition"
          >
            Mulai Sebagai Sponsor
          </button>

          <button
            onClick={() => navigate("/login")}
            className="flex-1 min-w-[220px] whitespace-nowrap px-6 py-2.5 bg-biru-tua text-putih border border-slate-700 font-semibold rounded-2xl hover:bg-biru-tua/80 transition"
          >
            Mulai Sebagai EO
          </button>
        </div>

        <div className="relative overflow-hidden mb-10">
          <div className="flex">
            <div className="marquee marquee-left">
              {[...sponsorLogos, ...sponsorLogos].map((logo, i) => (
                <img
                  key={`s-${i}`}
                  src={logo}
                  className="h-10 min-w-[120px] object-contain opacity-90 mx-6"
                />
              ))}
            </div>
            <div className="marquee marquee-left">
              {[...sponsorLogos, ...sponsorLogos].map((logo, i) => (
                <img
                  key={`s2-${i}`}
                  src={logo}
                  className="h-10 min-w-[120px] object-contain opacity-90 mx-6"
                />
              ))}
            </div>
          </div>
          <div className="absolute left-0 top-0 h-full w-32 bg-linear-to-r from-putih to-transparent"></div>
          <div className="absolute right-0 top-0 h-full w-32 bg-linear-to-l from-putih to-transparent"></div>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex">
            <div className="marquee marquee-right">
              {[...eoLogos, ...eoLogos].map((logo, i) => (
                <img
                  key={`e-${i}`}
                  src={logo}
                  className="h-10 min-w-[120px] object-contain opacity-90 mx-6"
                />
              ))}
            </div>
            <div className="marquee marquee-right">
              {[...eoLogos, ...eoLogos].map((logo, i) => (
                <img
                  key={`e2-${i}`}
                  src={logo}
                  className="h-10 min-w-[120px] object-contain opacity-90 mx-6"
                />
              ))}
            </div>
          </div>
          <div className="absolute left-0 top-0 h-full w-32 bg-linear-to-r from-putih to-transparent"></div>
          <div className="absolute right-0 top-0 h-full w-32 bg-linear-to-l from-putih to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
