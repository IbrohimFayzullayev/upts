import { Route, Routes } from "react-router-dom";
import DashboardScreen from "../../features/app/screens/dashboard.screen";
import PriorityScreen from "../../features/app/screens/priority.screen";
import LoginScreen from "../../features/app/screens/login.screen";
import SituationScreen from "../../features/app/screens/situation.screen";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      {/* <Route path="/priority" element={<PriorityScreen />} /> */}
      <Route path="/priority/:id" element={<PriorityScreen />} />
      <Route path="/situation" element={<SituationScreen />} />
      <Route path="/" element={<DashboardScreen />} />
    </Routes>
  );
};

export default Navigation;
