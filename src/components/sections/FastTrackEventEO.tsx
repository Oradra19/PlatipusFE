import type { FC } from "react";
import EventCardEO from "../card/EventCardEO";
import type { SimpleEOCard } from "../../services/MockEventEO";

const FastTrackEventEO: FC<{ items: SimpleEOCard[] }> = ({ items }) => (
  <section className="bg-emas/70 p-6 rounded-lg mb-10">
    <div className="max-w-7xl mx-auto">
      <div className="inline-block text-putih font-bold px-3 py-1 rounded-t-md font-semibold mb-4">
        FAST TRACK EVENT
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((e) => (
          <EventCardEO key={e.id} data={e} />
        ))}
      </div>
    </div>
  </section>
);

export default FastTrackEventEO;