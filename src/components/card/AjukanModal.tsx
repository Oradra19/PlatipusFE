import { useEffect, useState } from "react";
import type { FC } from "react";
import { getMyEvents, submitProposal } from "../../services/api";

interface AjukanModalProps {
  open: boolean;
  onClose: () => void;
  sponsorId: string;
}

interface EventItem {
  id: string;
  name: string;
}

const AjukanModal: FC<AjukanModalProps> = ({
  open,
  onClose,
  sponsorId,
}) => {
  const [track, setTrack] = useState<"regular" | "fast">("regular");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [loading, setLoading] = useState(false);

  // ALERT STATE
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (!open) return;

    const fetchEvents = async () => {
      try {
        const res = await getMyEvents();
        setEvents(res.data || []);
      } catch (err) {
        console.error("FETCH EVENTS ERROR:", err);
      }
    };

    fetchEvents();
  }, [open]);

  if (!open) return null;

  const handleSubmit = async () => {
    if (!selectedEventId) return;

    setLoading(true);
    setAlertMessage("");

    try {
      await submitProposal(selectedEventId, {
        sponsorId,
        submissionType:
          track === "fast" ? "FAST_TRACK" : "REGULAR",
      });

      onClose();
    } catch (err: any) {
      console.error("SUBMIT ERROR:", err);

      const message =
        err?.response?.data?.message ||
        "Event ini sudah pernah diajukan ke sponsor ini";

      setAlertMessage(message);
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* MAIN MODAL */}
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
        <div className="relative w-full max-w-xl rounded-[28px] bg-white p-8 border-4 border-yellow-500">

          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-red-600 text-xl font-bold"
          >
            ✕
          </button>

          {/* EVENT DROPDOWN */}
          <div className="mb-6">
            <label className="font-semibold text-sm">
              Pilih Event
            </label>
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="w-full mt-2 border rounded-xl px-4 py-3"
            >
              <option value="">-- Pilih Event --</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.name}
                </option>
              ))}
            </select>
          </div>

          {/* TRACK */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setTrack("regular")}
              className={`px-6 py-2 rounded-xl ${
                track === "regular"
                  ? "bg-yellow-500 text-white"
                  : "bg-yellow-200"
              }`}
            >
              Reguler
            </button>

            <button
              onClick={() => setTrack("fast")}
              className={`px-6 py-2 rounded-xl ${
                track === "fast"
                  ? "bg-blue-600 text-white"
                  : "bg-blue-200"
              }`}
            >
              Fast Track
            </button>
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={!selectedEventId || loading}
            className="w-full bg-green-500 text-white py-3 rounded-xl font-bold disabled:opacity-50"
          >
            {loading ? "Mengirim..." : "Kirim Proposal"}
          </button>
        </div>
      </div>

      {/* ALERT POPUP */}
      {showAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-xl">
            <h3 className="text-lg font-bold text-red-600 mb-3">
              Pengajuan Gagal
            </h3>

            <p className="text-gray-700 mb-6">
              {alertMessage}
            </p>

            <button
              onClick={() => setShowAlert(false)}
              className="w-full bg-red-500 text-white py-2 rounded-xl font-semibold"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AjukanModal;
