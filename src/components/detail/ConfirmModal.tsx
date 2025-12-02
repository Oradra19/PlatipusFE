import { FC } from "react";
import { FaFilePdf } from "react-icons/fa";
import type { EventData } from "../../services/mockEvent";

interface Props {
  open: boolean;
  onClose: () => void;
  event: EventData;
}

const ConfirmModal: FC<Props> = ({ open, onClose, event }) => {
  if (!open) return null;

  const isFastTrack = event.isFastTrack === true;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-xl overflow-hidden relative">

        {/* 🔥 HEADER BARU */}
        <div className="bg-biru-tua text-white text-center py-6 relative">
          <h2 className="text-2xl font-bold">Detail Event</h2>
          <div className="w-full h-2 bg-emas absolute bottom-0 left-0"></div>

          {/* tombol close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-white/70 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-8">

          {/* PDF CARD */}
          <div className="border rounded-xl p-4 flex items-start gap-4 shadow-sm mb-8">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <FaFilePdf size={26} className="text-red-600" />
            </div>

            <div>
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.location}</p>
              <p className="text-xs text-gray-500 mt-1">
                {event.eoName || "Unknown"} — {event.eoEmail || "event@mail.com"}
              </p>
            </div>
          </div>

          {/* FASTTRACK TEXTAREA */}
          {isFastTrack && (
            <div className="mb-10">
              <label className="font-medium text-sm">
                Tanggapan<span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full mt-2 bg-gray-100 rounded-xl p-4 h-40 outline-none"
                placeholder="Berikan tanggapan mengenai event"
              ></textarea>
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6">
            <button className="w-full sm:w-1/2 py-3 bg-red-200 text-red-700 font-semibold rounded-xl hover:bg-red-300 transition">
              Tolak Event
            </button>

            <button className="w-full sm:w-1/2 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition">
              Terima Event
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ConfirmModal;
