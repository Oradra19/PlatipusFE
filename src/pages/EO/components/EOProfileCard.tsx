import { useState, useEffect, useRef, type FC, type ChangeEvent } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { getProfile, updateProfile, uploadProfileLogo } from "../../../services/api";

interface ProfileState {
  organizationName: string; 
  email: string;           
  phone: string;            
  profilePicture: string;   
}

const EOProfileCard: FC = () => {
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const [formData, setFormData] = useState<ProfileState>({
    organizationName: "",
    email: "",
    phone: "",
    profilePicture: ""
  });


  const [originalData, setOriginalData] = useState<ProfileState>({
    organizationName: "",
    email: "",
    phone: "",
    profilePicture: ""
  });

  // 1. FETCH DATA (GET)
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getProfile();
        
        // Mapping Data dari BE
        // profile.organization_name adalah prioritas nama tampilan
        const profileName = data.profile?.organization_name || data.user?.name || "";
        const email = data.user?.email || "";
        const phone = data.user?.phone || "";
        const pic = data.user?.profile_picture_url || "";

        const mapped: ProfileState = {
          organizationName: profileName,
          email: email,
          phone: phone,
          profilePicture: pic
        };

        setFormData(mapped);
        setOriginalData(mapped);
      } catch (error) {
        console.error("Gagal load profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // 2. HANDLE INPUT CHANGE
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 3. HANDLE SIMPAN (PUT)
  const handleSave = async () => {
    setIsSaving(true);
    try {
      // API Update Profile menerima 'company_name'
      await updateProfile({
        company_name: formData.organizationName,
        status: "Open" // Kirim status default jika diperlukan BE
      });
      
      // Update data asli setelah sukses
      setOriginalData(formData);
      alert("Profil berhasil diperbarui!");
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan profil.");
    } finally {
      setIsSaving(false);
    }
  };

  // 4. HANDLE BATALKAN
  const handleCancel = () => {
    setFormData(originalData); // Reset ke data asli
  };

  // 5. HANDLE UPLOAD FOTO
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      try {
        // Langsung upload saat user pilih file
        await uploadProfileLogo(file, formData.organizationName, "Open");
        
        // Preview lokal
        const previewUrl = URL.createObjectURL(file);
        setFormData(prev => ({ ...prev, profilePicture: previewUrl }));
        alert("Foto profil berhasil diganti!");
      } catch (error) {
        console.error("Upload error:", error);
        alert("Gagal mengupload foto.");
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-[30px] p-8 shadow-sm mb-8 animate-pulse h-64">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-8"></div>
        <div className="flex gap-8">
            <div className="flex-1 space-y-4">
                <div className="h-12 bg-gray-200 rounded-xl"></div>
                <div className="h-12 bg-gray-200 rounded-xl"></div>
            </div>
            <div className="w-28 h-28 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[30px] p-8 md:p-10 shadow-sm mb-8 relative w-full">
      <div className="flex flex-col-reverse md:flex-row gap-8 items-start">
        
        {/* === KIRI: FORM === */}
    <div className="bg-white rounded-3xl p-12 shadow-sm mb-2 w-full">
       <h2 className="text-lg font-bold text-biru-tua mb-6">Personal Informasi</h2>

          {/* Nama Organisasi */}
          <div className="space-y-2">
            <label className="text-xs text-gray-400 ml-1 font-medium">Nama Pengguna/Organisasi</label>
            <input
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
              placeholder="Masukkan nama organisasi"
              className="w-full bg-[#F5F6FA] text-biru-tua font-semibold text-sm px-6 py-4 rounded-2xl outline-none focus:ring-1 focus:ring-blue-300 transition"
            />
          </div>

          {/* Email (Read Only) */}
          <div className="space-y-2">
            <label className="text-xs text-gray-400 ml-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full bg-[#F5F6FA] text-gray-500 font-semibold text-sm px-6 py-4 rounded-2xl outline-none cursor-not-allowed"
            />
          </div>

          {/* Nomor HP (Read Only) */}
          <div className="space-y-2">
            <label className="text-xs text-gray-400 ml-1 font-medium">Nomor Terdaftar</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              disabled
              className="w-full bg-[#F5F6FA] text-gray-500 font-semibold text-sm px-6 py-4 rounded-2xl outline-none cursor-not-allowed"
            />
          </div>

          {/* Tombol Action */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button 
              onClick={handleCancel}
              className="flex-1 bg-[#EAE4E4] text-gray-500 font-bold py-3.5 rounded-xl hover:bg-gray-300 transition text-sm"
            >
              Batalkan perubahan
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex-1 bg-[#2F57EB] text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition text-sm shadow-lg shadow-blue-500/20 disabled:bg-blue-300"
            >
              {isSaving ? "Menyimpan..." : "Simpan perubahan"}
            </button>
          </div>
        </div>

        {/* === KANAN: FOTO PROFIL === */}
        <div className="md:w-auto w-full flex justify-center md:justify-end">
          <div 
            className="relative group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            title="Ganti Foto Profil"
          >
            <div className="w-32 h-32 rounded-full bg-gray-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center relative">
               {formData.profilePicture ? (
                 <img 
                    src={formData.profilePicture} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        // Fallback jika gambar error
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement?.classList.add('bg-gray-300');
                    }} 
                 />
               ) : (
                 <span className="text-4xl font-bold text-gray-400 uppercase">
                    {formData.organizationName.charAt(0) || "U"}
                 </span>
               )}
            </div>
            
            {/* Tombol Edit Floating */}
            <div className="absolute bottom-1 right-1 bg-blue-600 text-white p-2.5 rounded-full border-2 border-white shadow-md hover:bg-blue-700 transition transform hover:scale-105">
              <FaPencilAlt size={12} />
            </div>

            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept="image/*"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default EOProfileCard;

// import type { FC } from "react";
// import { FaPencilAlt } from "react-icons/fa";

// const EOProfileCard: FC = () => {
//   return (
//     <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
//       <h2 className="text-lg font-bold text-biru-tua mb-6">Personal Informasi</h2>

//       <div className="flex flex-col-reverse md:flex-row gap-8 items-start">
//         {/* === FORM KIRI === */}
//         <div className="flex-1 w-full space-y-5">
          
//           {/* Nama */}
//           <div className="space-y-2">
//             <label className="text-sm text-gray-400">Nama Pengguna/Organisasi</label>
//             <input
//               type="text"
//               defaultValue="Maulana pt event organizer"
//               className="w-full bg-gray-100 text-biru-tua font-medium px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-emas/50"
//             />
//           </div>

//           {/* Email */}
//           <div className="space-y-2">
//             <label className="text-sm text-gray-400">Email</label>
//             <input
//               type="email"
//               defaultValue="maulana@gmail.com"
//               className="w-full bg-gray-100 text-biru-tua font-medium px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-emas/50"
//             />
//           </div>

//           {/* Nomor */}
//           <div className="space-y-2">
//             <label className="text-sm text-gray-400">Nomor Terdaftar</label>
//             <input
//               type="text"
//               defaultValue="08123456789"
//               className="w-full bg-gray-100 text-biru-tua font-medium px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-emas/50"
//             />
//           </div>

//           {/* Tombol Aksi */}
//           <div className="flex flex-col sm:flex-row gap-4 pt-4">
//             <button className="flex-1 bg-gray-200 text-gray-500 py-3 rounded-xl font-semibold hover:bg-gray-300 transition">
//               Batalkan perubahan
//             </button>
//             <button className="flex-1 bg-biru-muda text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
//               Simpan perubahan
//             </button>
//           </div>
//         </div>

//         {/* === FOTO KANAN === */}
//         <div className="flex flex-col items-center gap-12 md:ml-auto">
//           <div className="relative">
//             <div className="w-28 h-28 rounded-full bg-gray-200 border-5 border-white shadow-lg overflow-hidden">
//                 {/* Placeholder image, ganti dengan src={userImage} jika ada */}
//                <img src="https://via.placeholder.com/150" alt="Profile" className="w-full h-full object-cover" />
//             </div>
//             <button className="absolute bottom-0 right-0 bg-biru-muda text-white p-2 rounded-full border-2 border-white hover:bg-blue-700 transition">
//               <FaPencilAlt size={12} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


