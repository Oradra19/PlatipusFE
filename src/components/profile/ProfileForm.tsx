import type { FC } from "react";
import { useState } from "react";

const TagInput: FC<{
  tags: string[];
  setTags: (tags: string[]) => void;
}> = ({ tags, setTags }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();

      if (tags.length >= 3) return; // max 3
      if (tags.includes(input.trim())) return; // avoid duplicate

      setTags([...tags, input.trim()]);
      setInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  return (
    <div>
      {/* Input */}
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Masukkan tipe sponsor"
        className="w-full bg-putih py-3 px-4 rounded-xl outline-none"
      />

      {/* Tag List */}
      <div className="flex flex-wrap gap-2 mt-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-2"
          >
            {tag}
            <button
              onClick={() => removeTag(tag)}
              className="text-gray-600 hover:text-black"
            >
              ✕
            </button>
          </span>
        ))}
      </div>

      {tags.length >= 3 && (
        <p className="text-xs text-red-500 mt-1">*maksimal 3 tipe sponsor</p>
      )}
    </div>
  );
};

const ProfileForm: FC = () => {
  const [openStatus, setOpenStatus] = useState("tertutup");
  const [tags, setTags] = useState<string[]>([]);

  return (
    <div className="bg-background text-biru-tua rounded-3xl p-10 shadow-lg">

      <h3 className="text-xl font-semibold mb-6">Personal Informasi</h3>

      {/* Open Sponsorship */}
      <p className="text-sm font-medium mb-2">Open sponsorship</p>

      <div className="flex items-center gap-6 mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="openstatus"
            checked={openStatus === "tertutup"}
            onChange={() => setOpenStatus("tertutup")}
          />
          Tertutup
        </label>

        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="openstatus"
            checked={openStatus === "terbuka"}
            onChange={() => setOpenStatus("terbuka")}
          />
          Terbuka
        </label>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Nama sponsor */}
        <div>
          <label className="text-sm text-gray-600">Nama sponsor</label>
          <input
            className="mt-1 w-full bg-putih py-3 px-4 rounded-xl outline-none"
            defaultValue="PT Indonesia Semakin Maju"
          />
        </div>

        {/* Email sponsor */}
        <div>
          <label className="text-sm text-gray-600">Email sponsor</label>
          <input
            className="mt-1 w-full bg-putih py-3 px-4 rounded-xl outline-none"
            defaultValue="ism@ism.com"
          />
        </div>

        {/* Nomor terdaftar */}
        <div>
          <label className="text-sm text-gray-600">Nomor terdaftar</label>
          <input
            className="mt-1 w-full bg-putih py-3 px-4 rounded-xl outline-none"
            defaultValue="08123456789"
          />
        </div>
      </div>

      {/* GARIS */}
      <div className="border-t border-abu-abu my-8" />

      {/* Dropdown row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <div>
          <label className="text-sm text-gray-600">Pilih kategori sponsor</label>
          <select className="w-full mt-1 py-3 px-4 rounded-xl bg-putih outline-none">
            <option>Pilih Kategori</option>
          </select>
        </div>

        <div>
            <label className="text-sm text-gray-600">Tipe sponsor</label>
            <TagInput tags={tags} setTags={setTags} />
        </div>

        <div>
          <label className="text-sm text-gray-600">Pilih Cakupan Sponsor</label>
          <select className="w-full mt-1 py-3 px-4 rounded-xl bg-putih outline-none">
            <option>Pilih Cakupan</option>
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">Budget Sponsorship</label>
          <select className="w-full mt-1 py-3 px-4 rounded-xl bg-putih outline-none">
            <option>Pilih Range Sponsorship</option>
          </select>
        </div>

      </div>

      {/* BUTTON ACTIONS */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
        <button className="w-full sm:w-1/2 py-3 bg-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-300 transition">
          Batalkan perubahan
        </button>

        <button className="w-full sm:w-1/2 py-3 bg-biru-muda text-white rounded-xl font-semibold hover:bg-blue-700 transition">
          Simpan perubahan
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
