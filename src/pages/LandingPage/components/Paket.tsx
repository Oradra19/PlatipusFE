import bg from "../../../assets/hiasan.png";

const Paket = () => {
  const plans = [
    {
      title: "REGULAR PLAN",
      price: "IDR. 0k",
      desc: "Mulai jelajahi dunia sponsorship dan event dengan bebas",
      features: [
        "Akses daftar EO dan perusahaan sponsor",
        "Ajukan proposal EO",
        "Kelola EO & Sponsorship terbatas",
      ],
      highlight: false,
    },
    {
      title: "FAST TRACK PLAN",
      price: "IDR. 50k",
      desc: "Tingkatkan peluangmu dengan akses prioritas dan visibilitas lebih tinggi",
      features: [
        "Semua fitur dari Regular Plan",
        "Proposal ditinjau lebih cepat",
        "Profil EO tampil di urutan atas pencarian",
        "Mendapatkan slot prioritas saat sponsor mencari partner",
      ],
      highlight: true,
    },
  ];

  return (
    <section id="paket" className="relative py-20 md:py-28 bg-linear-to-b from-[#F8F8F8] to-[#EFEFEF] overflow-hidden">
      <div className="absolute inset-0 z-0 flex justify-center items-center pointer-events-none">
        <img
          src={bg}
          alt="hiasan background"
          className="w-[1100px] md:w-[1300px] object-contain opacity-80 mix-blend-overlay brightness-110"
        />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto px-6 mb-14">
        <h2 className="text-xl md:text-2xl font-bold text-biru-tua mb-3">
          Mulai hari ini, dengan paket gratis atau Fast Track pilihan anda
        </h2>
        <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
          Dengan berbagai fitur unik dan bermanfaat, Anda dapat dengan mudah
          mengelola dana Anda tanpa masalah.
        </p>
      </div>

    {/* card */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 place-items-center gap-3 max-w-[700px] mx-auto px-4">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`relative flex flex-col justify-start rounded-3xl p-7 sm:p-8 shadow-lg transition duration-300 min-h-[480px] w-full max-w-[320px] backdrop-blur-[3px] ${
              plan.highlight
                ? "bg-biru-tua/85 text-white border-3 border-biru-tua hover:border-emas"
                : "bg-white/90 text-biru-tua border-3 border-gray-200 hover:border-emas"
            }`}
          >

            {plan.highlight && (
              <span className="absolute top-6 -right-10 md:-right-12 bg-emas text-biru-tua text-[10px] md:text-xs font-semibold px-4 py-1.5 rounded-full shadow-md">
                Pilihan Terbaik
              </span>
            )}

            <div className="mb-6">
              <h3
                className={`text-[11px] sm:text-xs font-semibold tracking-wide mb-2 ${
                  plan.highlight ? "text-gray-300" : "text-gray-500"
                }`}
              >
                {plan.title}
              </h3>
              <h4 className="text-3xl sm:text-4xl font-bold mb-3">
                {plan.price}
              </h4>
              <p
                className={`text-xs sm:text-sm mb-5 leading-relaxed ${
                  plan.highlight ? "text-slate-200" : "text-slate-700"
                }`}
              >
                {plan.desc}
              </p>
              <hr
                className={`mb-5 ${
                  plan.highlight ? "border-slate-600" : "border-slate-200"
                }`}
              />
            </div>

            {/* kelebihan */}
            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-left">
              {plan.features.map((f, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2.5 leading-relaxed"
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${
                      plan.highlight
                        ? "bg-emas text-biru-tua"
                        : "bg-biru-tua text-white"
                    } text-[10px] font-bold`}
                  >
                    ✓
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Paket;
