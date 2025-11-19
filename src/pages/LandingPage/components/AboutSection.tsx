import aboutImg from "../../../assets/about.png"; // ganti path sesuai file kamu

const AboutSection = () => {
  return (
    <section id="about" className="bg-[#F4EEEE] py-20 md:py-28 px-6 sm:px-10 overflow-hidden">
      <div
        className="max-w-6xl mx-auto bg-[#BFC8E2] rounded-4xl md:rounded-[3rem] shadow-lg 
                   flex flex-col md:flex-row items-center justify-between gap-10 md:gap-14 
                   p-8 md:p-12 relative overflow-hidden"
        style={{
          transform: "skewY(-2deg)",
        }}
      >
        {/* === Gambar kiri === */}
        <div
          className="flex-1 relative overflow-hidden rounded-2xl md:rounded-4xl shadow-md z-10"
          style={{
            transform: "skewY(2deg)",
          }}
        >
          <img
            src={aboutImg}
            alt="Kolaborasi"
            className="w-full h-full object-cover"
          />
        </div>

        {/* === Konten kanan === */}
        <div
          className="flex-1 text-left text-biru-tua flex flex-col justify-center md:pr-6 z-10"
          style={{ transform: "skewY(2deg)" }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 leading-snug">
            Kami Ahli dalam Mewujudkan Kolaborasi Hebat
          </h2>
          <p className="text-sm sm:text-base md:text-[15px] text-biru-tua/90 leading-relaxed mb-6">
            Platipus adalah platform digital yang mempertemukan Event Organizer
            (EO) dan perusahaan sponsor dalam satu ekosistem kolaboratif.
            <br />
            <br />
            Kami hadir untuk mempermudah proses pencarian, pengajuan, dan kerja
            sama sponsorship secara efisien dan transparan.
          </p>
        </div>

        {/* === Background biru besar === */}
        <div
        className="absolute inset-y-0 right-0 bg-[#BFC8E2] rounded-4xl md:rounded-[3rem] z-0"
        style={{
            transform: "skewY(-2deg)",
            width: "70%",   // 🟦 cuma 70% area kanan yang biru
        }}
        ></div>
      </div>
    </section>
  );
};

export default AboutSection;
