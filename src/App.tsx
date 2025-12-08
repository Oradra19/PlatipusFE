import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import SponsorDashboardPage from "./pages/Sponsor/SponsorDashboard";
import EventDetail from "./pages/Sponsor/EventDetail";
import SponsorProfile from "./pages/Sponsor/SponsorProfile";
import EODashboard from "./pages/EO/EODashboard";
import EOAddEvent from "./pages/EO/EOAddEvent"; 
import EOEditEvent from "./pages/EO/EOEditEvent";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* DASHBOARD */}
      <Route path="/dashboard/sponsor" element={<SponsorDashboardPage />} />
      <Route path="/dashboard/sponsor/event/:id" element={<EventDetail />} />
      <Route path="/profile/sponsor" element={<SponsorProfile />} />

      {/* EO ROUTES  */}
      <Route path="/dashboard/eo" element={<EODashboard />} />
      <Route path="/dashboard/eo/add" element={<EOAddEvent />} />
      <Route path="/dashboard/eo/edit/:id" element={<EOEditEvent />} />

    </Routes>
  );
};

export default App;
