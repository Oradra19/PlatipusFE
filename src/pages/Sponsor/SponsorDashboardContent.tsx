import EventList from "../../components/sections/EventList";
import type { EventFilter } from "../../types/Filter";

const SponsorDashboardContent = ({
  active,
  filters,
}: {
  active: "all" | "proposal";
  filters: EventFilter;
}) => {
  return <EventList mode={active} filters={filters} />;
};

export default SponsorDashboardContent;
