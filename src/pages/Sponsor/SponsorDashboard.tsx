import type { FC } from "react";
import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import SponsorDashboardContent from "./SponsorDashboardContent";

const SponsorDashboardPage: FC = () => {
  const [active, setActive] = useState<"all" | "proposal">("all");

  return (
    <DashboardLayout
      username="PT Indonesia Semakin Maju"
      role="sponsor"
      activeTab={active}
      onTabChange={setActive}
    >
      <SponsorDashboardContent active={active} />
    </DashboardLayout>
  );
};
export default SponsorDashboardPage;