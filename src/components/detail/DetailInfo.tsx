import type { FC } from "react";
import type { EventData } from "../../services/mockEvent";
import { FaUsers, FaMoneyBillWave, FaUserFriends, FaClock } from "react-icons/fa";

const DetailInfo: FC<{ event: EventData }> = ({ event }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-biru-tua mb-4">
        Informasi Lain
      </h3>

      <ul className="text-gray-700 text-sm space-y-4">

        {/* Target Audiens */}
        <li className="flex items-center gap-3">
          <FaUsers size={16} className="text-[#2F40D3]" />
          <span>{event.audience || "Umum"}</span>
        </li>

        {/* Budget */}
        <li className="flex items-center gap-3">
          <FaMoneyBillWave size={16} className="text-[#2F40D3]" />
          <span>{event.tags?.[0] || "Tidak tersedia"}</span>
        </li>

        {/* Kategori (Skala Event) */}
        <li className="flex items-center gap-3">
          <FaUserFriends size={16} className="text-[#2F40D3]" />
          <span>{event.tags?.[2] || "Tidak tersedia"}</span>
        </li>

        {/* Mode Event */}
        <li className="flex items-center gap-3">
          <FaClock size={16} className="text-[#2F40D3]" />
          <span>{event.tags?.[3] || "Tidak tersedia"}</span>
        </li>
      </ul>
    </div>
  );
};

export default DetailInfo;
