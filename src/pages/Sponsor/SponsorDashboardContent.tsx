import type { FC } from "react";
import EventList from "../../components/sections/EventList";

const SponsorDashboardContent: FC<{ active: "all" | "proposal" }> = ({ active }) => {
  return <EventList mode={active} />;
};

export default SponsorDashboardContent;
