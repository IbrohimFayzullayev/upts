import React, { useEffect, useState } from "react";
import PrList from "./priority.list";
import { Axios } from "../../../utils/axios";

type Item = {
  id: number;
  name: string;
};

const PriorityForm: React.FC = () => {
  const [priorityItems, setPriorityItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Axios.get<{ result: Item[] }>(
          `/test/motivation/?vacancy_id=f92790d7-be60-4484-ac06-9c61f4def7b3`
        ).then((res) => setPriorityItems(res.data.result));
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <form id="priorityForm">
      <h2>Siz uchun ishda nima muhim</h2>
      <p className="instructions">
        Ishdagi faktorlarni muhimlik darajasida tartibga keltiring. Eng muhim
        narsani ustiga bosing. U tepaga ko'tariladi. Qolganlarini ham muhimlik
        darajasida shunday qiling.
      </p>
      <PrList
        priorityItems={priorityItems}
        setPriorityItems={setPriorityItems}
      />
    </form>
  );
};

export default PriorityForm;
