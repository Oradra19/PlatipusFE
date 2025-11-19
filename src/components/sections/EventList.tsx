import { useState } from "react";
import type { FC } from "react";
import type { EventData } from "../../services/mockEvent";
import EventCard from "../card/EventCard";

const PaginationBox: FC<{
  current: number;
  total: number;
  onChange: (p: number) => void;
}> = ({ current, total, onChange }) => {
  const pages = [1, 2, "...", total - 1, total] as (number | string)[];
  return (
    <div className="flex justify-center gap-4 mt-10">
      <button
        className="border rounded-md w-10 h-10"
        onClick={() => onChange(Math.max(1, current - 1))}
      >
        {"<"}
      </button>
      {pages.map((p, i) => (
        <button
          key={i}
          onClick={() => typeof p === "number" && onChange(p)}
          className={`border rounded-md w-10 h-10 ${
            p === current ? "bg-white text-black" : ""
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

const EventList: FC<{ items: EventData[] }> = ({ items }) => {
  const [page, setPage] = useState(1);
  const perPage = 6;
  const total = Math.max(1, Math.ceil(items.length / perPage));

  const shown = items.slice((page - 1) * perPage, page * perPage);

  return (
    <section className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {shown.map((e) => (
          <EventCard key={e.id} data={e} />
        ))}
      </div>

      <PaginationBox
        current={page}
        total={total}
        onChange={(p) => setPage(p)}
      />
    </section>
  );
};
export default EventList;
