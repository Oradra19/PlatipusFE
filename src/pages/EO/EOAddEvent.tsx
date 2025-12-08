import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import EventFormLayout from "./components/EventFormLayout";
import { FaCalendarAlt } from "react-icons/fa";
import { addEvent } from "../../services/eventService";

const EOAddEvent: FC = () => {
  const navigate = useNavigate();

  // State untuk form input
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Buat object EventData baru
    const newEvent = {
      id: Date.now().toString(), // Menggunakan timestamp saat ini sebagai ID unik
      title: formData.title,
      location: formData.location,
      date: formData.date,
      audience: formData.audience,
      category: formData.category,
      description: formData.description,
      tags: [formData.tagBudget, formData.tagType, formData.tagScale, formData.tagMode],
      logo: "/logo3.png", // Placeholder logo
      eoName: "Maulana EO",
      eoPhoto: "/eo5.png",
      eoEmail: "maulana@gmail.com",
      image: "/event-prop1.png"
    };

    addEvent(newEvent); // Simpan ke local storage
    navigate("/dashboard/eo"); // Kembali ke dashboard
  };

  const handleCancel = () => {
    // Reset form dan kembali
    setFormData({
        title: "", location: "", date: "", category: "", audience: "", 
        description: "", tagBudget: "", tagType: "", tagScale: "", tagMode: ""
    });
    navigate("/dashboard/eo"); 
  };

  return (
    <EventFormLayout title="Tambah Event">
      <form onSubmit={handleSave} className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* === KOLOM KIRI === */}
          <div className="space-y-6">
            <div>
              <label className="block font-semibold mb-2 text-sm">Nama event</label>
              <input name="title" value={formData.title} onChange={handleChange} required type="text" placeholder="Masukkan nama event" className="w-full bg-[#EAE4E4] px-4 py-3 rounded-lg outline-none text-sm" />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-sm">Lokasi</label>
              <input name="location" value={formData.location} onChange={handleChange} required type="text" placeholder="Masukkan lokasi event" className="w-full bg-[#EAE4E4] px-4 py-3 rounded-lg outline-none text-sm" />
            </div>

            {/* TANGGAL MANUAL INPUT (TEXT) */}
            <div>
              <label className="block font-semibold mb-2 text-sm">Acara berlangsung</label>
              <div className="relative">
                <input 
                  name="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  required 
                  type="text" 
                  placeholder="Contoh: 1 - 3 Agustus 2025" 
                  className="w-full bg-[#EAE4E4] px-4 py-3 rounded-lg outline-none text-sm" 
                />
                <FaCalendarAlt className="absolute right-4 top-3 text-gray-500" />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-sm">Pilih Jenis Sponsorship</label>
              <select name="tagType" value={formData.tagType} onChange={handleChange} className="w-full bg-[#EAE4E4] px-4 py-3 rounded-lg outline-none text-sm appearance-none cursor-pointer">
                <option value="">Pilih Jenis Sponsor</option>
                <option value="Dana">Dana</option>
                <option value="Produk">Produk</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-sm">Deskripsi</label>
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Masukkan deskripsi event" className="w-full bg-[#EAE4E4] px-4 py-3 rounded-lg outline-none text-sm h-40 resize-none"></textarea>
            </div>
          </div>

          {/* === KOLOM KANAN === */}
          <div className="space-y-6">
            <div>
              <label className="block font-semibold mb-2 text-sm">Kategori</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-[#EAE4E4] px-4 py-3 rounded-lg outline-none text-sm appearance-none cursor-pointer">
                <option value="">Pilih Kategori Event</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Musik">Musik</option>
                <option value="Pendidikan">Pendidikan</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block font-semibold mb-2 text-sm">Target audiens</label>
                    <input name="audience" value={formData.audience} onChange={handleChange} type="text" placeholder="Masukkan target event" className="w-full bg-[#EAE4E4] px-4 py-3 rounded-lg outline-none text-sm" />
                </div>
                <div>
                    <label className="block font-semibold mb-2 text-sm">Ukuran Event</label>
                    <select name="tagScale" value={formData.tagScale} onChange={handleChange} className="w-full bg-[#EAE4E4] px-4 py-3 rounded-lg outline-none text-sm appearance-none cursor-pointer">
                        <option value="">Pilih ukuran</option>
                        <option value="Kecil">Kecil</option>
                        <option value="Sedang">Sedang</option>
                        <option value="Besar">Besar</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block font-semibold mb-2 text-sm">Kebutuhan</label>
                    <input name="tagBudget" value={formData.tagBudget} onChange={handleChange} type="text" placeholder="Contoh: 5 Juta" className="w-full bg-[#EAE4E4] px-4 py-3 rounded-lg outline-none text-sm" />
                </div>
                <div>
                    <label className="block font-semibold mb-2 text-sm">Mode Event</label>
                    <select name="tagMode" value={formData.tagMode} onChange={handleChange} className="w-full bg-[#EAE4E4] px-4 py-3 rounded-lg outline-none text-sm appearance-none cursor-pointer">
                        <option value="">Pilih mode</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </select>
                </div>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-sm">Tambahkan Gambar</label>
              <input type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 bg-[#EAE4E4] rounded-lg p-2"/>
            </div>

            <div>
                <label className="block font-semibold mb-2 text-sm">Upload proposal</label>
                <div className="border-2 border-dashed border-gray-400 rounded-lg h-32 flex items-center justify-center text-gray-500 text-sm bg-white">
                    Upload File Proposal
                </div>
            </div>

            <div className="flex items-center gap-2">
                <input type="checkbox" id="openSpon" className="w-4 h-4" />
                <label htmlFor="openSpon" className="text-sm font-medium">Open Sponsorship</label>
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
                Simpan
            </button>
        </div>
      </form>
    </EventFormLayout>
  );
};

export default EOAddEvent;