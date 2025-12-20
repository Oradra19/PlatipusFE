import { useState } from "react";
import type { FC } from "react";
import { submitProposal } from "../../services/api";

interface AjukanModalProps {
  open: boolean;
  onClose: () => void;
  sponsorId: string;
}

const AjukanModal: FC<AjukanModalProps> = ({
  open,
  onClose,
  sponsorId,
}) => {
  const [track, setTrack] = useState<"regular" | "fast">("regular");
  const [file, setFile] = useState<File | null>(null);

  if (!open) return null;

  // 🔥 SESUAI DB
 const handleSubmit = async () => {
  if (!file) return;

  const formData = new FormData();
  formData.append("sponsorId", sponsorId);
  formData.append(
    "submissionType",
    track === "fast" ? "FAST_TRACK" : "REGULAR"
  );
  formData.append("proposal", file);

  try {
    await submitProposal(sponsorId, formData);
    onClose();
  } catch (err) {
    console.error("SUBMIT ERROR:", err);
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-xl rounded-[28px] bg-white p-8 border-4 border-yellow-500">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-600 text-xl font-bold"
        >
          ✕
        </button>

        <div className="mb-6">
          <label className="font-semibold text-sm">Upload Proposal</label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full mt-2 border rounded-xl px-4 py-3"
          />
        </div>

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

        <button
          onClick={handleSubmit}
          disabled={!file}
          className="w-full bg-green-500 text-white py-3 rounded-xl font-bold disabled:opacity-50"
        >
          Kirim Proposal
        </button>
      </div>
    </div>
  );
};

export default AjukanModal;
