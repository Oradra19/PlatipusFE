import type { FC } from "react";
import EventListEO from "../../components/sections/EventListEO";

const EOHomeContent: FC<{ active: "all" | "proposal" }> = ({ active }) => {
  return <EventListEO mode={active} />;
};

export default EOHomeContent;
