import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

interface NavbarProps {
  username: string;
  role: "sponsor" | "eo";
}

const NavbarDashboard: FC<NavbarProps> = ({ username, role }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (role === "eo") {
      // Logic lama untuk sponsor
      navigate("/dashboard/eo");
    } else if (role === "sponsor") {
      // Logic baru untuk EO: Kembali ke Landing Page
      navigate("/"); 
    }
    
  };

  // Logic Styling & Text berdasarkan Role
  const isEO = role === "eo";

  const buttonText = isEO ? "Dashboard" : "Dashboard";
  
  // Teks sapaan
  const displayText = isEO 
    ? `Selamat Datang EO, ${username}!` 
    : username;

  return (
    <nav className="w-full bg-biru-tua text-white py-4 shadow px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <h1 className="text-2xl font-semibold text-emas">Platipus</h1>
        </div>

        {/* USERNAME & BUTTON */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-abu-abu opacity-90 hidden sm:block font-medium">
            {displayText}
          </span>

          <button
            onClick={handleButtonClick}
            className="bg-emas text-biru-tua font-medium px-5 py-2 rounded-md hover:bg-[#c89b33] transition text-sm"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDashboard;