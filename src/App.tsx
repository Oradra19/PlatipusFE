import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;