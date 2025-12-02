import type { FC } from "react";
import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import SponsorDashboardContent from "./SponsorDashboardContent";
import PopupLogin from "../../components/popup/PopupLogin";

const SponsorDashboardPage: FC = () => {
  const [active, setActive] = useState<"all" | "proposal">("all");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const isProfileComplete = localStorage.getItem("profile_complete");

    // kalau belum ada / false → popup muncul
    if (!isProfileComplete || isProfileComplete === "false") {
      setShowPopup(true);
    }
  }, []);

  return (
    <>
      {/* === POPUP (selalu di atas semua layout) === */}
      {showPopup && (
        <PopupLogin onClose={() => setShowPopup(false)} />
      )}

      {/* === DASHBOARD === */}
      <DashboardLayout
        username="PT Indonesia Semakin Maju"
        role="sponsor"
        activeTab={active}
        onTabChange={setActive}
      >
        <SponsorDashboardContent active={active} />
      </DashboardLayout>
    </>
  );
};

export default SponsorDashboardPage;
