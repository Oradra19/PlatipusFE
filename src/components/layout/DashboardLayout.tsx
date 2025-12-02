import type { FC, ReactNode } from "react";
import NavbarDashboard from "../common/NavbarDashboard";
import DashboardHero from "../hero/DashboardHero";
import SidebarFilter from "../filters/SidebarFilter";
import DashboardTabs from "../tabs/DashboardTabs";
import Footer from "../common/Footer";

interface DashboardLayoutProps {
  username: string;
  role: "sponsor" | "eo";
  children: ReactNode;
  activeTab?: "all" | "proposal";
  onTabChange?: (v: "all" | "proposal") => void;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({
  username,
  role,
  children,
  activeTab,
  onTabChange,
}) => {
  return (
    <div className="min-h-screen bg-biru-tua text-white">
      {/* NAV + HERO */}
      <NavbarDashboard username={username} role="sponsor" />
      <DashboardHero username={username} />

      {/* BAGIAN LENGKUNG (Rounded top: 60px) */}
      <div className="w-full bg-biru-tua rounded-t-[60px] -mt-10 pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* TABS DI SINI */}
          {activeTab && onTabChange && (
            <DashboardTabs active={activeTab} onChange={onTabChange} />
          )}

          {/* CONTENT ROW */}
          <div className="flex flex-col lg:flex-row gap-8 mt-8">
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
