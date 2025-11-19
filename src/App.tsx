import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import SponsorDashboardPage from "./pages/Sponsor/SponsorDashboard";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* DASHBOARD */}
      <Route path="/dashboard/sponsor" element={<SponsorDashboardPage />} />
    </Routes>
  );
};

export default App;
