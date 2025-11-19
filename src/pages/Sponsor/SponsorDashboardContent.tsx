import type { FC } from "react";
import { useState } from "react"; 
import DashboardTabs from "../../components/tabs/DashboardTabs";
import FastTrackEvent from "../../components/sections/FastTrackEvent";
import EventList from "../../components/sections/EventList";
import { mockEvent } from "../../services/mockEvent";

const SponsorDashboardContent: FC = () => {
  const [active, setActive] = useState<"all" | "proposal">("all");

  return (
    <div className="mt-6">
      <div className="max-w-7xl mx-auto px-4">
        <DashboardTabs active={active} onChange={(v) => setActive(v)} />

        {active === "all" && <FastTrackEvent items={mockEvent} />}

        <div className="border-t border-dashed border-gray-300 my-8" />

        <EventList items={mockEvent} />
      </div>
    </div>
  );
};
export default SponsorDashboardContent;
