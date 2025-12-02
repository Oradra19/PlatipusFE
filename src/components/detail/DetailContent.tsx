import type { FC } from "react";
import type { EventData } from "../../services/mockEvent";

const DetailContent: FC<{ event: EventData }> = ({ event }) => {
  return (
    <div className="mt-12">

      {/* JUDUL + TAGS */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-biru-tua leading-snug">
          {event.title}
        </h1>

        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-biru-muda text-putih rounded-full text-xs">
            Mode : {event.tags[3]}
          </span>

          <span className="px-3 py-1 bg-biru-muda text-putih rounded-full text-xs">
            Skala : {event.tags[2]}
          </span>

          <span className="px-3 py-1 bg-biru-muda text-putih rounded-full text-xs">
            Jenis Sponsorship : {event.tags[1]}
          </span>
        </div>
      </div>

      {/* DESKRIPSI + GAMBAR (2 kolom) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* DESKRIPSI */}
        <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {event.description ||
            "Deskripsi event belum tersedia. Tambahkan description pada data event."}
        </div>

        {/* FOTO EVENT */}
        <div className="w-full">
          <img
            src={event.image || "/Logo.png"}
            alt={event.title}
            className="w-full h-auto rounded-xl object-cover"
          />
        </div>

      </div>
    </div>
  );
};

export default DetailContent;
