import LoginLogoCard from "./components/LoginLogoCard";
import LoginFormCard from "./components/LoginFormCard";
import BackgroundLogo from "./components/BackgroundLogo";

const Login = () => {
  return (
    <div className="relative min-h-screen flex flex-col md:flex-row justify-center items-center gap-10 bg-[#E9E3E1] px-6">
      {/* Logo abu pojok kanan bawah */}
      <BackgroundLogo />

      {/* Dua Card (Logo + Form) */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center z-10">
        <LoginLogoCard />
        <LoginFormCard />
      </div>
    </div>
  );
};

export default Login;
