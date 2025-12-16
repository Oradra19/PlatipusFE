import type { FC } from "react";
import { FaFilePdf } from "react-icons/fa";
import { useState } from "react";
import type { EventData } from "../../types/EventData";
import { submitProposalFeedback } from "../../services/api";
import { sendProposalDecision } from "../../services/api";

interface Props {
  open: boolean;
  onClose: () => void;
  event: EventData;
}

const ConfirmModal: FC<Props> = ({ open, onClose, event }) => {
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const isFastTrack = event.isFastTrack === true;

  const handleSubmit = async () => {
    if (!event.proposalId || !event.sponsorProfileId) return;

    setLoading(true);

    await sendProposalDecision(
      event.proposalId,
      event.sponsorProfileId,
      isFastTrack ? feedback : undefined
    );

    setLoading(false);
    onClose();
    window.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-xl overflow-hidden relative">
        <div className="bg-biru-tua text-white text-center py-6 relative">
          <h2 className="text-2xl font-bold">Detail Event</h2>
          <div className="w-full h-2 bg-emas absolute bottom-0 left-0"></div>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/70 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        <div className="p-8">
          <div className="border rounded-xl p-4 flex items-start gap-4 shadow-sm mb-8">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <FaFilePdf size={26} className="text-red-600" />
            </div>

            <div>
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.location}</p>
            </div>
          </div>

          {isFastTrack && (
            <div className="mb-10">
              <label className="font-medium text-sm">
                Tanggapan<span className="text-red-500">*</span>
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full mt-2 bg-gray-100 rounded-xl p-4 h-40 outline-none"
                placeholder="Berikan tanggapan mengenai event"
              />
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
            <button
              disabled={loading}
              onClick={() => handleSubmit("REJECTED")}
              className="w-full sm:w-1/2 py-3 bg-red-200 text-red-700 font-semibold rounded-xl hover:bg-red-300 transition disabled:opacity-60"
            >
              Tolak Event
            </button>

            <button
              disabled={loading}
              onClick={() => handleSubmit("ACCEPTED")}
              className="w-full sm:w-1/2 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition disabled:opacity-60"
            >
              Terima Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
