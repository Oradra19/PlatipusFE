import type { FC } from "react";
import { FaFilePdf } from "react-icons/fa";
import { useState } from "react";
import type { EventData } from "../../types/EventData";
import { reviewIncomingProposal } from "../../services/apiGsn";

interface Props {
  open: boolean;
  onClose: () => void;
  event: EventData;
}

const ConfirmModal: FC<Props> = ({ open, onClose, event }) => {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open || !event.eventSponsorId) return null;

  const handleSubmit = async (decision: "ACCEPT" | "REJECT") => {
    setLoading(true);

    await reviewIncomingProposal(
      event.eventSponsorId,
      decision,
      event.isFastTrack ? feedback || null : null
    );

    setLoading(false);
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden">

        <div className="bg-biru-tua text-white py-6 text-center relative">
          <h2 className="text-2xl font-bold">Konfirmasi Proposal</h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="p-8">
          <div className="border p-4 rounded-xl flex gap-4 mb-8">
            <div className="w-12 h-12 bg-red-100 flex items-center justify-center rounded-lg">
              <FaFilePdf size={26} className="text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.location}</p>
            </div>
          </div>

          {event.isFastTrack && (
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Feedback (wajib)"
              className="w-full bg-gray-100 rounded-xl p-4 h-36 mb-8"
            />
          )}

          <div className="flex gap-4">
            <button
              disabled={loading}
              onClick={() => handleSubmit("REJECT")}
              className="w-1/2 bg-red-200 text-red-700 py-3 rounded-xl"
            >
              Tolak
            </button>

            <button
              disabled={loading}
              onClick={() => handleSubmit("ACCEPT")}
              className="w-1/2 bg-green-600 text-white py-3 rounded-xl"
            >
              Terima
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
