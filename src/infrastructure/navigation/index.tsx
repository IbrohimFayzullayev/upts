import { Route, Routes } from "react-router-dom";
import DashboardScreen from "../../features/app/screens/dashboard.screen";
import PriorityScreen from "../../features/app/screens/priority.screen";
import LoginScreen from "../../features/app/screens/login.screen";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/priority" element={<PriorityScreen />} />
      <Route path="/" element={<DashboardScreen />} />
    </Routes>
  );
};

export default Navigation;
