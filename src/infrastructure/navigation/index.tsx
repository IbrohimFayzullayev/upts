import { Route, Routes } from "react-router-dom";
import DashboardScreen from "../../features/app/screens/dashboard.screen";
import PriorityScreen from "../../features/app/screens/priority.screen";
import LoginScreen from "../../features/app/screens/login.screen";
import SituationScreen from "../../features/app/screens/situation.screen";
import NotFoundScreen from "../../features/app/screens/not.found.screen";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/priority/:id" element={<PriorityScreen />} />
      <Route path="/situation" element={<SituationScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
};

export default Navigation;
