import type { FC } from "react";
import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardEOLayout";
import EOHomeContent from "./EOHomeContent";

const EOHomePage: FC = () => {
  const [active, setActive] = useState<"all" | "proposal">("all");

  return (
    <DashboardLayout
      username="EO Indonesia"
      role="eo"
      activeTab={active}
      onTabChange={setActive}
    >
      <EOHomeContent active={active} />
    </DashboardLayout>
  );
};

export default EOHomePage;
