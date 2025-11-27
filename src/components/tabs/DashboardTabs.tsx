import type { FC } from "react";

interface TabsProps {
  active: "all" | "proposal";
  onChange: (v: "all" | "proposal") => void;
}

const DashboardTabs: FC<TabsProps> = ({ active, onChange }) => {
  return (
    <div className="rounded-t-2xl p-6 -mt-8">
      <div className="w-full flex gap-10 justify-start">
        <button
          onClick={() => onChange("all")}
          className={`text-sm ${
            active === "all"
              ? "underline font-bold text-putih"
              : "text-gray-400 font-bold"
          }`}
        >
          Daftar Semua Event
        </button>
        <button
          onClick={() => onChange("proposal")}
          className={`text-sm ${
            active === "proposal"
              ? "underline font-bold text-putih"
              : "text-gray-400 font-bold"
          }`}
        >
          Daftar Proposal Event Masuk
        </button>
      </div>
    </div>
  );
};
export default DashboardTabs;
