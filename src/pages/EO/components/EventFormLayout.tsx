import type { FC, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

interface Props {
  title: string;
  children: ReactNode;
}

const EventFormLayout: FC<Props> = ({ title, children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* HEADER KHUSUS */}
      <div className="bg-[#0C1626] px-6 py-6 flex items-center relative shadow-md">
        {/* Tombol Dashboard (Kiri) */}
        <button
          onClick={() => navigate("/dashboard/eo")}
          className="absolute left-6 flex items-center gap-2 bg-[#2F57EB] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-lg"
        >
          <FaHome />
          <span className="font-medium text-sm">Dashboard</span>
        </button>

        {/* Judul Tengah */}
        <h1 className="w-full text-center text-white text-xl md:text-2xl font-bold tracking-wide">
          {title}
        </h1>
      </div>

      {/* CONTENT FORM */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {children}
      </div>
    </div>
  );
};

export default EventFormLayout;