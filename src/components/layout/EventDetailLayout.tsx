import type { FC, ReactNode } from "react";
import NavbarDashboard from "../common/NavbarDashboard";
import Footer from "../common/Footer";

interface Props {
  username: string;
  children: ReactNode;
}

const EventDetailLayout: FC<Props> = ({ username, children }) => {
  return (
    <div id="page-top" className="min-h-screen bg-putih flex flex-col">
      {/* NAVBAR */}
      <NavbarDashboard username={username} />

      {/* MAIN CONTENT (harus flex-1 supaya footer nempel) */}
      <main className="flex-1 w-full">
        {children}
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default EventDetailLayout;
