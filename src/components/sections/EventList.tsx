import { useEffect, useState } from "react";
import type { FC } from "react";
import EventCard from "../card/EventCard";
import type { EventData } from "../../types/EventData";
import {
  getAllEvents,
  getIncomingProposals,
  getFastTrackEvents,
} from "../../services/api";

const PaginationBox: FC<{
  current: number;
  total: number;
  onChange: (p: number) => void;
}> = ({ current, total, onChange }) => {
  const generatePages = () => {
    if (total <= 3) return Array.from({ length: total }, (_, i) => i + 1);
    return [1, 2, "...", total];
  };

  const pages = generatePages();

  return (
    <div className="flex justify-center gap-3 mt-10">
      <button
        className="border rounded-md w-10 h-10"
        onClick={() => onChange(Math.max(1, current - 1))}
      >
        {"<"}
      </button>

      {pages.map((p, i) => (
        <button
          key={i}
          disabled={p === "..."}
          onClick={() => typeof p === "number" && onChange(p)}
          className={`border rounded-md w-10 h-10 ${
            p === current ? "bg-white text-black font-bold" : ""
          }`}
        >
          {p}
        </button>
      ))}

      <button
        className="border rounded-md w-10 h-10"
        onClick={() => onChange(Math.min(total, current + 1))}
      >
        {">"}
      </button>
    </div>
  );
};

const EventList: FC<{ mode: "all" | "proposal" }> = ({ mode }) => {
  const [items, setItems] = useState<EventData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const perPage = 12;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setItems([]);
      setPage(1);

      const events = await getAllEvents();
      const fastTrack = await getFastTrackEvents();
      const fastIds = fastTrack.map((f: any) => f.event_id);
      const eventMap = new Map(events.map((e: any) => [e.id, e]));

      if (mode === "proposal") {
        const incoming = await getIncomingProposals();

        const mapped: EventData[] = incoming
          .map((p: any) => {
            const e = eventMap.get(p.event.id);
            if (!e) return null;

            return {
              id: e.id,
              title: e.name,
              location: e.location,
              date: new Date(e.start_time).toLocaleDateString("id-ID"),
              audience: e.mode,
              tags: [p.status, e.category, e.size, e.mode],
              logo: "/placeholder-event.png",
              isFastTrack: fastIds.includes(e.id),
            };
          })
          .filter(Boolean);

        setItems(mapped);
        setLoading(false);
        return;
      }

      const mapped: EventData[] = events.map((e: any) => ({
        id: e.id,
        title: e.name,
        location: e.location,
        date: new Date(e.start_time).toLocaleDateString("id-ID"),
        audience: e.mode,
        tags: [e.category, e.sponsorType, e.size, e.mode],
        logo: "/placeholder-event.png",
        isFastTrack: fastIds.includes(e.id),
      }));

      setItems(mapped);
      setLoading(false);
    };

    load();
  }, [mode]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <span className="text-gray-400 font-semibold">Memuat data...</span>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center text-gray-400 py-20">
        Belum ada data untuk ditampilkan
      </div>
    );
  }

  const fast = items.filter((e) => e.isFastTrack);
  const normal = items.filter((e) => !e.isFastTrack);

  const total = Math.ceil(normal.length / perPage);
  const start = (page - 1) * perPage;
  const shownNormal = normal.slice(start, start + perPage);

  return (
    <section className="max-w-7xl mx-auto">
      {fast.length > 0 && (
        <section className="bg-emas/70 p-6 rounded-lg mb-10">
          <div className="inline-block text-putih font-bold px-3 py-1 rounded-t-md mb-4">
            FAST TRACK EVENT
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fast.map((e) => (
              <EventCard key={e.id} data={e} />
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {shownNormal.map((e) => (
          <EventCard key={e.id} data={e} />
        ))}
      </div>

      <PaginationBox current={page} total={total} onChange={setPage} />
    </section>
  );
};

export default EventList;
