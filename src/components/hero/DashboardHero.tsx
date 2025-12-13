import type { FC } from "react";
import logo from "../../assets/logo.png";

const DashboardHero: FC = () => {
  // 🔐 Ambil user dari localStorage
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;

  const username = parsedUser?.name || "Pengguna";

  return (
    <section className="bg-putih text-biru-tua py-32">
      <div
        className="
          max-w-7xl mx-auto px-4
          flex flex-col sm:flex-row
          items-center justify-center
          gap-6 sm:gap-10
          text-center
        "
      >
        <img
          src={logo}
          alt="hero"
          className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 object-contain"
        />

        <div className="text-center sm:text-left">
          <h2 className="text-2xl text-biru-tua sm:text-3xl font-semibold mb-1 leading-tight">
            Selamat Datang di Platipus
          </h2>
          <p className="text-base text-biru-tua sm:text-lg opacity-80">
            {username}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DashboardHero;
