import type { FC } from "react";
import type { EOProposalCard } from "../../types/EOProposalCard";

const EOProposalCardView: FC<{ data: EOProposalCard }> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <div className="flex justify-between mb-4">
        <h3 className="font-bold text-lg">{data.eventName}</h3>
        <span className="text-xs px-3 py-1 rounded-full bg-gray-200">
          {data.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-2">
        Sponsor: <b>{data.sponsorName}</b>
      </p>

      {data.feedback && (
        <p className="text-sm text-gray-500 italic mb-4">
          "{data.feedback}"
        </p>
      )}

      <button className="w-full bg-gray-800 text-white py-2 rounded-lg font-semibold">
        Lihat Detail
      </button>
    </div>
  );
};

export default EOProposalCardView;
