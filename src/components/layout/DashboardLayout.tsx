import type { FC, ReactNode } from "react";
import NavbarDashboard from "../common/NavbarDashboard";
import DashboardHero from "../hero/DashboardHero";
import SidebarFilter from "../filters/SidebarFilter";
import Footer from "../common/Footer";

interface DashboardLayoutProps {
  username: string;
  role: "sponsor" | "eo";
  children: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({
  username,
  role,
  children,
}) => {
  return (
    <div className="min-h-screen bg-biru-tua text-white">
      <NavbarDashboard username={username} />
      <DashboardHero username={username} />
      <div className="w-full bg-biru-tua rounded-t-[60px] mt-[-40px] pt-14 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-72 w-full">
              <SidebarFilter />
            </div>
            <div className="flex-1 min-w-[calc(100%-18rem)]">{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
