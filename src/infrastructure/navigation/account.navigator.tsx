import { Route, Routes } from "react-router-dom";
import DashboardScreen from "../../features/app/screens/dashboard.screen";

const AccountNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardScreen />} />
    </Routes>
  );
};

export default AccountNavigator;
