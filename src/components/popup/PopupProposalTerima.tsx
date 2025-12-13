import React from "react";
import CheckIcon from "../../assets/centang2.png";

const ReviewResultAccepted: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-[#071424] text-white flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full py-6 text-center border-b-[3px] border-yellow-500">
        <h1 className="text-xl font-semibold">Hasil Review</h1>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center flex-1 py-10">
        <img
          src={CheckIcon}
          alt="Success Icon"
          className="w-24 h-24 mb-6"
        />

        <h2 className="text-2xl font-semibold text-black mt-4">
          Proposal Diterima
        </h2>
      </div>

      {/* Footer Response */}
      <div className="w-full bg-[#071424] px-8 py-10">
        <div className="flex items-center gap-3 text-white mb-3">
          <span className="text-xl">👤</span>
          <p className="font-semibold">Tanggapan Perusahaan</p>
        </div>

        <p className="text-gray-300 leading-relaxed max-w-3xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua.
        </p>
      </div>

    </div>
  );
};

export default ReviewResultAccepted;
