import { BrowserRouter } from "react-router-dom";
import Navigation from "./infrastructure/navigation";
import { AuthenticationProvider } from "./services/authentication/authentication.context";
// import { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <Navigation />
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
