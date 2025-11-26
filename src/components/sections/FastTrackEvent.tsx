import type { FC } from "react";
import EventCard from "../card/EventCard";
import type { EventData } from "../../services/mockEvent";

const FastTrackEvent: FC<{ items: EventData[] }> = ({ items }) => (
  <section className="bg-emas/70 p-6 rounded-lg mb-10">
    <div className="max-w-7xl mx-auto">
      <div className="inline-block text-putih font-bold px-3 py-1 rounded-t-md font-semibold mb-4">
        FAST TRACK EVENT
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((e) => (
          <EventCard key={e.id} data={e} />
        ))}
      </div>
    </div>
  </section>
);

export default FastTrackEvent;