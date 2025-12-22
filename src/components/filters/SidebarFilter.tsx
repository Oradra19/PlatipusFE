import { useState } from "react";
import type { FC, ReactNode } from "react";

export interface EventFilter {
  categories: string[];
  locations: string[];
  sponsorTypes: string[];
  modes: string[];
}

interface Props {
  filters: EventFilter;
  onChange: (f: EventFilter) => void;
}

const cities = ["Jakarta", "Bandung", "Surabaya", "Yogyakarta", "Solo"];

const SidebarFilter: FC<Props> = ({ filters, onChange }) => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setExpanded((s) => ({ ...s, [key]: !s[key] }));

  const toggleValue = (key: keyof EventFilter, value: string) => {
    const current = filters[key];
    onChange({
      ...filters,
      [key]: current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value],
    });
  };

  const Section: FC<{ title: string; id: string; children: ReactNode }> = ({
    title,
    id,
    children,
  }) => (
    <div className="mb-4 border rounded bg-white text-black">
      <div className="p-4 flex justify-between items-center">
        <div className="font-medium">{title}</div>
        <button onClick={() => toggle(id)}>
          {expanded[id] ? "-" : "+"}
        </button>
      </div>
      {expanded[id] && <div className="p-4 space-y-2">{children}</div>}
    </div>
  );

  return (
    <aside className="w-72">
      <div className="bg-white p-4 rounded shadow text-black font-semibold">
        Filters
      </div>

      <div className="mt-4">
        <Section id="category" title="Kategori">
          {["Technology", "Education", "Music", "Sports"].map((c) => (
            <label key={c} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.categories.includes(c)}
                onChange={() => toggleValue("categories", c)}
              />
              {c}
            </label>
          ))}
        </Section>

        <Section id="location" title="Lokasi">
          {cities.map((c) => (
            <label key={c} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.locations.includes(c)}
                onChange={() => toggleValue("locations", c)}
              />
              {c}
            </label>
          ))}
        </Section>

        <Section id="sponsor" title="Tipe Sponsor">
          {[
            "Title Sponsor",
            "Main Sponsor",
            "Co-Sponsor",
            "Media Partner",
            "Community Partner",
          ].map((s) => (
            <label key={s} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.sponsorTypes.includes(s)}
                onChange={() => toggleValue("sponsorTypes", s)}
              />
              {s}
            </label>
          ))}
        </Section>

        <Section id="mode" title="Mode Event">
          {["Online", "Offline", "Hybrid"].map((m) => (
            <label key={m} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.modes.includes(m)}
                onChange={() => toggleValue("modes", m)}
              />
              {m}
            </label>
          ))}
        </Section>
      </div>
    </aside>
  );
};

export default SidebarFilter;
