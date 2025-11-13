import { useState } from "react";
import RegisterLayout from "./components/RegisterLayout";
import RoleSelector from "./components/RoleSelector";
import RegisterFormEO from "./components/RegisterFormEO";
import RegisterFormSponsor from "./components/RegisterFormSponsor";
import BackgroundLogo from "./components/BackgroundLogo";

const Register = () => {
  const [selectedRole, setSelectedRole] = useState<"eo" | "sponsor">("eo");

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row justify-center items-center gap-10 bg-[#E9E3E1] px-6">
      {/* Logo abu pojok kanan bawah */}
      <BackgroundLogo />
    <RegisterLayout>
      {/* Kiri: pilih role */}
      <RoleSelector selectedRole={selectedRole} onSelectRole={setSelectedRole} />

      {/* Kanan: form berubah sesuai role */}
      {selectedRole === "eo" ? <RegisterFormEO /> : <RegisterFormSponsor />}
    </RegisterLayout>
    </div>
  );
  
};

export default Register;
