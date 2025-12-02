import type { FC } from "react";
import logo from "../../assets/logo.png";

const ProfileSidebar: FC = () => {
  return (
    <div className="bg-background text-biru-tua rounded-3xl p-8 flex flex-col items-center shadow-lg">

      {/* FOTO PERUSAHAAN */}
      <div className="w-40 h-40 rounded-full bg-putih flex items-center justify-center overflow-hidden mb-6">
        <img src={logo} alt="company" className="w-full h-full object-contain" />
      </div>

      <h2 className="text-lg font-semibold mb-1">PT Indonesia Semakin Maju</h2>
      <p className="text-sm text-gray-500 mb-8">Sponsor</p>

      {/* BUTTON UPDATE LOGO */}
      <button className="w-full bg-biru-muda text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition mb-4">
        Update Logo Perusahaan
      </button>

      {/* BUTTON LOGOUT */}
      <button className="w-full bg-red-200 text-red-600 py-3 rounded-xl font-semibold hover:bg-red-300 transition">
        Keluar Akun
      </button>

      {/* LOGO BAWAH */}
      <div className="mt-12 sm:mt-20 lg:mt-auto" />

    {/* LOGO BAWAH */}
      <div className="pb-8 w-full flex justify-center">
        <div className="bg-putih px-8 py-4 rounded-full flex items-center gap-3 shadow-sm">
            <img src={logo} alt="platipus" className="w-10 h-10 object-contain" />
            <span className="text-2xl font-semibold text-emas">Platipus</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebar;
