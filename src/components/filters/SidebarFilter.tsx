import { FC, useState, ReactNode } from "react";

const SidebarFilter: FC = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const toggle = (key: string) =>
    setExpanded((s) => ({ ...s, [key]: !s[key] }));

  const Section: FC<{ title: string; children?: ReactNode; id: string }> = ({
    title,
    children,
    id,
  }) => (
    <div className="mb-4 border rounded bg-white text-black">
      <div className="p-4 flex justify-between items-center">
        <div className="font-medium">{title}</div>
        <button onClick={() => toggle(id)}>{expanded[id] ? "-" : "+"}</button>
      </div>
      {expanded[id] && <div className="p-4">{children}</div>}
    </div>
  );

  return (
    <aside className="w-72">
      <div className="bg-white p-4 rounded shadow text-black">
        <h4 className="font-semibold">Filters</h4>
      </div>

      <div className="mt-4">
        <Section id="kategori" title="Kategori">
          <label>
            <input type="checkbox" /> Teknologi
          </label>
          <br />
          <label>
            <input type="checkbox" /> Musik
          </label>
          <br />
          <label>
            <input type="checkbox" /> Pendidikan
          </label>
          <br />
          <label>
            <input type="checkbox" /> Sosial
          </label>
          <br />
          <label>
            <input type="checkbox" /> Game
          </label>
        </Section>
      </div>
    </aside>
  );
};
export default SidebarFilter;
