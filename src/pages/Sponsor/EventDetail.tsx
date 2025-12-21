import type { FC } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import EventDetailLayout from "../../components/layout/EventDetailLayout";
import DetailHeader from "../../components/detail/DetailHeader";
import DetailContent from "../../components/detail/DetailContent";
import DetailInfo from "../../components/detail/DetailInfo";
import DetailContact from "../../components/detail/DetailContact";
import { getEventById } from "../../services/api";
import { getIncomingProposals } from "../../services/apiGsn";
import type { EventData } from "../../types/EventData";

const EventDetail: FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const fromProposal = location.state?.fromProposal === true;

  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) return;

      const data = await getEventById(id);
      const incoming = await getIncomingProposals();

      const allIncoming = [
        ...(incoming.fastTrack || []),
        ...(incoming.regular || []),
      ];

      const proposal = allIncoming.find((p: any) => p.eventId === id);

      const mapped: EventData = {
        id: data.id,
        title: data.name,
        location: data.location,
        date: new Date(data.start_time).toLocaleDateString("id-ID"),
        audience: data.target,
        description: data.description,
        tags: [data.category, data.sponsorType, data.size, data.mode],
        logo: "/placeholder-event.png",
        image: data.image_url || "/Logo.png",
        proposalUrl: data.proposal_url || undefined,

        isFromIncoming: fromProposal,
        isFastTrack: proposal?.submissionType === "FAST_TRACK",
        eventSponsorId: proposal?.eventSponsorId,
      };

      setEvent(mapped);
      setLoading(false);
    };

    load();
  }, [id, fromProposal]);

  if (loading) {
    return (
      <EventDetailLayout username="PT Indonesia Semakin Maju">
        <div className="p-20 text-center">Memuat detail event...</div>
      </EventDetailLayout>
    );
  }

  if (!event) {
    return (
      <EventDetailLayout username="PT Indonesia Semakin Maju">
        <div className="p-20 text-center">Event tidak ditemukan</div>
      </EventDetailLayout>
    );
  }

  return (
    <EventDetailLayout username="PT Indonesia Semakin Maju">
      <div className="max-w-7xl mx-auto px-6 pt-10">
        <DetailHeader event={event} />
      </div>

      <div className="bg-putih rounded-t-[48px] border-t-2 border-black mt-6">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <DetailContent event={event} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
            <DetailInfo event={event} />
            <DetailContact event={event} />
          </div>

          <div className="flex justify-center gap-4 mt-10">
            {event.proposalUrl && (
              <a
                href={event.proposalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border border-biru-tua rounded-lg hover:bg-biru-tua hover:text-putih transition"
              >
                Lihat Proposal
              </a>
            )}
          </div>
        </div>
      </div>
    </EventDetailLayout>
  );
};

export default EventDetail;
