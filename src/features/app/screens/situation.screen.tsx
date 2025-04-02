import React, { useState } from "react";
// import SituationForm from "../components/question.form";
// import SituationRegister from "../components/situation.register";
import "../styles/situation.styles.css";

const SituationScreen = () => {
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
    <div className="situation-screen">
      <div className="pr-container">
        {/* {!isRegistered ? (
          <SituationForm />
        ) : (
          <SituationRegister handleRegister={handleRegister} />
        )} */}
      </div>
    </div>
  );
};

export default SituationScreen;
