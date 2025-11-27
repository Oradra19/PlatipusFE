import { useState } from "react";
import type { FC } from "react";
import type { EventData } from "../../services/mockEvent";
import EventCard from "../card/EventCard";

const PaginationBox: FC<{ current: number; total: number; onChange: (p: number) => void }> = ({
  current,
  total,
  onChange,
}) => {
  const generatePages = () => {
    if (total <= 3) return Array.from({ length: total }, (_, i) => i + 1);
    return [1, 2, "...", total];
  };

  const pages = generatePages();

  return (
    <div className="flex justify-center gap-3 mt-10">
      <button className="border rounded-md w-10 h-10" onClick={() => onChange(Math.max(1, current - 1))}>
        {"<"}
      </button>

      {pages.map((p, i) => (
        <button
          key={i}
          disabled={p === "..."}
          onClick={() => typeof p === "number" && onChange(p)}
          className={`border rounded-md w-10 h-10 ${p === current ? "bg-white text-black font-bold" : ""}`}
        >
          {p}
        </button>
      ))}

      <button className="border rounded-md w-10 h-10" onClick={() => onChange(Math.min(total, current + 1))}>
        {">"}
      </button>
    </div>
  );
};

const EventList: FC<{ items: EventData[] }> = ({ items }) => {
  const [page, setPage] = useState(1);
  const perPage = 12;

  // pisah fasttrack & normal
  const fast = items.filter(e => e.isFastTrack);
  const normal = items.filter(e => !e.isFastTrack);

  // gabung supaya diurutkan fast dulu
  const combined = [...fast, ...normal];

  // total halaman
  const total = Math.ceil(combined.length / perPage);

  // slice per halaman
  const start = (page - 1) * perPage;
  const end   = start + perPage;
  const shown = combined.slice(start, end);

  // pada halaman ini
  const fastOnPage   = shown.filter(e => e.isFastTrack);
  const normalOnPage = shown.filter(e => !e.isFastTrack);

  return (
    <section className="max-w-7xl mx-auto">

      {/* ==== FASTTRACK BLOCK ==== */}
      {fastOnPage.length > 0 && (
        <section className="bg-emas/70 p-6 rounded-lg mb-10">
          <div className="inline-block text-putih font-bold px-3 py-1 rounded-t-md mb-4">
            FAST TRACK EVENT
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fastOnPage.map(e => (
              <EventCard key={e.id} data={e} />
            ))}
          </div>
        </section>
      )}

      {/* ==== NORMAL BLOCK ==== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {normalOnPage.map(e => (
          <EventCard key={e.id} data={e} />
        ))}
      </div>

      <PaginationBox current={page} total={total} onChange={setPage} />
    </section>
  );
};


export default EventList;
