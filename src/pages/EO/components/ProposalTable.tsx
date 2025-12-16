import { useEffect, useState, type FC } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// Gunakan API yang baru, bukan mock service
import { getAllEvents, deleteEvent, getProfile } from "../../../services/api";

// Mapping ID ke Text (Sesuai data BE)
const CATEGORY_MAP: Record<string | number, string> = { 1: "Teknologi", 2: "Musik", 3: "Pendidikan", 4: "Bisnis" };
const MODE_MAP: Record<string | number, string> = { 1: "Offline", 2: "Online" };
const SIZE_MAP: Record<string | number, string> = { 1: "Kecil", 2: "Sedang", 3: "Besar", 4: "Sangat Besar" };
const TYPE_MAP: Record<string | number, string> = { 1: "Dana", 2: "Produk" };

const ProposalTable: FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fungsi ambil data
  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Ambil Profile (untuk dapat ID user) & Semua Event secara paralel
      const [profileRes, eventsRes] = await Promise.all([
        getProfile(),
        getAllEvents()
      ]);

      const userId = profileRes.user?.id; // ID User yang login
      const allEvents = Array.isArray(eventsRes) ? eventsRes : [];

      if (userId) {
        // 2. FILTER: Hanya tampilkan event yang eo_id nya sama dengan user login
        // (Solusi karena endpoint /events/me error)
        const myEvents = allEvents.filter((e: any) => e.eo_id === userId);
        setEvents(myEvents);
      } else {
        setEvents([]); 
      }
    } catch (error) {
      console.error("Gagal memuat data:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Yakin hapus proposal ini?")) {
      try {
        await deleteEvent(id);
        fetchData(); // Refresh data
      } catch (error) {
        alert("Gagal menghapus event.");
      }
    }
  };

  const formatDate = (isoStr: string) => {
    if (!isoStr) return "-";
    try {
      return new Date(isoStr).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
    } catch { return isoStr; }
  };

  const renderValue = (val: any, map: any) => map[val] || val || "-";

  return (
    <div className="bg-white rounded-[30px] p-8 md:p-10 shadow-sm w-full mt-8">
      {/* HEADER TABEL */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
            <h2 className="text-xl font-bold text-biru-tua">Semua Proposal Event</h2>
            <p className="text-gray-400 text-sm mt-1">{events.length} proposal event terdaftar</p>
        </div>
        <button 
          onClick={() => navigate("/dashboard/eo/add")}
          className="flex items-center gap-2 bg-[#0C1626] text-white px-6 py-3 rounded-xl font-bold hover:bg-biru-tua/90 transition shadow-lg"
        >
          <FaPlus size={14} />
          <span className="text-sm">Tambah Proposal</span>
        </button>
      </div>

      {/* TABEL */}
      <div className="overflow-x-auto w-full pb-4">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 text-sm font-bold text-biru-tua tracking-wide">
              <th className="py-5 pr-4 pl-2">Nama Event</th>
              <th className="py-5 px-2">Kategori</th>
              <th className="py-5 px-2">Lokasi</th>
              <th className="py-5 px-2">Tanggal</th>
              <th className="py-5 px-2">Target</th>
              <th className="py-5 px-2">Jenis Sponsor</th>
              <th className="py-5 px-2">Ukuran</th>
              <th className="py-5 px-2">Mode</th>
              <th className="py-5 pl-4 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-600 font-medium">
            
            {/* LOADING */}
            {loading && (
               <tr><td colSpan={9} className="py-12 text-center text-gray-400 animate-pulse">Sedang memuat data event...</td></tr>
            )}

            {/* KOSONG */}
            {!loading && events.length === 0 && (
               <tr><td colSpan={9} className="py-12 text-center text-gray-400">Belum ada event yang dibuat.</td></tr>
            )}

            {/* DATA */}
            {!loading && events.map((event) => (
                <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50 transition group">
                  <td className="py-5 pr-4 pl-2">
                    <div className="font-bold text-biru-tua text-base">{event.name || "Tanpa Nama"}</div>
                    <div className="text-xs text-gray-400 mt-1 truncate max-w-[150px]">{event.description || "-"}</div>
                  </td>
                  <td className="py-5 px-2">{renderValue(event.category_id || event.category, CATEGORY_MAP)}</td>
                  <td className="py-5 px-2">{event.location || "-"}</td>
                  <td className="py-5 px-2 whitespace-nowrap">{formatDate(event.start_time)}</td>
                  <td className="py-5 px-2">{event.target || "-"}</td>
                  <td className="py-5 px-2">{renderValue(event.sponsor_type_id || event.sponsorType, TYPE_MAP)}</td>
                  <td className="py-5 px-2">{renderValue(event.size_id || event.size, SIZE_MAP)}</td>
                  <td className="py-5 px-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        (event.mode_id === 2 || event.mode === 'Online') ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                        {renderValue(event.mode_id || event.mode, MODE_MAP)}
                    </span>
                  </td>
                  <td className="py-5 pl-4 text-center">
                    <div className="flex justify-center gap-2">
                        <button onClick={() => navigate(`/dashboard/eo/edit/${event.id}`)} className="bg-white border border-gray-200 text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition"><FaEdit /></button>
                        <button onClick={() => handleDelete(event.id)} className="bg-white border border-gray-200 text-red-500 hover:bg-red-50 p-2 rounded-lg transition"><FaTrash /></button>
                    </div>
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