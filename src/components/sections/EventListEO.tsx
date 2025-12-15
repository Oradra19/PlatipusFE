import { useEffect, useState } from "react";
import type { FC } from "react";
import EventCardEO, { CardMode } from "../card/EventCardEO";
import type { SimpleEOCard } from "../../services/MockEventEO";
import {
  getAllSponsor,
  getAppliedFast,
  getAppliedNormal,
} from "../../services/api";

type Mode = "all" | "applied";

const EventList: FC<{ mode: Mode }> = ({ mode }) => {
  const [items, setItems] = useState<SimpleEOCard[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const perPage = 12;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setItems([]);
      setPage(1);

      try {
        /* ================= AMBIL SEMUA SPONSOR ================= */
        const sponsorRes = await getAllSponsor();
        const sponsors = Array.isArray(sponsorRes?.sponsors)
          ? sponsorRes.sponsors
          : [];

        // MAP sponsor_id => sponsor
        const sponsorMap = new Map(
          sponsors.map((s: any) => [s.sponsor_id, s])
        );

        /* ================= TAB : DAFTAR SPONSOR ================= */
        if (mode === "all") {
          const mapped: SimpleEOCard[] = sponsors.map((s: any) => ({
            id: s.sponsor_id,
            brandName: s.company_name,
            companyName: s.company_name,
            description: s.description ?? "Belum ada deskripsi",
            category: s.category_name,
            status: s.status,
            sponsorTypes: [s.type_name],
            coverage: s.scope_name,
            budget: `Rp ${Number(s.budget_min).toLocaleString(
              "id-ID"
            )} - Rp ${Number(s.budget_max).toLocaleString("id-ID")}`,
            logo: "/placeholder-logo.png",
            isFastTrack: false,
          }));

          setItems(mapped);
          return;
        }

        /* ================= TAB : PROPOSAL DIAJUKAN ================= */
        const [fastRes, normalRes] = await Promise.all([
          getAppliedFast(),
          getAppliedNormal(),
        ]);

        const fast = Array.isArray(fastRes?.proposals)
          ? fastRes.proposals.map((p: any) => ({ ...p, track: "fast" }))
          : [];

        const normal = Array.isArray(normalRes?.sponsors)
          ? normalRes.sponsors.map((p: any) => ({ ...p, track: "normal" }))
          : [];

        const merged = [...fast, ...normal];

        const mapped: SimpleEOCard[] = merged
          .map((p: any) => {
            const sponsor = sponsorMap.get(p.sponsor_id);
            if (!sponsor) return null;

            return {
              id: sponsor.sponsor_id,
              brandName: sponsor.company_name,
              companyName: sponsor.company_name,
              description:
                sponsor.description ?? "Belum ada deskripsi",
              category: sponsor.category_name,
              status: p.status ?? p.proposal_status ?? "-",
              sponsorTypes: [sponsor.type_name],
              coverage: sponsor.scope_name,
              budget: `Rp ${Number(sponsor.budget_min).toLocaleString(
                "id-ID"
              )} - Rp ${Number(sponsor.budget_max).toLocaleString(
                "id-ID"
              )}`,
              logo: "/placeholder-logo.png",
              isFastTrack: p.track === "fast",
            };
          })
          .filter(Boolean) as SimpleEOCard[];

        setItems(mapped);
      } catch (err) {
        console.error("Gagal memuat data", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [mode]);

  /* ================= UI STATE ================= */
  if (loading) {
    return (
      <div className="py-32 text-center text-gray-400 font-semibold">
        Memuat data...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20 text-center text-gray-400">
        {mode === "applied"
          ? "Belum ada proposal yang diajukan"
          : "Belum ada sponsor tersedia"}
      </div>
    );
  }

  const total = Math.ceil(items.length / perPage);
  const shown = items.slice((page - 1) * perPage, page * perPage);
  const fastItems = shown.filter((i) => i.isFastTrack);
const normalItems = shown.filter((i) => !i.isFastTrack);


  return (
  <section className="max-w-7xl mx-auto">
    {/* ================= FAST TRACK ================= */}
    {shown.some((i) => i.isFastTrack) && (
      <section className="bg-emas/70 p-6 rounded-2xl mb-10">
        <div className="inline-block bg-emas text-biru-tua font-bold px-4 py-2 rounded-lg mb-6">
          FAST TRACK
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {shown
            .filter((i) => i.isFastTrack)
            .map((item) => (
              <EventCardEO
                key={item.id}
                data={item}
                mode={mode === "applied" ? "applied" : "browse"}
              />
            ))}
        </div>
      </section>
    )}

    {/* ================= NORMAL ================= */}
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {shown
          .filter((i) => !i.isFastTrack)
          .map((item) => (
            <EventCardEO
              key={item.id}
              data={item}
              mode={mode === "applied" ? "applied" : "browse"}
            />
          ))}
      </div>
    </section>

    {/* ================= PAGINATION ================= */}
    {total > 1 && (
      <div className="flex justify-center gap-3 mt-10">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-4 py-2 border rounded-md"
        >
          {"<"}
        </button>

        <span className="px-4 py-2 font-semibold">{page}</span>

        <button
          onClick={() => setPage((p) => Math.min(total, p + 1))}
          className="px-4 py-2 border rounded-md"
        >
          {">"}
        </button>
      </div>
    )}
  </section>
);

};

export default EventList;
