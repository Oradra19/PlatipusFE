import type { FC } from "react";
import type { SimpleEOCard } from "../../services/MockEventEO";
import { useNavigate } from "react-router-dom";

const EventCard: FC<{ data: SimpleEOCard }> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white text-black p-6 rounded-[22px] shadow-md hover:shadow-lg transition w-full max-w-full">

      {/* TOP LABELS */}
      <div className="flex items-center justify-between w-full mb-6 flex-wrap gap-3">
        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium whitespace-nowrap">
          {data.category}
        </span>
        <span className="px-3 py-1 bg-yellow-400 rounded-full text-xs font-medium whitespace-nowrap">
          {data.status}
        </span>
      </div>

      {/* LOGO */}
      <img
        src={data.logo}
        alt="logo"
        className="w-20 h-20 object-contain mb-4"
      />

      {/* BRAND NAME */}
      <h3 className="text-2xl font-bold mb-2 leading-tight">
        {data.brandName}
      </h3>

      {/* COMPANY NAME */}
      <p className="text-gray-700 font-semibold mb-4">
        {data.companyName}
      </p>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-600 leading-relaxed mb-6">
        {data.description}
      </p>

      {/* SPONSOR TYPES */}
      <div className="flex flex-col gap-2 mb-4">
        <span className="text-sm font-semibold">Tipe Sponsor</span>
        <div className="flex flex-wrap gap-2">
          {data.sponsorTypes.map((type, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-900 text-white rounded-full text-xs whitespace-nowrap"
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {/* COVERAGE */}
      <div className="flex flex-col gap-2 mb-4">
        <span className="text-sm font-semibold">Cakupan Sponsor</span>
        <span className="px-3 py-1 bg-blue-900 text-white rounded-full text-xs w-fit">
          {data.coverage}
        </span>
      </div>

      {/* BUDGET */}
      <div className="flex flex-col gap-2 mb-6">
        <span className="text-sm font-semibold">Budget</span>
        <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs w-fit">
          {data.budget}
        </span>
      </div>

      {/* BUTTON → navigate ke detail */}
      <button
        onClick={() => navigate(`/dashboard/sponsor/event/${data.id}`)}
        className="mt-4 bg-blue-600 text-white px-4 py-3 rounded-xl w-full font-semibold hover:bg-blue-700 transition"
      >
        Ajukan
      </button>
    </div>
  );
};

export default EventCard;
