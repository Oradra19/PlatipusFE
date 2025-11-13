import logo from "../../../assets/Logo.png";

const LoginLogoCard = () => {
  return (
    <div className="bg-[#0C1626] text-[#D4AF37] shadow-xl rounded-2xl p-10 md:p-14 lg:p-20 flex flex-col justify-center items-center w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl">
      <img
        src={logo}
        alt="Platipus Logo"
        className="w-40 sm:w-52 md:w-64 lg:w-80 mb-6"
      />
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#D4AF37]">
        Platipus
      </h1>
    </div>
  );
};

export default LoginLogoCard;
