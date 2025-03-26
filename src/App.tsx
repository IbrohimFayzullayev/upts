import { BrowserRouter } from "react-router-dom";
import Navigation from "./infrastructure/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
}

export default App;
