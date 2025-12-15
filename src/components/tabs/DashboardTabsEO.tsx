import type { FC } from "react";

export type EOTabMode = "all" | "applied";

interface TabsProps {
  active: EOTabMode;
  onChange: (v: EOTabMode) => void;
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
          Daftar Sponsor
        </button>

        <button
          onClick={() => onChange("applied")}
          className={`text-sm ${
            active === "applied"
              ? "underline font-bold text-putih"
              : "text-gray-400 font-bold"
          }`}
        >
          Daftar Proposal Diajukan
        </button>
      </div>
    </div>
  );
};

export default DashboardTabs;
