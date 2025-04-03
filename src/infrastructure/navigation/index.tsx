import { AuthenticationContext } from "../../services/authentication/authentication.context";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginScreen from "../../features/app/screens/login.screen";
import PriorityScreen from "../../features/app/screens/priority.screen";
import NotFoundScreen from "../../features/app/screens/not.found.screen";
import DashboardScreen from "../../features/app/screens/dashboard.screen";
import { ReactNode, useContext } from "react";

const AuthWrapper = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, isLoading } = useContext(AuthenticationContext);
  if (isLoading) {
    return (
      <div className="isloading-screen">
        <div className="isloading-spinner"></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const Navigation = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AuthWrapper>
            <DashboardScreen />
          </AuthWrapper>
        }
      />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/priority/:id" element={<PriorityScreen />} />
      <Route path="*" element={<NotFoundScreen />} />
    </Routes>
  );
};

export default Navigation;
