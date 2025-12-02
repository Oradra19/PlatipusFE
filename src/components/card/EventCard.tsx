import type { FC } from "react";
import type { EventData } from "../../services/mockEvent";
import { useNavigate } from "react-router-dom";

const EventCard: FC<{ data: EventData }> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-black p-6 rounded-[22px] shadow-md hover:shadow-lg transition w-full max-w-full">

      {/* TOP LABELS */}
      <div className="flex items-center justify-between w-full mb-6 flex-wrap gap-3">
        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium whitespace-nowrap">
          Teknologi
        </span>
        <span className="px-3 py-1 bg-yellow-400 rounded-full text-xs font-medium whitespace-nowrap">
          Open Sponsorship
        </span>
      </div>

      {/* LOGO */}
      <img
        src={data.logo}
        alt="logo"
        className="w-20 h-20 object-contain mb-4"
      />

      {/* TITLE */}
      <h3 className="font-semibold text-xl mb-5 leading-snug">
        {data.title}
      </h3>

      {/* GRID ROWS */}
      <div className="flex flex-col gap-6">

        {/* Lokasi */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Lokasi</span>
          <span className="px-3 py-1 bg-[#0F1F3D] text-white rounded-full text-xs w-fit whitespace-nowrap">
            {data.location}
          </span>
        </div>

        {/* Acara berlangsung */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Acara Berlangsung</span>
          <span className="px-3 py-1 bg-[#0F1F3D] text-white rounded-full text-xs w-fit whitespace-nowrap">
            {data.date}
          </span>
        </div>

        {/* Audience — Kebutuhan — Ukuran */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Detail Event</span>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-yellow-400 text-black rounded-full text-xs whitespace-nowrap">
              {data.audience}
            </span>
            <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs whitespace-nowrap">
              {data.tags[0]}
            </span>
            <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs whitespace-nowrap">
              {data.tags[2]}
            </span>
          </div>
        </div>

        {/* Informasi tambahan */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Informasi Tambahan</span>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs whitespace-nowrap">
              {data.tags[3]}
            </span>
            <span className="px-3 py-1 bg-[#0F1F3D] text-white rounded-full text-xs whitespace-nowrap">
              {data.tags[1]}
            </span>
          </div>
        </div>

      </div>

      {/* BUTTON → navigate ke detail */}
      <button
        onClick={() => navigate(`/dashboard/sponsor/event/${data.id}`)}
        className="mt-8 bg-biru-muda/90 text-white px-4 py-3 rounded-xl w-full font-semibold hover:bg-blue-700 transition"
      >
        Lihat Detail
      </button>
    </div>
  );
};

export default EventCard;
