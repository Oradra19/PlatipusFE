import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile } from "../../services/api";
import logo from "../../assets/logo.png";

const NavbarDashboard = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Sponsor");

  useEffect(() => {
    getProfile()
      .then((res) => setUsername(res.user.name))
      .catch(() => {});
  }, []);

  return (
    <nav className="w-full bg-biru-tua text-white py-4 shadow px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src={logo} className="w-10 h-10" />
          <h1 className="text-2xl font-semibold text-emas">Platipus</h1>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-sm opacity-90">
            {username}
          </span>
          <button
            onClick={() => navigate("/profile/sponsor")}
            className="bg-emas text-biru-tua px-5 py-2 rounded-md font-medium"
          >
            Profile
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDashboard;
