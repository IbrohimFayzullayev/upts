import { BrowserRouter } from "react-router-dom";
import Navigation from "./infrastructure/navigation";
import { AuthenticationProvider } from "./services/authentication/authentication.context";
import i18n from "./services/lang/i18n";
import { I18nextProvider } from "react-i18next";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <Toaster position="top-center" reverseOrder={false} />
        <AuthenticationProvider>
          <Navigation />
        </AuthenticationProvider>
      </I18nextProvider>
    </BrowserRouter>
  );
}

export default App;
