import { BrowserRouter } from "react-router-dom";
import Navigation from "./infrastructure/navigation";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>
  );
}

export default App;
