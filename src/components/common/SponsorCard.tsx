import { useNavigate } from "react-router-dom";

interface SponsorCardProps {
  logo: string;
  name: string;
  category: string;
  description: string;
  type: string[];
  coverage: string;
  status: "open" | "close";
}

const SponsorCard = ({
  logo,
  name,
  category,
  description,
  type,
  coverage,
  status,
}: SponsorCardProps) => {
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate("/login");
  };

  // class dinamis untuk border card
  const borderClass =
    status === "open" ? "border-2 border-emas" : "border border-slate-200";

  // class dinamis untuk tombol
  const buttonClass =
    status === "open"
      ? "px-4 py-2 text-sm rounded-lg bg-biru-tua text-putih hover:bg-biru-muda font-medium transition"
      : "px-4 py-2 text-sm rounded-lg bg-slate-100 text-biru-tua hover:bg-slate-200 font-medium transition";

  return (
    <div className={`bg-white rounded-3xl shadow-md p-6 flex flex-col justify-between hover:shadow-lg transition duration-300 min-h-[460px] ${borderClass}`}>
      <div className="flex justify-between items-center mb-5">
        <span className="text-xs px-3 py-1 rounded-full bg-abu-abu text-black font-medium">
          {category}
        </span>
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            status === "open"
              ? "bg-emas text-biru-tua"
              : "bg-red-100 text-red-500 border border-red-300"
          }`}
        >
          {status === "open" ? "Open Sponsorship" : "Close Sponsorship"}
        </span>
      </div>

      {/* Logo, Nama & Deskripsi */}
      <div className="flex flex-col items-start text-left mb-6">
        <img src={logo} alt={name} className="w-16 h-16 object-contain mb-3" />
        <h3 className="font-semibold text-biru-tua text-lg leading-snug mb-1">
          {name}
        </h3>
        <p className="text-sm text-slate-700 leading-relaxed line-clamp-3">
          {description}
        </p>
      </div>

      {/* Spacer fleksibel */}
      <div className="grow"></div>

      {/* Tipe Sponsor */}
      <div className="mb-5 text-left">
        <h4 className="text-sm font-semibold text-biru-tua mb-2">
          Tipe Sponsor
        </h4>
        <div className="flex flex-wrap gap-2">
          {type.map((t, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs rounded-full bg-biru-tua text-white font-medium"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Cakupan & Detail */}
      <div className="flex justify-between items-center mt-auto pt-3 flex-wrap gap-3">
        <div className="text-left">
          <h4 className="text-sm font-semibold text-biru-tua mb-1">
            Cakupan Sponsor
          </h4>
          <span className="px-3 py-1 text-xs rounded-full bg-emas text-biru-tua font-medium">
            {coverage}
          </span>
        </div>

        <button onClick={handleDetailClick} className={buttonClass}>
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

export default SponsorCard;
