import type { FC } from "react";
import type { EventData } from "../../services/mockEvent";

const EventCard: FC<{ data: EventData }> = ({ data }) => {
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

      {/* ======================= GRID — RAPIII ======================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-6">

        {/* === Lokasi === */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Lokasi</span>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-[#0F1F3D] text-white rounded-full text-xs whitespace-nowrap">
              {data.location}
            </span>
          </div>
        </div>

        {/* === Acara Berlangsung === */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Acara Berlangsung</span>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-[#0F1F3D] text-white rounded-full text-xs whitespace-nowrap">
              {data.date}
            </span>
          </div>
        </div>

        {/* === Target Audiens === */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Target Audiens</span>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-yellow-400 text-black rounded-full text-xs whitespace-nowrap">
              {data.audience}
            </span>
          </div>
        </div>

        {/* === Kebutuhan === */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Kebutuhan</span>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-green-600 text-white rounded-full text-xs whitespace-nowrap">
              {data.tags[0]}
            </span>
          </div>
        </div>

        {/* === Jenis Sponsor === */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Jenis Sponsor</span>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-[#0F1F3D] text-white rounded-full text-xs whitespace-nowrap">
              {data.tags[1]}
            </span>
          </div>
        </div>

        {/* === Ukuran Event === */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Ukuran Event</span>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-xs whitespace-nowrap">
              {data.tags[2]}
            </span>
          </div>
        </div>

        {/* === Mode Event === */}
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold">Mode Event</span>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-red-500 text-white rounded-full text-xs whitespace-nowrap">
              {data.tags[3]}
            </span>
          </div>
        </div>

      </div>

      {/* BUTTON */}
      <button className="mt-8 bg-blue-600 text-white px-4 py-3 rounded-xl w-full font-semibold hover:bg-blue-700 transition">
        Lihat Detail
      </button>
    </div>
  );
};

export default EventCard;
