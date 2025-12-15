import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.png";
import { getProfile, uploadProfileLogo } from "../../services/api";

interface User {
  name: string;
  profile_picture_url: string | null;
}

interface SponsorProfile {
  company_name: string;
  status: "Open" | "Closed";
}

const ProfileSidebar: FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<SponsorProfile | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getProfile().then((res) => {
      setUser(res.user);
      setProfile(res.profile);
    });
  }, []);

  const handleUploadClick = () => {
    fileRef.current?.click();
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    const preview = URL.createObjectURL(file);
    setUser((prev) =>
      prev ? { ...prev, profile_picture_url: preview } : prev
    );

    try {
      await uploadProfileLogo(
        file,
        profile.company_name,
        profile.status
      );
      const refreshed = await getProfile();
      setUser(refreshed.user);
      setProfile(refreshed.profile);
    } catch (err) {
      console.error(err);
      alert("Gagal upload foto");
    }
  };

  return (
    <div className="bg-background text-biru-tua rounded-3xl p-8 flex flex-col items-center shadow-lg">
      <div className="w-40 h-40 rounded-full bg-putih overflow-hidden mb-6">
        <img
          src={
            user?.profile_picture_url
              ? `${user.profile_picture_url}?t=${Date.now()}`
              : logo
          }
          className="w-full h-full object-contain"
        />
      </div>

      <h2 className="text-lg font-semibold">
        {profile?.company_name || user?.name}
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        Sponsor • {profile?.status === "Open" ? "Terbuka" : "Tertutup"}
      </p>

      <button
        onClick={handleUploadClick}
        className="w-full bg-biru-muda text-white py-3 rounded-xl font-medium mb-4"
      >
        Update Logo Perusahaan
      </button>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
        className="w-full bg-red-200 text-red-600 py-3 rounded-xl font-semibold"
      >
        Keluar Akun
      </button>
    </div>
  );
};

export default ProfileSidebar;
