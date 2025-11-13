import logoabu from "../../../assets/Logoabu.png";

const BackgroundLogo = () => {
  return (
    <img
      src={logoabu}
      alt="Logo Abu Platipus"
      className="fixed bottom-2 right-2 w-40 md:w-56 lg:w-72 object-contain opacity-60 pointer-events-none select-none"
    />
  );
};

export default BackgroundLogo;
