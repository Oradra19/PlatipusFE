import type { FC } from "react";
import { FaPencilAlt } from "react-icons/fa";

const EOProfileCard: FC = () => {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
      <h2 className="text-lg font-bold text-biru-tua mb-6">Personal Informasi</h2>

      <div className="flex flex-col-reverse md:flex-row gap-8 items-start">
        {/* === FORM KIRI === */}
        <div className="flex-1 w-full space-y-5">
          
          {/* Nama */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Nama Pengguna/Organisasi</label>
            <input
              type="text"
              defaultValue="Maulana pt event organizer"
              className="w-full bg-gray-100 text-biru-tua font-medium px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-emas/50"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              defaultValue="maulana@gmail.com"
              className="w-full bg-gray-100 text-biru-tua font-medium px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-emas/50"
            />
          </div>

          {/* Nomor */}
          <div className="space-y-2">
            <label className="text-sm text-gray-400">Nomor Terdaftar</label>
            <input
              type="text"
              defaultValue="08123456789"
              className="w-full bg-gray-100 text-biru-tua font-medium px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-emas/50"
            />
          </div>

          {/* Tombol Aksi */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="flex-1 bg-gray-200 text-gray-500 py-3 rounded-xl font-semibold hover:bg-gray-300 transition">
              Batalkan perubahan
            </button>
            <button className="flex-1 bg-biru-muda text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
              Simpan perubahan
            </button>
          </div>
        </div>

        {/* === FOTO KANAN === */}
        <div className="flex flex-col items-center gap-12 md:ml-auto">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gray-200 border-5 border-white shadow-lg overflow-hidden">
                {/* Placeholder image, ganti dengan src={userImage} jika ada */}
               <img src="https://via.placeholder.com/150" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-0 right-0 bg-biru-muda text-white p-2 rounded-full border-2 border-white hover:bg-blue-700 transition">
              <FaPencilAlt size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EOProfileCard;