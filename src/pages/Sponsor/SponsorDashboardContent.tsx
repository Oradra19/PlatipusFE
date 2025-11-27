import type { FC } from "react";
import EventList from "../../components/sections/EventList";
import { mockEvent, mockProposal } from "../../services/mockEvent";

const SponsorDashboardContent: FC<{ active: "all" | "proposal" }> = ({ active }) => {
  const dataToShow = active === "all" ? mockEvent : mockProposal;

  return <EventList items={dataToShow} />;
};

export default SponsorDashboardContent;
