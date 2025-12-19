import { useState, useEffect, type FC, type ChangeEvent, type FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EventFormLayout from "./components/EventFormLayout";
import { getEventById, updateEvent, getEventMasters } from "../../services/api";
import { FaFilePdf } from "react-icons/fa";

const EOEditEvent: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  
  // State Data Master
  const [masterData, setMasterData] = useState({
    categories: [] as any[],
    sponsorTypes: [] as any[],
    sizes: [] as any[],
    modes: [] as any[]
  });

  // State Form
  const [formData, setFormData] = useState({
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
    modeId: ""
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [proposalFile, setProposalFile] = useState<File | null>(null);
  
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [existingProposal, setExistingProposal] = useState<string | null>(null);

  // Helper untuk mengambil value dengan aman (handle berbagai nama key)
  const getValue = (obj: any, ...keys: string[]) => {
    if (!obj) return null;
    for (const key of keys) {
      if (obj[key] !== undefined && obj[key] !== null) return obj[key];
    }
    return "";
  };

  useEffect(() => {
    const initData = async () => {
      if (!id) return;

      try {
        setIsFetching(true);
        const [masters, eventData] = await Promise.all([
          getEventMasters(),
          getEventById(id)
        ]);

        console.log("📥 Master Data:", masters);
        console.log("📥 Event Data:", eventData);

        if (masters) {
          setMasterData({
            categories: masters.categories || [],
            sponsorTypes: masters.sponsorTypes || [],
            sizes: masters.sizes || [],
            modes: masters.modes || []
          });
        }

        if (eventData) {
          const toInputDate = (isoStr: string) => {
             if (!isoStr) return "";
             try {
                return new Date(isoStr).toISOString().split('T')[0];
             } catch { return ""; }
          };

          // Konversi semua ID ke String agar cocok dengan value dropdown (HTML Select value is always string)
          const catId = String(getValue(eventData, 'category_id', 'categoryId', 'category'));
          const typeId = String(getValue(eventData, 'sponsor_type_id', 'sponsorTypeId', 'sponsorType'));
          const sizeId = String(getValue(eventData, 'size_id', 'sizeId', 'size'));
          const modeId = String(getValue(eventData, 'mode_id', 'modeId', 'mode'));

          setFormData({
            name: eventData.name || "",
            location: eventData.location || "",
            startDate: toInputDate(eventData.start_time),
            endDate: toInputDate(eventData.end_time),
            description: eventData.description || "",
            audience: eventData.target || "",
            requirements: eventData.requirements || "",
            categoryId: catId !== "0" ? catId : "", // Handle jika ID 0 atau null
            typeId: typeId !== "0" ? typeId : "",
            sizeId: sizeId !== "0" ? sizeId : "",
            modeId: modeId !== "0" ? modeId : ""
          });

          setExistingImage(eventData.image_url || null);
          setExistingProposal(eventData.proposal_url || null);
        }

      } catch (error) {
        console.error("Gagal memuat data event:", error);
        navigate("/dashboard/eo");
      } finally {
        setIsFetching(false);
      }
    };

    initData();
  }, [id, navigate]);

  const handleChange = (e: ChangeEvent<any>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: 'image' | 'proposal') => {
    if (e.target.files && e.target.files[0]) {
      if (type === 'image') setImageFile(e.target.files[0]);
      else setProposalFile(e.target.files[0]);
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setIsLoading(true);
    
    try {
      if (!formData.startDate || !formData.endDate) {
        alert("Tanggal harus diisi!");
        setIsLoading(false);
        return;
      }
      
      const payload = new FormData();
      
      
      console.log("🚀 Updating Event...");
      // PENTING: Gunakan await agar kode menunggu update selesai
      await updateEvent(id, payload);
      
      alert("Event berhasil diperbarui!");
      // Navigasi ini akan memicu useEffect([location.key]) di ProposalTable
      navigate("/dashboard/eo");


      payload.append("name", formData.name);
      payload.append("location", formData.location);
      payload.append("target", formData.audience);       
      payload.append("requirements", formData.requirements);
      payload.append("description", formData.description);

      payload.append("category_id", formData.categoryId);
      payload.append("sponsor_type_id", formData.typeId); 
      payload.append("size_id", formData.sizeId);
      payload.append("mode_id", formData.modeId);
      
      const sDate = new Date(formData.startDate);
      const eDate = new Date(formData.endDate);
      sDate.setHours(0,0,0,0);
      eDate.setHours(23,59,59,999);
      
      payload.append("start_time", sDate.toISOString());
      payload.append("end_time", eDate.toISOString());

      if (imageFile) payload.append("image", imageFile); 
      if (proposalFile) payload.append("proposal", proposalFile);
      
      await updateEvent(id, payload);
      alert("Event berhasil diperbarui!");
      navigate("/dashboard/eo");

    } catch (error: any) {
      console.error("Gagal update:", error);
      const msg = error.response?.data?.message || "Gagal memperbarui event.";
      alert(`Error: ${msg}`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <p className="text-gray-500 font-semibold animate-pulse">Memuat data event...</p>
        </div>
    );
  }

  return (
    <EventFormLayout title="Edit Event">
      <form onSubmit={handleSave} className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          
          {/* KOLOM KIRI */}
          <div className="space-y-6">
            <div>
                <label className="font-bold text-sm mb-2 block text-biru-tua">Nama Event</label>
                <input name="name" value={formData.name} onChange={handleChange} required className="w-full bg-[#EAE4E4] px-4 py-3 rounded-xl outline-none text-sm transition focus:ring-2 focus:ring-blue-200" />
            </div>
            <div>
                <label className="font-bold text-sm mb-2 block text-biru-tua">Lokasi</label>
                <input name="location" value={formData.location} onChange={handleChange} required className="w-full bg-[#EAE4E4] px-4 py-3 rounded-xl outline-none text-sm transition focus:ring-2 focus:ring-blue-200" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="font-bold text-sm mb-2 block text-biru-tua">Mulai</label>
                    <input name="startDate" value={formData.startDate} type="date" onChange={handleChange} required className="w-full bg-[#EAE4E4] px-4 py-3 rounded-xl outline-none text-sm cursor-pointer" />
                </div>
                <div>
                    <label className="font-bold text-sm mb-2 block text-biru-tua">Selesai</label>
                    <input name="endDate" value={formData.endDate} type="date" onChange={handleChange} required className="w-full bg-[#EAE4E4] px-4 py-3 rounded-xl outline-none text-sm cursor-pointer" />
                </div>
            </div>

            <div>
                <label className="font-bold text-sm mb-2 block text-biru-tua">Jenis Sponsorship</label>
                <select name="typeId" value={formData.typeId} onChange={handleChange} required className="w-full bg-[#EAE4E4] px-4 py-3 rounded-xl outline-none text-sm cursor-pointer appearance-none">
                    <option value="">Pilih Jenis Sponsor...</option>
                    {masterData.sponsorTypes.map((type) => (
                        <option key={type.id} value={String(type.id)}>{type.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <label className="font-bold text-sm mb-2 block text-biru-tua">Deskripsi</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full bg-[#EAE4E4] px-4 py-3 rounded-xl outline-none text-sm h-40 resize-none transition focus:ring-2 focus:ring-blue-200"></textarea>
            </div>
          </div>

          {/* KOLOM KANAN */}
          <div className="space-y-6">
            <div>
                <label className="font-bold text-sm mb-2 block text-biru-tua">Kategori</label>
                <select name="categoryId" value={formData.categoryId} onChange={handleChange} required className="w-full bg-[#EAE4E4] px-4 py-3 rounded-xl outline-none text-sm cursor-pointer appearance-none">
                    <option value="">Pilih Kategori...</option>
                    {masterData.categories.map((cat) => (
                        <option key={cat.id} value={String(cat.id)}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="font-bold text-sm mb-2 block text-biru-tua">Target Audiens</label>
                    <input name="audience" value={formData.audience} onChange={handleChange} required className="w-full bg-[#EAE4E4] px-4 py-3 rounded-xl outline-none text-sm" />
                </div>
                <div>
                    <label className="font-bold text-sm mb-2 block text-biru-tua">Ukuran Event</label>
                    <select name="sizeId" value={formData.sizeId} onChange={handleChange} required className="w-full bg-[#EAE4E4] px-4 py-3 rounded-xl outline-none text-sm cursor-pointer appearance-none">
                        <option value="">Pilih Ukuran...</option>
                        {masterData.sizes.map((size) => (
                            <option key={size.id} value={String(size.id)}>{size.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="font-bold text-sm mb-2 block text-biru-tua">Kebutuhan</label>
                    <input name="requirements" value={formData.requirements} onChange={handleChange} required className="w-full bg-[#EAE4E4] px-4 py-3 rounded-xl outline-none text-sm" />
                </div>
                <div>
                    <label className="font-bold text-sm mb-2 block text-biru-tua">Mode Event</label>
                    <select name="modeId" value={formData.modeId} onChange={handleChange} required className="w-full bg-[#EAE4E4] px-4 py-3 rounded-xl outline-none text-sm cursor-pointer appearance-none">
                        <option value="">Pilih Mode...</option>
                        {masterData.modes.map((mode) => (
                            <option key={mode.id} value={String(mode.id)}>{mode.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* UPLOAD GAMBAR */}
            <div>
                <label className="font-bold text-sm mb-2 block text-biru-tua">
                    Upload Gambar (Poster) <span className="text-gray-400 font-normal text-xs">(Biarkan kosong jika tidak ganti)</span>
                </label>
                
                {existingImage && !imageFile && (
                    <div className="mb-2">
                         <img src={existingImage} alt="Preview" className="h-20 w-auto rounded-md border" />
                    </div>
                )}

                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => handleFileChange(e, 'image')}
                    className="w-full bg-[#EAE4E4] p-3 rounded-xl text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-biru-tua file:text-white hover:file:bg-blue-800 transition" 
                />
            </div>

            {/* UPLOAD PROPOSAL */}
            <div>
                <label className="font-bold text-sm mb-2 block text-biru-tua">
                    Upload Proposal (PDF) <span className="text-gray-400 font-normal text-xs">(Biarkan kosong jika tidak ganti)</span>
                </label>
                
                {existingProposal && !proposalFile && (
                    <div className="mb-2 text-xs text-blue-600 font-medium flex items-center gap-1">
                        <FaFilePdf />
                        <a href={existingProposal} target="_blank" rel="noreferrer" className="hover:underline">Lihat Proposal Saat Ini</a>
                    </div>
                )}

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
                            "Klik atau Tarik file PDF baru disini"
                        )}
                    </p>
                </div>
            </div>

          </div>
        </div>

        <div className="flex gap-6 mt-12">
           <button type="button" onClick={() => navigate("/dashboard/eo")} className="flex-1 bg-red-100 text-red-600 py-4 rounded-2xl font-bold hover:bg-red-200 transition text-sm">Batalkan</button>
           <button type="submit" disabled={isLoading} className="flex-1 bg-[#2F40D3] text-white py-4 rounded-2xl font-bold hover:bg-blue-800 transition shadow-lg shadow-blue-500/30 disabled:bg-blue-300 text-sm">{isLoading ? "Simpan Perubahan..." : "Update Event"}</button>
        </div>
      </form>
    </EventFormLayout>
  );
};

export default EOEditEvent;