import type { FC } from "react";
import { useEffect, useState } from "react";
import {
  getProfile,
  updateProfile,
  getSponsorMasters,
} from "../../services/api";

const ProfileForm: FC = () => {
  const [openStatus, setOpenStatus] = useState<"tertutup" | "terbuka">(
    "tertutup"
  );

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [scopeId, setScopeId] = useState<number | null>(null);
  const [typeId, setTypeId] = useState<number | null>(null);

  const [categories, setCategories] = useState<any[]>([]);
  const [types, setTypes] = useState<any[]>([]);
  const [scopes, setScopes] = useState<any[]>([]);

  const [budgetRange, setBudgetRange] = useState<string>("");

  const [isSaving, setIsSaving] = useState(false);

  /* ================= LOAD ================= */
  useEffect(() => {
    getProfile().then((res) => {
      setCompanyName(res.profile?.company_name || "");
      setEmail(res.user?.email || "");
      setPhone(res.user?.phone || "");
      setOpenStatus(res.profile?.status === "Open" ? "terbuka" : "tertutup");
      setCategoryId(res.profile?.sponsor_category_id);
      setScopeId(res.profile?.sponsor_scope_id);
      setTypeId(res.profile?.sponsor_type_id ?? null);

      if (res.profile?.budget_min && res.profile?.budget_max) {
        setBudgetRange(
          `${res.profile.budget_min}-${res.profile.budget_max}`
        );
      }
    });

    getSponsorMasters().then((res) => {
      setCategories(res.categories);
      setTypes(res.types);
      setScopes(res.scopes);
    });
  }, []);

  const handleSubmit = async () => {
    if (isSaving) return;

    setIsSaving(true);

    try {
      const [min, max] = budgetRange
        ? budgetRange.split("-").map(Number)
        : [null, null];

      await updateProfile({
        company_name: companyName,
        status: openStatus === "terbuka" ? "Open" : "Closed",
        sponsor_category_id: categoryId,
        sponsor_type_id: typeId ? [typeId] : null,
        sponsor_scope_id: scopeId,
        budget_min: min,
        budget_max: max,
      });

      localStorage.setItem("profile_complete", "true");
      alert("Profil berhasil disimpan");
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan profil");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-background text-biru-tua rounded-3xl p-10 shadow-lg">
      <h3 className="text-xl font-semibold mb-6">Personal Informasi</h3>

      <p className="text-sm font-medium mb-2">Open sponsorship</p>
      <div className="flex items-center gap-6 mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={openStatus === "tertutup"}
            onChange={() => setOpenStatus("tertutup")}
          />
          Tertutup
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            checked={openStatus === "terbuka"}
            onChange={() => setOpenStatus("terbuka")}
          />
          Terbuka
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-gray-600">Nama sponsor</label>
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="mt-1 w-full bg-putih py-3 px-4 rounded-xl outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Email sponsor</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full bg-putih py-3 px-4 rounded-xl outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-gray-600">Nomor terdaftar</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-1 w-full bg-putih py-3 px-4 rounded-xl outline-none"
          />
        </div>
      </div>

      <div className="border-t border-abu-abu my-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-gray-600">
            Pilih kategori sponsor
          </label>
          <select
            value={categoryId ?? ""}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="w-full mt-1 py-3 px-4 rounded-xl bg-putih outline-none"
          >
            <option value="">Pilih Kategori</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">Tipe sponsor</label>
          <select
            value={typeId ?? ""}
            onChange={(e) => setTypeId(Number(e.target.value))}
            className="w-full mt-1 py-3 px-4 rounded-xl bg-putih outline-none"
          >
            <option value="">Pilih Tipe Sponsor</option>
            {types.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">Pilih Cakupan Sponsor</label>
          <select
            value={scopeId ?? ""}
            onChange={(e) => setScopeId(Number(e.target.value))}
            className="w-full mt-1 py-3 px-4 rounded-xl bg-putih outline-none"
          >
            <option value="">Pilih Cakupan</option>
            {scopes.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-600">
            Budget Sponsorship
          </label>
          <select
            value={budgetRange}
            onChange={(e) => setBudgetRange(e.target.value)}
            className="w-full mt-1 py-3 px-4 rounded-xl bg-putih outline-none"
          >
            <option value="">Pilih Range Sponsorship</option>
            <option value="1000000-5000000">1jt – 5jt</option>
            <option value="5000000-10000000">5jt – 10jt</option>
            <option value="10000000-25000000">10jt – 25jt</option>
            <option value="25000000-50000000">25jt – 50jt</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-10">
        <button className="w-full sm:w-1/2 py-3 bg-red-200 text-red-600 rounded-xl font-semibold hover:bg-red-300 transition">
          Batalkan perubahan
        </button>

        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className={`w-full sm:w-1/2 py-3 rounded-xl text-white transition
            ${isSaving ? "bg-gray-400 cursor-not-allowed" : "bg-biru-muda"}
          `}
        >
          {isSaving ? "Menyimpan..." : "Simpan perubahan"}
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
