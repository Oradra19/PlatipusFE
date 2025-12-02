import type { FC } from "react";
import checkBadge from "../../assets/centang.png";

interface Props {
  onClose: () => void;
}

const PopupLogin: FC<Props> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <div
        className="
          bg-putih 
          rounded-3xl 
          w-full 
          max-w-xl 
          p-8 
          border-8 
          border-emas 
          text-center 
          shadow-xl

          sm:p-10
          sm:rounded-3xl

          max-sm:max-w-sm 
          max-sm:p-6
        "
      >
        {/* ICON BADGE */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <img
            src={checkBadge}
            alt="Centang"
            className="w-28 h-28 sm:w-40 sm:h-40 object-contain"
          />
        </div>

        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3 sm:mb-4">
          Berhasil Login
        </h1>

        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10">
          Beberapa data profil kamu masih kosong nih.{" "}
          <br className="hidden sm:block" />
          Lengkapi dulu yuk supaya Event Organizer bisa tahu lebih banyak
          tentang brand kamu.
        </p>

        <button
          onClick={onClose}
          className="
            bg-green-600 
            text-white 
            font-semibold 
            px-8 py-3 
            rounded-xl 
            hover:bg-green-700 
            transition
            text-sm sm:text-base
          "
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default PopupLogin;
