import { useState } from "react";
import PriorityForm from "../components/priority.form";
import PriorityRegister from "../components/priority.register";
import "../styles/priority.styles.css";

const PriorityScreen = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  return (
    <div className="priority-screen">
      <div className="container">
        {!isRegistered ? <PriorityForm /> : <PriorityRegister />}
      </div>
    </div>
  );
};

export default PriorityScreen;
