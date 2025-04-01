import { BrowserRouter } from "react-router-dom";
import Navigation from "./infrastructure/navigation";
import { AuthenticationProvider } from "./services/authentication/authentication.context";
// import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      {/* <Toaster position="top-right" reverseOrder={false} /> */}
      <AuthenticationProvider>
        <Navigation />
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
