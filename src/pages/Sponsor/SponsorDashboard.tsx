import type { FC } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import SponsorDashboardContent from "./SponsorDashboardContent";

const SponsorDashboardPage: FC = () => {
  return (
    <DashboardLayout username="PT Indonesia Semakin Maju" role="sponsor">
      <SponsorDashboardContent />
    </DashboardLayout>
  );
};
export default SponsorDashboardPage;
