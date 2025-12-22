import { useEffect, useState } from "react";
import type { FC } from "react";
import EventCard from "../card/EventCard";
import type { EventData } from "../../types/EventData";
import { getAllEvents, getIncomingProposals } from "../../services/apiGsn";
import type { EventFilter } from "../filters/SidebarFilter";

const statusPriority: Record<string, number> = {
  PENDING: 0,
  APPROVED: 1,
  REJECTED: 2,
};

const PaginationBox: FC<{
  current: number;
  total: number;
  onChange: (p: number) => void;
}> = ({ current, total, onChange }) => {
  const pages =
    total <= 3
      ? Array.from({ length: total }, (_, i) => i + 1)
      : [1, 2, "...", total];

  return (
    <div className="flex justify-center gap-3 mt-10">
      <button onClick={() => onChange(Math.max(1, current - 1))}>{"<"}</button>

      {pages.map((p, i) => (
        <button
          key={i}
          disabled={p === "..."}
          onClick={() => typeof p === "number" && onChange(p)}
          className={p === current ? "font-bold" : ""}
        >
          {p}
        </button>
      ))}

      <button onClick={() => onChange(Math.min(total, current + 1))}>{">"}</button>
    </div>
  );
};

const EventList: FC<{ mode: "all" | "proposal"; filters: EventFilter }> = ({
  mode,
  filters,
}) => {
  const [items, setItems] = useState<EventData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const perPage = 12;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setItems([]); // ✅ PENTING
      setPage(1);

      const eventsRes = await getAllEvents();
      const events = eventsRes.events ?? eventsRes;
      const incoming = await getIncomingProposals();
      const today = new Date();

      const eventMap = new Map(events.map((e: any) => [e.id, e]));

      // ================= PROPOSAL MODE =================
      if (mode === "proposal") {
        const allIncoming = [
          ...(incoming.fastTrack || []),
          ...(incoming.regular || []),
        ];

        const mapped: EventData[] = allIncoming
          .filter((p: any) => {
            const e = eventMap.get(p.eventId);
            return e && new Date(e.start_time) > today;
          })
          .map((p: any) => {
            const e = eventMap.get(p.eventId);
            if (!e) return null;

            return {
              id: e.id,
              title: e.name,
              location: e.location,
              date: new Date(e.start_time).toLocaleDateString("id-ID"),
              audience: e.mode,
              category: e.category,
              tags: [p.status, e.category, e.size, e.mode],
              logo: e.eo_picture_url || "/placeholder-event.png",
              isFastTrack: p.submissionType === "FAST_TRACK",
              proposalSponsorId: p.eventSponsorId,
              proposalStatus: p.status,
            };
          })
          .filter(Boolean)
          .sort(
            (a: any, b: any) =>
              statusPriority[a.proposalStatus!] -
              statusPriority[b.proposalStatus!]
          );

        setItems(mapped);
        setLoading(false);
        return;
      }

      // ================= ALL EVENTS =================
      setItems(
        events.map((e: any) => ({
          id: e.id,
          title: e.name,
          location: e.location,
          date: new Date(e.start_time).toLocaleDateString("id-ID"),
          audience: e.mode,
          category: e.category,
          tags: [e.category, e.sponsorType, e.size, e.mode],
          logo: e.eo_picture_url || "/placeholder-event.png",
          isFastTrack: false,
        }))
      );

      setLoading(false);
    };

    load();
  }, [mode]);

  // ================= FILTER =================
  const filtered = items.filter((e) => {
    if (filters.categories.length && !filters.categories.includes(e.category)) return false;
    if (filters.sponsorTypes.length && !filters.sponsorTypes.includes(e.tags[1])) return false;
    if (filters.modes.length && !filters.modes.includes(e.tags[3])) return false;
    if (filters.locations.length && !filters.locations.includes(e.location)) return false;
    return true;
  });

  const fast = filtered.filter((e) => e.isFastTrack);
  const normal = filtered.filter((e) => !e.isFastTrack);

  const total = Math.ceil(normal.length / perPage);
  const shown = normal.slice((page - 1) * perPage, page * perPage);

  // ================= UI =================
  if (loading) {
    return <div className="py-32 text-center">Memuat data...</div>;
  }

  if (!loading && mode === "proposal" && filtered.length === 0) {
    return (
      <div className="py-32 text-center text-gray-400">
        Belum ada proposal yang diajukan
      </div>
    );
  }

  return (
    <section>
      {mode === "proposal" && fast.length > 0 && (
        <section className="bg-emas/70 p-6 rounded-lg mb-10">
          <h3 className="font-bold mb-4">FAST TRACK EVENT</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fast.map((e) => (
              <EventCard key={e.id} data={e} />
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {shown.map((e) => (
          <EventCard key={e.id} data={e} />
        ))}
      </div>

      {total > 1 && (
        <PaginationBox current={page} total={total} onChange={setPage} />
      )}
    </section>
  );
};

export default EventList;
