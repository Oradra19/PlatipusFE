import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import bgKolab from "../../../assets/kolaborasi.png";

const Kolaborasi = () => {
  const stats = [
    { value: 500, label: "Event Organizer Terdaftar" },
    { value: 250, label: "Perusahaan Sponsor Bergabung" },
    { value: 400, label: "Kolaborasi Terwujud" },
  ];

  // deteksi section terlihat di viewport
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });


  return (
    <section ref={ref} className="relative w-full py-20 md:py-24 text-center text-white overflow-hidden">
      <img
        src={bgKolab}
        alt="Kolaborasi Platipus"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center justify-center">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-10">
          Bukti Nyata Kolaborasi di{" "}
          <span className="text-emas font-bold">Platipus</span>
        </h2>

        {/* Card statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 w-full">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-putih/35 backdrop-blur-lg border border-yellow-300/30 rounded-2xl py-8 px-6 flex flex-col items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:scale-[1.03] hover:bg-white/20 transition-all duration-300 ease-out"
            >
              <p className="text-3xl sm:text-4xl font-extrabold mb-2 text-white drop-shadow-md">
                {inView ? <CountUp start={0} end={item.value} duration={2} /> : 0}+
              </p>

              <p className="text-sm sm:text-base text-slate-100 font-medium max-w-[180px] leading-snug">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Kolaborasi;
