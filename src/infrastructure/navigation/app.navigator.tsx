import { Route, Routes } from "react-router-dom";
import LoginScreen from "../../features/app/screens/login.screen";
import PriorityScreen from "../../features/app/screens/priority.screen";
import NotFoundScreen from "../../features/app/screens/not.found.screen";

const AppNavigator = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/priority/:id" element={<PriorityScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
};

export default AppNavigator;
