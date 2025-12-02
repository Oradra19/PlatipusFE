import type { FC } from "react";
import NavbarDashboard from "../../components/common/NavbarDashboard";
import Footer from "../../components/common/Footer";

import ProfileSidebar from "../../components/profile/ProfileSidebar";
import ProfileForm from "../../components/profile/ProfileForm";

const SponsorProfile: FC = () => {
  return (
    <div className="min-h-screen bg-biru-tua text-white flex flex-col">
      {/* NAVBAR */}
      <NavbarDashboard username="PT Indonesia Semakin Maju" role="sponsor"/>

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-10">
          <ProfileSidebar />
          <ProfileForm />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SponsorProfile;
