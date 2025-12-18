import { useState, useEffect, type FC, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import EventFormLayout from "./components/EventFormLayout";
import { createEvent, getEventMasters } from "../../services/api";
import { FaFilePdf } from "react-icons/fa";

const EOAddEvent: FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  

  type MasterItem = {
    id: number;
    name: string;
  };

  type FormState = {
    name: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
    audience: string;
    requirements: string;
    categoryId: string;
    typeId: string;
    sizeId: string;
    modeId: string;
  };

  const [masterData, setMasterData] = useState<{
    categories: MasterItem[],
    sponsorTypes: MasterItem[],
    sizes: MasterItem[],
    modes: MasterItem[],
  }>({
    categories: [],
    sponsorTypes: [],
    sizes: [],
    modes: [],
  })

  const [formData, setFormData] = useState<FormState>({
    name: "",
    location: "",
    startDate: "",
    endDate: "",
    description: "",
    audience: "",
    requirements: "",
    categoryId: "",
    typeId: "",
    sizeId: "",
    modeId: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [proposalFile, setProposalFile] = useState<File | null>(null);

  useEffect(() => {
    const loadMasters = async () => {
      const data = await getEventMasters();
      if (data) {
        setMasterData({
          categories: data.categories || [],
          sponsorTypes: data.sponsorTypes || [],
          sizes: data.sizes || [],
          modes: data.modes || []
        });
      }
    };
    loadMasters();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const {name, value} = e.target;
    setFormData((prev) => ({ ...prev, [name]: value}));
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: 'image' | 'proposal') => {
    if (e.target.files && e.target.files[0]) {
      if (type === 'image') setImageFile(e.target.files[0]);
      else setProposalFile(e.target.files[0]);
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!formData.startDate || !formData.endDate) {
        alert("Tanggal mulai dan selesai harus diisi!");
        setIsLoading(false);
        return;
      }
      if (!imageFile) {
        alert("Wajib upload gambar poster event!");
        setIsLoading(false);
        return;
      }

      const payload = new FormData();
      
      // Data Text
      payload.append("name", formData.name);
      payload.append("location", formData.location);
      payload.append("target", formData.audience);       
      payload.append("requirements", formData.requirements);
      payload.append("description", formData.description);

      // Data ID (Pastikan ID terisi)
      payload.append("categoryId", formData.categoryId);
      payload.append("sponsorTypeId", formData.typeId); 
      payload.append("sizeId", formData.sizeId);
      payload.append("modeId", formData.modeId);

      payload.append(
        "startTime",
        `${formData.startDate}T09:00:00.000Z`
      );

      payload.append(
        "endTime",
        `${formData.endDate}T17:00:00.000Z`
      );
      // Files
      if (imageFile) payload.append("image", imageFile); 
      if (proposalFile) payload.append("proposal", proposalFile);
      
      // Debugging: Lihat isi di Console
      console.log("🚀 Payload:");
      for (const pair of payload.entries()) {
        console.log(pair[0], pair[1]);
      }

      await createEvent(payload);
      alert("Event berhasil dibuat!");
      navigate("/dashboard/eo");

    } catch (error: any) {
      console.error("❌ ERROR API:", error);
      const serverMessage = error.response?.data?.message || "Gagal membuat event (Cek format data)";
      alert(`Gagal: ${serverMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EventFormLayout title="Tambah Event">
      <form onSubmit={handleSave} className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          
          {/* KOLOM KIRI */}
          <div className="space-y-6">
            <div>
                <label className="font-bold text-sm mb-2 block text-biru-tua">Nama Event <span className="text-red-500">*</span></label>
                <input name="name" onChange={handleChange} required className="w-full bg-[#EAE4E4] px-4 py-3 rounded-xl outline-none text-sm transition focus:ring-2 focus:ring-blue-200" placeholder="Contoh: Konser Musik Amal" />
            </div>
            <div>
                <label className="font-bold text-sm mb-2 block text-biru-tua">Lokasi <span className="text-red-500">*</span></label>
                <input name="location" onChange={handleChange} required className="w-full bg-[#EAE4E4] px-4 py-3 rounded-xl outline-none text-sm transition focus:ring-2 focus:ring-blue-200" placeholder="Contoh: Jakarta Convention Center" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="font-bold text-sm mb-2 block text-biru-tua">Mulai <span className="text-red-500">*</span></label>
                    <input name="startDate" type="date" onChange={handleChange} required className="w-full bg-[#EAE4E4] px-4 py-3 rounded-xl outline-none text-sm cursor-pointer" />
                </div>
                <div>
                    <label className="font-bold text-sm mb-2 block text-biru-tua">Selesai <span className="text-red-500">*</span></label>
                    <input name="endDate" type="date" onChange={handleChange} required className="w-full bg-[#EAE4E4] px-4 py-3 rounded-xl outline-none text-sm cursor-pointer" />
                </div>
            </div>

            <div>
                <label className="font-bold text-sm mb-2 block text-biru-tua">Jenis Sponsorship <span className="text-red-500">*</span></label>
                <select name="typeId" onChange={handleChange} required className="w-full bg-[#EAE4E4] px-4 py-3 rounded-xl outline-none text-sm cursor-pointer appearance-none">
                    <option value="">Pilih Jenis Sponsor...</option>
                    {masterData.sponsorTypes.map((type) => (
                        <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="font-bold text-sm mb-2 block text-biru-tua">Deskripsi <span className="text-red-500">*</span></label>
                <textarea name="description" onChange={handleChange} required className="w-full bg-[#EAE4E4] px-4 py-3 rounded-xl outline-none text-sm h-40 resize-none transition focus:ring-2 focus:ring-blue-200" placeholder="Jelaskan detail acara..."></textarea>
            </div>
          </div>

          {/* KOLOM KANAN */}
          <div className="space-y-6">
            <div>
                <label className="font-bold text-sm mb-2 block text-biru-tua">Kategori <span className="text-red-500">*</span></label>
                <select name="categoryId" onChange={handleChange} required className="w-full bg-[#EAE4E4] px-4 py-3 rounded-xl outline-none text-sm cursor-pointer appearance-none">
                    <option value="">Pilih Kategori...</option>
                    {masterData.categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="font-bold text-sm mb-2 block text-biru-tua">Target Audiens <span className="text-red-500">*</span></label>
                    <input name="audience" onChange={handleChange} required className="w-full bg-[#EAE4E4] px-4 py-3 rounded-xl outline-none text-sm" placeholder="Ex: Mahasiswa" />
                </div>
                <div>
                    <label className="font-bold text-sm mb-2 block text-biru-tua">Ukuran Event <span className="text-red-500">*</span></label>
                    <select name="sizeId" onChange={handleChange} required className="w-full bg-[#EAE4E4] px-4 py-3 rounded-xl outline-none text-sm cursor-pointer appearance-none">
                        <option value="">Pilih Ukuran...</option>
                        {masterData.sizes.map((size) => (
                            <option key={size.id} value={size.id}>{size.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="font-bold text-sm mb-2 block text-biru-tua">Kebutuhan <span className="text-red-500">*</span></label>
                    <input name="requirements" onChange={handleChange} required className="w-full bg-[#EAE4E4] px-4 py-3 rounded-xl outline-none text-sm" placeholder="Ex: Dana / Konsumsi" />
                </div>
                <div>
                    <label className="font-bold text-sm mb-2 block text-biru-tua">Mode Event <span className="text-red-500">*</span></label>
                    <select name="modeId" onChange={handleChange} required className="w-full bg-[#EAE4E4] px-4 py-3 rounded-xl outline-none text-sm cursor-pointer appearance-none">
                        <option value="">Pilih Mode...</option>
                        {masterData.modes.map((mode) => (
                            <option key={mode.id} value={mode.id}>{mode.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* INPUT GAMBAR (BIASA) */}
            <div>
                <label className="font-bold text-sm mb-2 block text-biru-tua">Upload Gambar (Poster) <span className="text-red-500">*</span></label>
                <input 
                    type="file" 
                    accept="image/*" 
                    required 
                    onChange={(e) => handleFileChange(e, 'image')}
                    className="w-full bg-[#EAE4E4] p-3 rounded-xl text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-biru-tua file:text-white hover:file:bg-blue-800 transition" 
                />
                <p className="text-[10px] text-gray-400 mt-1 ml-1">*JPG/PNG Max 2MB</p>
            </div>

            {/* INPUT PROPOSAL (DROPZONE) */}
            <div>
                <label className="font-bold text-sm mb-2 block text-biru-tua">Upload Proposal (PDF)</label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 transition p-6 flex flex-col items-center justify-center text-center cursor-pointer group">
                    <input 
                        type="file" 
                        accept=".pdf" 
                        onChange={(e) => handleFileChange(e, 'proposal')}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    />
                    <div className="text-gray-400 group-hover:text-red-500 transition mb-2">
                        <FaFilePdf size={32} />
                    </div>
                    <p className="text-xs text-gray-500 font-medium">
                        {proposalFile ? (
                            <span className="text-green-600 font-bold">{proposalFile.name}</span>
                        ) : (
                            "Klik atau Tarik file PDF disini"
                        )}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1">Format PDF (Max 5MB)</p>
                </div>
            </div>

          </div>
        </div>

        <div className="flex gap-6 mt-12">
           <button type="button" onClick={() => navigate("/dashboard/eo")} className="flex-1 bg-red-100 text-red-600 py-4 rounded-2xl font-bold hover:bg-red-200 transition text-sm">Batalkan</button>
           <button type="submit" disabled={isLoading} className="flex-1 bg-[#2F40D3] text-white py-4 rounded-2xl font-bold hover:bg-blue-800 transition shadow-lg shadow-blue-500/30 disabled:bg-blue-300 text-sm">{isLoading ? "Menyimpan..." : "Simpan Event"}</button>
        </div>
      </form>
    </EventFormLayout>
  );
};

export default EOAddEvent;