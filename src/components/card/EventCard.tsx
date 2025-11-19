import type { FC } from "react";
import type { EventData } from "../../services/mockEvent";

const EventCard: FC<{ data: EventData }> = ({ data }) => (
  <div className="bg-white text-black p-6 rounded-2xl shadow-lg border min-h-[260px] flex flex-col justify-between">
    <div>
      <div className="flex gap-2 mb-3">
        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
          Teknologi
        </span>
        <span className="px-3 py-1 bg-yellow-200 rounded-full text-xs">
          Open Sponsorship
        </span>
      </div>
      <img
        src={data.logo}
        alt="logo"
        className="w-24 h-24 object-contain mb-3"
      />
      <h3 className="font-semibold text-lg">{data.title}</h3>
      <p className="text-sm opacity-70 mt-1">
        {data.location} · {data.date} · {data.audience}
      </p>
      <div className="flex flex-wrap gap-2 mt-4">
        {data.tags.map((tag) => (
          <span key={tag} className="px-2 py-1 text-xs bg-gray-100 rounded">
            {tag}
          </span>
        ))}
      </div>
    </div>
    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg w-full">
      Lihat Detail
    </button>
  </div>
);
export default EventCard;
