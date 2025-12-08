import { useEffect, useState, type FC } from "react";
import { FaPlus, FaEllipsisV } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getEvents } from "../../../services/eventService"; // Import service baru
import type { EventData } from "../../../services/mockEvent";

const ProposalTable: FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<EventData[]>([]);

  // Load data saat komponen di-mount (agar data baru terlihat)
  useEffect(() => {
    setEvents(getEvents());
  }, []);

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm">
      {/* HEADER TABEL */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-lg font-bold text-biru-tua">Semua Proposal Event</h2>
        
        <button 
          onClick={() => navigate("/dashboard/eo/add")}
          className="flex items-center gap-2 bg-[#0C1626] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-biru-tua/90 transition"
        >
          <FaPlus size={12} />
          <span className="text-sm">Tambah Proposal</span>
        </button>
      </div>

      {/* TABEL SCROLLABLE */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-sm font-semibold text-biru-tua">
              <th className="py-4 pr-4">Nama Event</th>
              <th className="py-4 px-2">Kategori</th>
              <th className="py-4 px-2">Lokasi</th>
              <th className="py-4 px-2">Acara Berlangsung</th>
              <th className="py-4 px-2">Target</th>
              <th className="py-4 px-2">Kebutuhan</th>
              <th className="py-4 px-2">Jenis</th>
              <th className="py-4 px-2">Ukuran</th>
              <th className="py-4 px-2">Mode Event</th>
              <th className="py-4 pl-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600">
            {events.map((event, idx) => (
              <tr key={event.id || idx} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="py-4 pr-4 font-medium text-biru-tua">
                  {event.title}
                  {/* Subtitle dummy, bisa diambil dari data jika ada */}
                  <div className="text-xs text-gray-400 font-normal mt-0.5">Global Tech</div>
                </td>
                <td className="py-4 px-2">{event.category || "Umum"}</td>
                <td className="py-4 px-2">{event.location}</td>
                <td className="py-4 px-2">{event.date}</td>
                <td className="py-4 px-2">{event.audience}</td>
                <td className="py-4 px-2">{event.tags[0] || "-"}</td>
                <td className="py-4 px-2 capitalize">{event.tags[1] || "-"}</td>
                <td className="py-4 px-2 capitalize">{event.tags[2] || "-"}</td>
                <td className="py-4 px-2 capitalize">{event.tags[3] || "-"}</td>
                
                <td className="py-4 pl-4 text-center">
                  <button 
                    onClick={() => navigate(`/dashboard/eo/edit/${event.id}`)}
                    className="text-gray-400 hover:text-biru-tua p-2 rounded-full hover:bg-gray-200 transition"
                  >
                    <FaEllipsisV />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProposalTable;