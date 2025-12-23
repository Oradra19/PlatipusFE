import { useEffect, useState, type FC } from "react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteEvent, getEventMasters, getMyEvents } from "../../../services/api";


interface Event {
  id: string;
  name?: string;
  description?: string;
  location?: string;
  start_time?: string;
  target?: string;
  requirements?: number | string;

  category_id?: string;
  categoryId?: string;
  category?: string;

  sponsor_type_id?: string;
  sponsorTypeId?: string;
  sponsorType?: string;

  size_id?: string;
  sizeId?: string;
  size?: string;

  mode_id?: string;
  modeId?: string;
  mode?: string;
}

interface MasterItem {
  id: number;
  name: string;
}

interface EventMasters {
  categories: MasterItem[];
  sponsorTypes: MasterItem[];
  sizes: MasterItem[];
  modes: MasterItem[];
}

interface MyEventsResponse {
  message: string;
  data: Event[];
}


const ProposalTable: FC = () => {
  const navigate = useNavigate();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [masterData, setMasterData] = useState<EventMasters>({
    categories: [],
    sponsorTypes: [],
    sizes: [],
    modes: [],
  });


  const fetchData = async () => {
    setLoading(true);
    try {
      const [eventsRes, masterRes] = await Promise.all([
        getMyEvents() as Promise<MyEventsResponse>,
        getEventMasters() as Promise<EventMasters>,
      ]);

      setEvents(Array.isArray(eventsRes.data) ? eventsRes.data : []);

      setMasterData({
        categories: masterRes.categories ?? [],
        sponsorTypes: masterRes.sponsorTypes ?? [],
        sizes: masterRes.sizes ?? [],
        modes: masterRes.modes ?? [],
      });
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
    if (!window.confirm("Apakah Anda yakin ingin menghapus proposal event ini?")) {
      return;
    }
    try {
      await deleteEvent(id);
      alert("Event berhasil dihapus.");
      fetchData();
    } catch (error) {
      console.error("Gagal hapus:", error);
      alert("Gagal menghapus event. Silakan coba lagi.");
    }
  };


  const formatDate = (isoStr?: string): string => {
    if (!isoStr) return "-";
    return new Date(isoStr).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  // const formatRupiah = (value?: string | number): string => {
  //   if (value === undefined || value === null) return "-";
  //   const num = Number(value);
  //   if (Number.isNaN(num)) return "-";
  //   return new Intl.NumberFormat("id-ID", {
  //     style: "currency",
  //     currency: "IDR",
  //     minimumFractionDigits: 0,
  //   }).format(num);
  // };

  const getMasterName = (
    id: string | undefined | null,
    list: MasterItem[]
  ): string => {
    if (!id) return "-";
    if(id === undefined || id === null) return "-";
    const found = list.find(item => item.id === Number(id));
    return found ? found.name : "-";
  };

  const getValue = (
    event: Event,
    ...keys: (keyof Event)[]
  ): string | undefined => {
    for (const key of keys) {
      const value = event[key];
      if (value !== undefined && value !== null) {
        return String(value);
      }
    }
    return undefined;
  };


  return (
    <div className="bg-white rounded-[30px] p-8 md:p-10 shadow-sm w-full mt-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-biru-tua">
            Semua Proposal Event
          </h2>
          <p className="text-gray-400 text-sm mt-1 font-medium">
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

      <div className="overflow-x-auto w-full pb-4">
        <table className="w-full min-w-[1400px] text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-100 text-sm font-extrabold text-[#0C1626] tracking-wide uppercase">
              <th className="py-6 pr-6 pl-2 w-[20%]">Nama Event</th>
              <th className="py-6 px-4">Kategori</th>
              <th className="py-6 px-4">Lokasi</th>
              <th className="py-6 px-4">Tanggal</th>
              <th className="py-6 px-4">Target</th>
              <th className="py-6 px-4">Jenis Sponsor</th>
              <th className="py-6 px-4">Kebutuhan</th>
              <th className="py-6 px-4">Ukuran</th>
              <th className="py-6 px-4">Mode</th>
              <th className="py-6 pl-6 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody className="text-sm text-gray-600 font-semibold">
            {loading && (
              <tr>
                <td colSpan={10} className="py-12 text-center text-gray-400 animate-pulse">
                  Sedang memuat data event...
                </td>
              </tr>
            )}

            {!loading && events.length === 0 && (
              <tr>
                <td colSpan={10} className="py-12 text-center text-gray-400">
                  Belum ada event yang dibuat.
                </td>
              </tr>
            )}

            {!loading &&
              events.map(event => {
                const catId = getValue(event, "category_id", "categoryId", "category");
                const typeId = getValue(event, "sponsor_type_id", "sponsorTypeId", "sponsorType");
                const sizeId = getValue(event, "size_id", "sizeId", "size");
                const modeId = getValue(event, "mode_id", "modeId", "mode");

                return (
                  <tr key={event.id} className="border-b border-gray-100 hover:bg-gray-50 transition group">
                    <td className="py-5 pr-6 pl-2 align-top">
                      <div className="font-bold text-[#0C1626] text-base">
                        {event.name || "Tanpa Nama"}
                      </div>
                      <div className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                        {event.description || "-"}
                      </div>
                    </td>

                    <td className="py-5 px-4 align-top">
                      {getMasterName(catId, masterData.categories)}
                    </td>
                    <td className="py-5 px-4 align-top">{event.location || "-"}</td>
                    <td className="py-5 px-4 align-top whitespace-nowrap">
                      {formatDate(event.start_time)}
                    </td>
                    <td className="py-5 px-4 align-top">{event.target || "-"}</td>
                    <td className="py-5 px-4 align-top">
                      {getMasterName(typeId, masterData.sponsorTypes)}
                    </td>
                    <td className="py-5 px-4 align-top  whitespace-nowrap">
                      {event.requirements}
                    </td>
                    <td className="py-5 px-4 align-top">
                      {getMasterName(sizeId, masterData.sizes)}
                    </td>

                    <td className="py-5 px-4 align-top">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          getMasterName(modeId, masterData.modes) === "Online"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {getMasterName(modeId, masterData.modes)}
                      </span>
                    </td>

                    <td className="py-5 pl-6 align-top text-center">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => navigate(`/dashboard/eo/edit/${event.id}`)}
                          className="bg-white border-2 border-gray-100 text-blue-600 hover:bg-blue-50 hover:border-blue-200 p-2.5 rounded-xl transition-all shadow-sm"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(event.id)}
                          className="bg-white border-2 border-gray-100 text-red-500 hover:bg-red-50 hover:border-red-200 p-2.5 rounded-xl transition-all shadow-sm"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProposalTable;
