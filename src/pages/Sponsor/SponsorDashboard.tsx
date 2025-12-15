import type { FC } from "react";
import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import SponsorDashboardContent from "./SponsorDashboardContent";
import PopupLogin from "../../components/popup/PopupLogin";
import { getProfile } from "../../services/api";

const SponsorDashboardPage: FC = () => {
  const [active, setActive] = useState<"all" | "proposal">("all");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const res = await getProfile();
        const p = res.profile;

        const isComplete =
          p?.company_name &&
          p?.sponsor_category_id &&
          p?.sponsor_type_id &&
          p?.sponsor_scope_id &&
          p?.status;

        if (isComplete) {
          localStorage.setItem("profile_complete", "true");
          setShowPopup(false);
        } else {
          localStorage.setItem("profile_complete", "false");
          setShowPopup(true);
        }
      } catch {
        setShowPopup(true);
      }
    };

    checkProfile();
  }, []);

  return (
    <>
      {showPopup && <PopupLogin onClose={() => setShowPopup(false)} />}

      <DashboardLayout
        username=""
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
