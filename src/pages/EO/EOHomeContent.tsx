import type { FC } from "react";
import EventListEO from "../../components/sections/EventListEO";
import { mockSimpleEO, mockSimpleProposal } from "../../services/MockEventEO";

const EOHomeContent: FC<{ active: "all" | "proposal" }> = ({ active }) => {
  const dataToShow = active === "all" ? mockSimpleEO : mockSimpleProposal;

  return <EventListEO items={dataToShow} />;
};

export default EOHomeContent;
