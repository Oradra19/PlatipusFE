import type { FC } from "react";
import DashboardTabs from "../../components/tabs/DashboardTabs";
import FastTrackEvent from "../../components/sections/FastTrackEvent";
import EventList from "../../components/sections/EventList";
import { mockEvent } from "../../services/mockEvent";

const SponsorDashboardContent: FC<{ active: "all" | "proposal" }> = ({ active }) => {
  return (
    <div className="flex flex-col gap-10">

      {active === "all" && (
        <FastTrackEvent items={mockEvent} />
      )}

      <EventList items={mockEvent} />
    </div>
  );
};


export default SponsorDashboardContent;
