import { useEffect, useState, type FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventFormLayout from "./components/EventFormLayout";
import { FaCalendarAlt, FaCheck } from "react-icons/fa";
import { getEventById, updateEvent } from "../../services/eventService";

const EOEditEvent: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State form
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    date: "",
    category: "",
    audience: "",
    description: "",
    tagBudget: "",
    tagType: "",
    tagScale: "",
    tagMode: ""
  });

  // Load data saat komponen mount
  useEffect(() => {
    if (id) {
      const event = getEventById(id);
      if (event) {
        setFormData({
          title: event.title,
          location: event.location,
          date: event.date,
          category: event.category,
          audience: event.audience,
          description: event.description,
          tagBudget: event.tags[0] || "",
          tagType: event.tags[1] || "",
          tagScale: event.tags[2] || "",
          tagMode: event.tags[3] || ""
        });
      }
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
        // Update object EventData
        const updatedEvent = {
            id: id,
            title: formData.title,
            location: formData.location,
            date: formData.date,
            audience: formData.audience,
            category: formData.category,
            description: formData.description,
            tags: [formData.tagBudget, formData.tagType, formData.tagScale, formData.tagMode],
            logo: "/logo3.png", 
            eoName: "Maulana EO",
            eoPhoto: "/eo5.png",
            eoEmail: "maulana@gmail.com",
            image: "/event-prop1.png"
        };
        
        updateEvent(updatedEvent);
        navigate("/dashboard/eo"); // Kembali ke dashboard
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/eo"); // Batal dan kembali
  };

  return (
    <EventFormLayout title="Edit Event">
      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* === KOLOM KIRI === */}
          <div className="space-y-6">
            <div>
              <label className="block font-semibold mb-2 text-sm">Nama event</label>
              <input name="title" value={formData.title} onChange={handleChange} type="text" className="w-full bg-[#EAE4E4] px-4 py-3 rounded-lg outline-none text-sm" />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-sm">Lokasi</label>
              <input name="location" value={formData.location} onChange={handleChange} type="text" className="w-full bg-[#EAE4E4] px-4 py-3 rounded-lg outline-none text-sm" />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-sm">Acara berlangsung</label>
              <div className="relative">
                <input name="date" value={formData.date} onChange={handleChange} type="text" className="w-full bg-[#EAE4E4] px-4 py-3 rounded-lg outline-none text-sm" />
                <FaCalendarAlt className="absolute right-4 top-3 text-gray-500" />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-sm">Pilih Jenis Sponsorship</label>
              <select name="tagType" value={formData.tagType} onChange={handleChange} className="w-full bg-[#EAE4E4] px-4 py-3 rounded-lg outline-none text-sm appearance-none cursor-pointer">
                <option value="Dana">Dana</option>
                <option value="Produk">Produk</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-sm">Deskripsi</label>
              <textarea name="description" value={formData.description} onChange={handleChange} className="w-full bg-[#EAE4E4] px-4 py-3 rounded-lg outline-none text-sm h-40 resize-none"></textarea>
            </div>
          </div>

          {/* === KOLOM KANAN === */}
          <div className="space-y-6">
            <div>
              <label className="block font-semibold mb-2 text-sm">Kategori</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-[#EAE4E4] px-4 py-3 rounded-lg outline-none text-sm appearance-none cursor-pointer">
                <option value="Teknologi">Teknologi</option>
                <option value="Musik">Musik</option>
                <option value="Pendidikan">Pendidikan</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block font-semibold mb-2 text-sm">Target audiens</label>
                    <input name="audience" value={formData.audience} onChange={handleChange} type="text" className="w-full bg-[#EAE4E4] px-4 py-3 rounded-lg outline-none text-sm" />
                </div>
                <div>
                    <label className="block font-semibold mb-2 text-sm">Skala Event</label>
                    <select name="tagScale" value={formData.tagScale} onChange={handleChange} className="w-full bg-[#EAE4E4] px-4 py-3 rounded-lg outline-none text-sm appearance-none cursor-pointer">
                        <option value="Kecil">Kecil</option>
                        <option value="Sedang">Sedang</option>
                        <option value="Besar">Besar</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block font-semibold mb-2 text-sm">Kebutuhan</label>
                    <input name="tagBudget" value={formData.tagBudget} onChange={handleChange} type="text" className="w-full bg-[#EAE4E4] px-4 py-3 rounded-lg outline-none text-sm" />
                </div>
                <div>
                    <label className="block font-semibold mb-2 text-sm">Mode Event</label>
                    <select name="tagMode" value={formData.tagMode} onChange={handleChange} className="w-full bg-[#EAE4E4] px-4 py-3 rounded-lg outline-none text-sm appearance-none cursor-pointer">
                        <option value="Offline">Offline</option>
                        <option value="Online">Online</option>
                    </select>
                </div>
            </div>

            {/* Static UI for upload */}
            <div>
              <label className="block font-semibold mb-2 text-sm">Upload proposal</label>
              <div className="border-2 border-dashed border-gray-400 rounded-lg h-32 flex items-center justify-center text-black font-medium text-sm bg-white">
                {formData.title ? `${formData.title}.pdf` : "File Proposal"}
              </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded flex items-center justify-center text-white text-xs">
                    <FaCheck />
                </div>
                <label className="text-sm font-medium">Open Sponsorship</label>
            </div>
          </div>
        </div>

        {/* BUTTON ACTION */}
        <div className="flex flex-col sm:flex-row gap-6 mt-10">
            <button 
                type="button" 
                onClick={handleCancel}
                className="flex-1 bg-red-200 text-red-600 font-bold py-3 rounded-xl hover:bg-red-300 transition"
            >
                Batalkan
            </button>
            <button 
                type="submit" 
                className="flex-1 bg-[#2F40D3] text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition"
            >
                Simpan Perubahan
            </button>
        </div>
      </form>
    </EventFormLayout>
  );
};

export default EOEditEvent;