import type { FC } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EventDetailLayout from "../../components/layout/EventDetailLayout";
import DetailHeader from "../../components/detail/DetailHeader";
import DetailContent from "../../components/detail/DetailContent";
import DetailInfo from "../../components/detail/DetailInfo";
import DetailContact from "../../components/detail/DetailContact";
import {
  getEventById,
  getFastTrackEvents,
  getIncomingProposals,
} from "../../services/api";
import type { EventData } from "../../types/EventData";

const EventDetail: FC = () => {
  const { id } = useParams();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!id) return;

      const data = await getEventById(id);
      const fast = await getFastTrackEvents();
      const incoming = await getIncomingProposals();

      const fastIds = fast.map((f: any) => f.event_id);

      const proposal = incoming.find(
        (p: any) => p.event.id === id
      );

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
        isFastTrack: fastIds.includes(data.id),
        proposalSponsorId: proposal?.proposalSponsorId,
        proposalId: proposal?.proposalId,
        sponsorProfileId: proposal?.sponsorProfileId,
      };

      setEvent(mapped);
      setLoading(false);
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <EventDetailLayout username="PT Indonesia Semakin Maju">
        <div className="p-20 text-center text-biru-tua">
          Memuat detail event...
        </div>
      </EventDetailLayout>
    );
  }

  if (!event) {
    return (
      <EventDetailLayout username="PT Indonesia Semakin Maju">
        <div className="p-20 text-center text-biru-tua">
          Event tidak ditemukan
        </div>
      </EventDetailLayout>
    );
  }

  return (
    <EventDetailLayout username="PT Indonesia Semakin Maju">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-10 pb-6">
        <DetailHeader event={event} />
      </div>

      <div className="w-full mt-4">
        <div className="w-full bg-putih rounded-t-[48px] border-t-2 border-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
            <DetailContent event={event} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-12">
              <DetailInfo event={event} />
              <DetailContact event={event} />
            </div>
            <div className="flex justify-center mt-10">
              <button className="px-8 py-3 border border-biru-tua text-biru-tua rounded-lg hover:bg-biru-tua hover:text-putih transition">
                Lihat Proposal
              </button>
            </div>
          </div>
        </div>
      </div>
    </EventDetailLayout>
  );
};

export default EventDetail;
