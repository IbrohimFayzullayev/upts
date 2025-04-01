import React, { useState } from "react";
import PriorityList from "./priority.list";
import PrList from "./pr.list";

const PriorityForm: React.FC = () => {
  return (
    <form id="priorityForm">
      <h2>Siz uchun ishda nima muhim</h2>
      <p className="instructions">
        Ishdagi faktorlarni muhimlik darajasida tartibga keltiring. Eng muhim
        narsani ustiga bosing. U tepaga ko'tariladi. Qolganlarini ham muhimlik
        darajasida shunday qiling.
      </p>
      {/* <PriorityList /> */}
      <PrList />
    </form>
  );
};

export default PriorityForm;
