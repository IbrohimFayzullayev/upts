import { useState } from "react";
import PriorityForm from "../components/priority.form";
import PriorityRegister from "../components/priority.register";
import "../styles/priority.styles.css";

const PriorityScreen = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [data, setData] = useState({
    fullName: "",
    phone: "",
  });

  const handleRegister = (fullName: string, phone: string) => {
    setData({ fullName, phone });
    setIsRegistered(true);
  };

  return (
    <div className="priority-screen">
      <div className="pr-container">
        {isRegistered ? (
          <PriorityForm />
        ) : (
          <PriorityRegister handleRegister={handleRegister} />
        )}
      </div>
    </div>
  );
};

export default PriorityScreen;
