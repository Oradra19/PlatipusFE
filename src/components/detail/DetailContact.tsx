import type { FC } from "react";
import type { EventData } from "../../services/mockEvent";

const DetailContact: FC<{ event: EventData }> = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-biru-tua mb-3">Hubungi</h3>

      <div className="flex gap-3">
        <button className="px-4 py-2 bg-green-500 text-white text-xs rounded-md">
          WhatsApp
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white text-xs rounded-md">
          Email
        </button>
      </div>
    </div>
  );
};

export default DetailContact;
