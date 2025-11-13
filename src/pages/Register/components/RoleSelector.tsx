import { FaCalendarAlt, FaBuilding } from "react-icons/fa";
import logo from "../../../assets/Logo.png";

interface RoleSelectorProps {
  selectedRole: "eo" | "sponsor";
  onSelectRole: (role: "eo" | "sponsor") => void;
}

const RoleSelector = ({ selectedRole, onSelectRole }: RoleSelectorProps) => {
  return (
    <div className="bg-[#0C1626] text-white rounded-2xl shadow-xl p-8 w-full md:w-1/2 max-w-lg">
      <div className="flex flex-col items-center mb-8">
        <img src={logo} alt="Platipus Logo" className="w-24 mb-4" />
        <h1 className="text-3xl font-bold text-[#D4AF37]">Platipus</h1>
        <p className="text-sm mt-2 text-gray-300 text-center">
          Selamat datang para Event Organizer & Sponsorship
        </p>
      </div>

      <h2 className="text-lg font-bold mb-4 text-center">Pilih Role Anda!</h2>

      <div className="space-y-4">
        <button
          onClick={() => onSelectRole("eo")}
          className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
            selectedRole === "eo"
              ? "bg-gray-700 border-[#D4AF37]"
              : "bg-[#1A2335] border-transparent hover:bg-[#222E44]"
          }`}
        >
          <FaCalendarAlt size={22} className="text-[#D4AF37]" />
          <div className="text-left">
            <h3 className="font-semibold">Event Organizer</h3>
            <p className="text-xs text-gray-300">
              Kamu adalah EO luar biasa untuk para sponsor yang ada
            </p>
          </div>
        </button>

        <button
          onClick={() => onSelectRole("sponsor")}
          className={`w-full flex items-center gap-3 p-4 rounded-xl border transition-all ${
            selectedRole === "sponsor"
              ? "bg-gray-700 border-[#D4AF37]"
              : "bg-[#1A2335] border-transparent hover:bg-[#222E44]"
          }`}
        >
          <FaBuilding size={22} className="text-[#D4AF37]" />
          <div className="text-left">
            <h3 className="font-semibold">Sponsor</h3>
            <p className="text-xs text-gray-300">
              Kamu adalah sponsor yang bekerja sama dengan EO terbaik
            </p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;
