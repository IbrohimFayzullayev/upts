import { Route, Routes } from "react-router-dom";
import DashboardScreen from "../../features/app/dashboard.screen";

const Navigation = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<div>Home</div>} /> */}
      {/* <Route index element={<div>Index</div>} /> */}
      <Route path="/login" element={<div>Login</div>} />
      <Route path="/" element={<DashboardScreen />} />
    </Routes>
  );
};

export default Navigation;
