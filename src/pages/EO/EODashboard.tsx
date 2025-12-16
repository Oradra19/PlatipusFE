import type { FC } from "react";
// Hapus import useState jika tidak dipakai untuk tab
import NavbarDashboardEO from "../../components/common/NavbarDashboardEO"; 
import Footer from "../../components/common/Footer";
import EOProfileCard from "./components/EOProfileCard";
import ProposalTable from "./components/ProposalTable"; // Gunakan komponen Tabel

const EODashboard: FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col font-sans">

      <NavbarDashboardEO />

      <main className="flex-1 w-full max-w-screen-2xl mx-auto px-4 sm:px-8 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-biru-tua">
            Dashboard Event Organizer
          </h1>
          <p className="text-gray-500 mt-2">
            Kelola profil dan proposal event kamu di sini.
          </p>
        </div>

        {/* Card Profil */}
        <EOProfileCard />

        <ProposalTable />
      </main>

      <Footer />
    </div>
  );
};

export default EODashboard;