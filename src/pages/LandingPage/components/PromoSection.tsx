import bgCollab from "../../../assets/branding.png"; 

const PromoSection = () => {
  return (
    <section className="relative w-full h-[300px] md:h-[380px] overflow-hidden">
     
      <img
        src={bgCollab}
        alt="Kolaborasi EO dan Sponsor"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-putih max-w-2xl leading-snug">
          Temukan <span className="text-emas">Sponsorship</span> dan{" "}
          <span className="text-emas">EO</span> yang paling sesuai untuk kamu
        </h2>
        <p className="text-slate-200 text-sm sm:text-base mt-3 max-w-xl">
          Satu tempat untuk membangun koneksi, menjalin kerja sama, dan
          mengembangkan event impianmu.
        </p>
      </div>
    </section>
  );
};

export default PromoSection;
