import type { FC } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

interface NavbarProps {
  username: string;
  role: "sponsor" | "eo"; // bisa ditambah nanti
}

const NavbarDashboard: FC<NavbarProps> = ({ username, role }) => {
  const navigate = useNavigate();

  const goToProfile = () => {
    if (role === "sponsor") navigate("/profile/sponsor");
    else if (role === "eo") navigate("/profile/eo");
  };

  return (
    <nav className="w-full bg-biru-tua text-white py-4 shadow px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <h1 className="text-2xl font-semibold text-emas">Platipus</h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-abu-abu opacity-90 hidden sm:block">
            {username}
          </span>

          <button
            onClick={goToProfile}
            className="bg-emas text-biru-tua font-medium px-5 py-2 rounded-md hover:bg-[#c89b33] transition text-sm"
          >
            Profile
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
