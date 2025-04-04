import React, { useEffect, useState } from "react";
import PrList from "./priority.list";
import { Axios } from "../../../utils/axios";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
      <h2>{t("what_important")}</h2>
      <p className="instructions">{t("priority_instructions")}</p>
      <PrList
        handleSubmit={handleSubmit}
        priorityItems={priorityItems}
        setPriorityItems={setPriorityItems}
      />
    </form>
  );
};

export default PriorityForm;
