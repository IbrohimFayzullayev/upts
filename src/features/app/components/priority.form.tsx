import React, { useEffect, useState } from "react";
import PrList from "./priority.list";
import { Axios } from "../../../utils/axios";

type Item = {
  id: number;
  name: string;
};

type Props = {
  vacancyId: string | undefined;
  setIsPriority: React.Dispatch<React.SetStateAction<boolean>>;
};

const PriorityForm: React.FC<Props> = ({ vacancyId, setIsPriority }) => {
  const [priorityItems, setPriorityItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Axios.get<{ result: Item[] }>(
          `/test/motivation/?vacancy_id=${vacancyId}`
        ).then((res) => setPriorityItems(res.data.result));
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handleSubmit = () => setIsPriority(false);

  return (
    <form id="priorityForm">
      <h2>Siz uchun ishda nima muhim</h2>
      <p className="instructions">
        Ishdagi faktorlarni muhimlik darajasida tartibga keltiring. Eng muhim
        narsani ustiga bosing. U tepaga ko'tariladi. Qolganlarini ham muhimlik
        darajasida shunday qiling.
      </p>
      <PrList
        handleSubmit={handleSubmit}
        priorityItems={priorityItems}
        setPriorityItems={setPriorityItems}
      />
    </form>
  );
};

export default PriorityForm;
