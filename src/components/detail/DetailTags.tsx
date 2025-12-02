import type { FC } from "react";
import type { EventData } from "../../services/mockEvent";

const Tag = ({ text }: { text: string }) => (
  <span className="px-4 py-2 text-xs bg-white text-biru-tua rounded-lg border border-gray-300 font-medium">
    {text}
  </span>
);

const DetailTags: FC<{ event: EventData }> = ({ event }) => {
  return (
    <div className="flex flex-wrap gap-3 mt-6">
      <Tag text={`Mode : ${event.tags[3]}`} />
      <Tag text={`Skala : ${event.tags[2]}`} />
      <Tag text={`Jenis Sponsorship : ${event.tags[1]}`} />
    </div>
  );
};

export default DetailTags;
