import { Route, Routes } from "react-router-dom";
import LoginScreen from "../../features/app/screens/login.screen";

const AccountNavigator = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginScreen />} />
    </Routes>
  );
};

export default AccountNavigator;
