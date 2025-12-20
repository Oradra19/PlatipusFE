import type { FC } from "react";
import { useState, useEffect } from "react";
import type { SimpleEOCard } from "../../services/MockEventEO";
import AjukanModal from "./AjukanModal";
import ReviewResultModal from "../popup/ReviewResultModal";
import { mapReviewVariant } from "../popup/reviewVariantConfig";

export type CardMode = "browse" | "applied";

const EventCardEO: FC<{ data: SimpleEOCard; mode: CardMode }> = ({
  data,
  mode,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [openReview, setOpenReview] = useState(false);

  // 🔥 DEBUG: semua data raw
  useEffect(() => {
    Object.entries(data).forEach(([key, value]) => {
    });
    console.groupEnd();
  }, [data]);

  // Ambil status & fast track
  const status = data.status;
  const isFastTrack = data.isFastTrack ?? false;

  // Ambil feedback dari DB
  const feedback =
    (data as any).feedback ||
    (data as any).review?.feedback ||
    (data as any).proposal?.feedback ||
    "";

  // Map variant
  const reviewVariant = mapReviewVariant(status, isFastTrack);

  return (
    <div className="bg-white text-black p-6 rounded-[22px] shadow-md w-full">
      {/* 🔥 TAMBAHAN SAJA (KHUSUS APPLIED) */}
      {mode === "applied" && data.event?.name && (
        <div className="mb-3">
          <p className="text-xs text-gray-500">Event yang diajukan</p>
          <p className="text-sm font-bold text-[#071424]">
            {data.event.name}
          </p>
        </div>
      )}

      {/* === ISI CARD LAMA (TIDAK DIUBAH) === */}
      <div className="flex justify-between mb-6">
        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs">
          {data.category}
        </span>
        <span className="px-3 py-1 bg-yellow-400 rounded-full text-xs">
          {data.status}
        </span>
      </div>

      <img
        src={data.logo}
        alt="logo"
        className="w-20 h-20 object-contain mb-4"
      />

      <h3 className="text-xl font-bold mb-1">{data.brandName}</h3>
      <p className="text-gray-700 font-semibold mb-4">
        {data.companyName}
      </p>

      <p className="text-sm text-gray-600 mb-6">{data.description}</p>

      <div className="mb-4">
        <p className="font-semibold text-sm mb-2">Tipe Sponsor</p>
        <div className="flex gap-2 flex-wrap">
          {data.sponsorTypes.map((t, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-900 text-white text-xs rounded-full"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="font-semibold text-sm mb-2">Cakupan</p>
        <span className="px-3 py-1 bg-blue-900 text-white text-xs rounded-full">
          {data.coverage}
        </span>
      </div>

      <div className="mb-6">
        <p className="font-semibold text-sm mb-2">Budget</p>
        <span className="px-3 py-1 bg-green-500 text-white text-xs rounded-full">
          {data.budget}
        </span>
      </div>

      {mode === "browse" ? (
        <button
          onClick={() => setOpenModal(true)}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
        >
          Ajukan
        </button>
      ) : (
        <button
          onClick={() => setOpenReview(true)}
          className="w-full bg-gray-800 text-white py-3 rounded-xl font-semibold"
        >
          Lihat Review
        </button>
      )}

      <AjukanModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        sponsorId={data.id}
      />

      <ReviewResultModal
        open={openReview}
        onClose={() => setOpenReview(false)}
        variant={reviewVariant}
        feedback={feedback.trim() !== "" ? feedback : "Belum ada feedback"} // feedback selalu tampil
      />
    </div>
  );
};

export default EventCardEO;
