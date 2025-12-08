import type { FC } from "react";
import NavbarDashboard from "../../components/common/NavbarDashboard";
import Footer from "../../components/common/Footer";
import EOProfileCard from "./components/EOProfileCard";
import ProposalTable from "./components/ProposalTable";

const EODashboard: FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col font-sans">
      {/* Kita reuse NavbarDashboard. 
        Role 'eo' bisa dipakai untuk logika navigasi profil nanti.
      */}
      <NavbarDashboard username="Maulana pt event organizer" role="eo" />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-10">
        
        {/* Judul Halaman (Opsional, sesuai style Desktop-5 yang bersih) */}
        <div className="mb-6">
           <h1 className="text-2xl font-bold text-biru-tua">Dashboard Event Organizer</h1>
           <p className="text-gray-500 text-sm">Kelola profil dan proposal event kamu di sini.</p>
        </div>

        {/* Bagian Profil */}
        <EOProfileCard />

        {/* Bagian Tabel */}
        <ProposalTable />

      </main>

      <Footer />
    </div>
  );
};

export default EODashboard;