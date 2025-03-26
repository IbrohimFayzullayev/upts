import { Route, Routes } from "react-router-dom";
import DashboardScreen from "../../features/app/screens/dashboard.screen";
import PriorityScreen from "../../features/app/screens/priority.screen";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/login" element={<div>Login</div>} />
      <Route path="/" element={<DashboardScreen />} />
      <Route path="/priority" element={<PriorityScreen />} />
    </Routes>
  );
};

export default Navigation;
