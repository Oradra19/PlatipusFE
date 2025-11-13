const RegisterLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-[#E9E3E1] flex flex-col md:flex-row justify-center items-center gap-8 px-4 py-8">
      {children}
    </div>
  );
};

export default RegisterLayout;
