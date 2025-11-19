import type { FC } from "react";

interface TabsProps {
  active: "all" | "proposal";
  onChange: (v: "all" | "proposal") => void;
}

const DashboardTabs: FC<TabsProps> = ({ active, onChange }) => {
  return (
    <div className="rounded-t-2xl bg-biru-tua p-6 -mt-8">
      <div className="w-full flex gap-10 justify-start">

        <button
          onClick={() => onChange("all")}
          className={`text-sm ${
            active === "all" ? "underline text-white" : "text-gray-400"
          }`}
        >
          Daftar Semua Event
        </button>
        <button
          onClick={() => onChange("proposal")}
          className={`text-sm ${
            active === "proposal" ? "underline text-white" : "text-gray-400"
          }`}
        >
          Daftar Proposal Event Masuk
        </button>
      </div>
    </div>
  );
};
export default DashboardTabs;
