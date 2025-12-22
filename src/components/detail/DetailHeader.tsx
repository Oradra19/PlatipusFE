import type { FC } from "react";
import { useState } from "react";
import type { EventData } from "../../types/EventData";
import ConfirmModal from "./ConfirmModal";
import { FaCalendar, FaMapMarkerAlt } from "react-icons/fa";

const DetailHeader: FC<{ event: EventData }> = ({ event }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
      {/* LEFT — EO INFO */}
      <div className="flex items-start gap-4">
        {/* FOTO EO */}
        <div className="w-14 h-14 rounded-xl border-2 border-emas p-1">
          <img
            src={event.eoPhoto || "/default-profile.png"}
            alt={event.eoName || "EO"}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* TEKS INFO */}
        <div>
          <h3 className="text-base font-semibold text-biru-tua">
            {event.eoName || "Event Organizer"}
          </h3>

          {/* KATEGORI */}
          <p className="text-xs text-gray-600 mb-1">
            Kategori :{" "}
            <span className="font-medium text-biru-tua">
              {event.category || "-"}
            </span>
          </p>

          {/* LOKASI + TANGGAL */}
          <div className="flex flex-wrap text-xs text-gray-600 gap-4 mt-1">
            <span className="flex items-center gap-1">
              <FaMapMarkerAlt size={12} /> {event.location}
            </span>

            <span className="flex items-center gap-1">
              <FaCalendar size={12} /> {event.date}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT — BUTTON + STATUS */}
      <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3">
        <button
          onClick={() => setOpenModal(true)}
          className="px-4 py-2 rounded-lg bg-emas text-white hover:bg-yellow-600"
        >
          Konfirmasi Proposal
        </button>

        <ConfirmModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          event={event}
        />

        <span className="bg-green-500/90 text-white px-4 py-2 text-xs rounded-md font-medium">
          Status : Terbuka untuk Sponsor
        </span>
      </div>
    </div>
  );
};

export default DetailHeader;
