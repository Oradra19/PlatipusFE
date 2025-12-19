import { useEffect, useState, type FC } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getMyEvents, deleteEvent, getProfile } from "../../../services/api";

// Mapping ID dari Backend ke Text yang bisa dibaca User
const CATEGORY_MAP: Record<number, string> = { 
  1: "Teknologi", 
  2: "Musik", 
  3: "Pendidikan", 
  4: "Bisnis",
  5: "Seni & Budaya",
  6: "Olahraga",
  7: "Kuliner"
};

const MODE_MAP: Record<number, string> = { 
  1: "Offline", 
  2: "Online" 
};

const SIZE_MAP: Record<number, string> = { 
  1: "Kecil", 
  2: "Sedang", 
  3: "Besar", 
  4: "Sangat Besar" 
};

const TYPE_MAP: Record<number, string> = { 
  1: "Dana", 
  2: "Produk" 
};

const ProposalTable: FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fungsi Fetch Data Utama
  const fetchData = async () => {
    setLoading(true);
    try {

      const [profileRes, eventsRes] = await Promise.all([
        getProfile(),
        getMyEvents()
      ]);

      const userId = profileRes.user?.id; 
      const allEvents = Array.isArray(eventsRes) ? eventsRes : [];

      if (userId) {

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
    if (window.confirm("Apakah Anda yakin ingin menghapus proposal event ini?")) {
      try {
        await deleteEvent(id);
        fetchData();
      } catch (error) {
        console.error("Gagal hapus:", error);
        alert("Gagal menghapus event. Silakan coba lagi.");
      }
    }
  };


  const formatDate = (isoStr: string) => {
    if (!isoStr) return "-";
    try {
      return new Date(isoStr).toLocaleDateString("id-ID", {
        day: "numeric", month: "short", year: "numeric"
      });
    } catch { return isoStr; }
  };

  // Helper: Render Value dari ID atau String langsung
  const renderValue = (val: any, map: Record<number, string>) => {
    // Jika val adalah angka, cari di map. Jika string, tampilkan langsung.
    if (typeof val === 'number') return map[val] || val;
    return val || "-";
  };

  return (
    <div className="bg-white rounded-[30px] p-8 md:p-10 shadow-sm w-full mt-8">
      {/* HEADER TABEL */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
            <h2 className="text-xl font-bold text-biru-tua">Semua Proposal Event</h2>
            <p className="text-gray-400 text-sm mt-1">
                {events.length} proposal event terdaftar
            </p>
        </div>
        
        <button 
          onClick={() => navigate("/dashboard/eo/add")}
          className="flex items-center gap-2 bg-[#0C1626] text-white px-6 py-3 rounded-xl font-bold hover:bg-biru-tua/90 transition shadow-lg transform active:scale-95"
        >
          <FaPlus size={14} />
          <span className="text-sm">Tambah Proposal</span>
        </button>
      </div>

      {/* TABEL */}
      <div className="overflow-x-auto w-full pb-4">
        <table className="w-full min-w-[1200px] text-left border-collapse">
          {/* THEAD: Selalu Muncul */}
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
            
            {/* STATE: LOADING */}
            {loading && (
               <tr>
                 <td colSpan={9} className="py-12 text-center text-gray-400 animate-pulse">
                    Sedang memuat data event...
                 </td>
               </tr>
            )}

            {/* STATE: KOSONG */}
            {!loading && events.length === 0 && (
               <tr>
                 <td colSpan={9} className="py-12 text-center text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <p>Belum ada event yang dibuat.</p>
                        <button onClick={() => navigate("/dashboard/eo/add")} className="text-blue-600 hover:underline font-semibold">
                            Buat Event Pertama
                        </button>
                    </div>
                 </td>
               </tr>
            )}

            {/* STATE: ADA DATA */}
            {!loading && events.map((event) => (
                <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50 transition group">
                  
                  {/* Nama & Deskripsi Pendek */}
                  <td className="py-5 pr-4 pl-2">
                    <div className="font-bold text-biru-tua text-base">{event.name || "Tanpa Nama"}</div>
                    <div className="text-xs text-gray-400 mt-1 truncate max-w-[180px]" title={event.description}>
                        {event.description || "-"}
                    </div>
                  </td>

                  <td className="py-5 px-2">{renderValue(event.category_id, CATEGORY_MAP)}</td>
                  <td className="py-5 px-2">{event.location || "-"}</td>
                  <td className="py-5 px-2 whitespace-nowrap">{formatDate(event.start_time)}</td>
                  <td className="py-5 px-2">{event.target || "-"}</td>
                  <td className="py-5 px-2">{renderValue(event.sponsor_type_id, TYPE_MAP)}</td>
                  <td className="py-5 px-2">{renderValue(event.size_id, SIZE_MAP)}</td>
                  
                  {/* Badge Mode */}
                  <td className="py-5 px-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        renderValue(event.mode_id, MODE_MAP) === 'Online'
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                        {renderValue(event.mode_id, MODE_MAP)}
                    </span>
                  </td>
                  
                  {/* Tombol Aksi */}
                  <td className="py-5 pl-4 text-center">
                    <div className="flex justify-center gap-2">
                        <button 
                          onClick={() => navigate(`/dashboard/eo/edit/${event.id}`)}
                          className="bg-white border border-gray-200 text-blue-600 hover:bg-blue-50 p-2.5 rounded-xl transition shadow-sm"
                          title="Edit Event"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button 
                          onClick={() => handleDelete(event.id)}
                          className="bg-white border border-gray-200 text-red-500 hover:bg-red-50 p-2.5 rounded-xl transition shadow-sm"
                          title="Hapus Event"
                        >
                          <FaTrash size={14} />
                        </button>
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