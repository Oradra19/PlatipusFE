import type { FC } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

import { mockEvent, mockProposal } from "../../services/mockEvent";
import type { EventData } from "../../services/mockEvent";

import EventDetailLayout from "../../components/layout/EventDetailLayout";
import DetailHeader from "../../components/detail/DetailHeader";
import DetailContent from "../../components/detail/DetailContent";
import DetailInfo from "../../components/detail/DetailInfo";
import DetailContact from "../../components/detail/DetailContact";

const EventDetail: FC = () => {
  const { id } = useParams();

  useEffect(() => {
    const top = document.getElementById("page-top");
    if (top) top.scrollIntoView({ behavior: "smooth" });
  }, []);

  const allEvents: EventData[] = [...mockEvent, ...mockProposal];
  const event = allEvents.find((e) => e.id === id);
  const isProposal = mockProposal.some((p) => p.id === id);

  if (!event) {
    return (
      <EventDetailLayout username="PT Indonesia Semakin Maju">
        <div className="p-10 text-biru-tua text-xl">Event tidak ditemukan</div>
      </EventDetailLayout>
    );
  }

  return (
    <EventDetailLayout username="PT Indonesia Semakin Maju">
      {/* === HEADER (DI LUAR BOX MELENGKUNG) === */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-10 pb-6">
        <DetailHeader event={event} />
      </div>

      {/* === BOX FULL-WIDTH TANPA CARD LOOK === */}
      <div className="w-full mt-4">
        <div
          className="
      w-full
      bg-putih
      rounded-t-[48px]
      border-t-2 border-black
    "
        >
          {/* ISI DETAIL (dibatasi max-width di dalam, bukan di luar) */}
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
            <DetailContent event={event} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
              <DetailInfo event={event} />
              <DetailContact event={event} />
            </div>

            <div className="flex justify-center mt-10">
              {isProposal ? (
                <button className="px-8 py-3 border border-biru-tua text-biru-tua rounded-lg hover:bg-biru-tua hover:text-putih transition">
                  Lihat Proposal
                </button>
              ) : (
                <button className="px-8 py-3 border border-biru-tua text-biru-tua rounded-lg hover:bg-biru-tua hover:text-putih transition">
                  Lihat Proposal
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </EventDetailLayout>
  );
};

export default EventDetail;
