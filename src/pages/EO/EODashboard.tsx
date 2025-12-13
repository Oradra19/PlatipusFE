import type { FC } from "react";
import NavbarDashboard from "../../components/common/NavbarDashboardEO";
import Footer from "../../components/common/Footer";
import EOProfileCard from "./components/EOProfileCard";
import ProposalTable from "./components/ProposalTable";

const EODashboard: FC = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col font-sans">
      
      {/* ✅ Navbar sekarang ambil user langsung dari localStorage */}
      <NavbarDashboard />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-10">
        
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-biru-tua">
            Dashboard Event Organizer
          </h1>
          <p className="text-gray-500 text-sm">
            Kelola profil dan proposal event kamu di sini.
          </p>
        </div>

        <EOProfileCard />
        <ProposalTable />
      </main>

      <Footer />
    </div>
  );
};

export default EODashboard;
