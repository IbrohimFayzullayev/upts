import React, { useEffect, useState } from "react";
import PrList from "./priority.list";
import { Axios } from "../../../utils/axios";
import { useTranslation } from "react-i18next";

type Props = {
  vacancyId: string | undefined;
  setIsPriority: React.Dispatch<React.SetStateAction<boolean>>;
  setPriorityAnswer: React.Dispatch<React.SetStateAction<PriorityAnswer[]>>;
};

const PriorityForm: React.FC<Props> = ({
  vacancyId,
  setIsPriority,
  setPriorityAnswer,
}) => {
  const { t } = useTranslation();
  const [priorityItems, setPriorityItems] = useState<PriorityItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get<{ result: PriorityItem[] }>(
          `/test/motivation/?vacancy_id=${vacancyId}`
        );
        setPriorityItems(response.data.result);
      } catch (error) {
        // Handle error (optional)
      }
    };
    fetchData();
  }, [vacancyId]);

  const handleSubmit = () => {
    setPriorityAnswer(
      priorityItems.map((item, index) => ({
        motivation: item.id,
        priority: index + 1,
      }))
    );
    setIsPriority(false);
  };

  return (
    <form id="priorityForm" className="space-y-6">
      <h2 className="text-[24px] mb-2 font-semibold text-gray-800">
        {t("what_important")}
      </h2>
      <p className="text-[18px] text-gray-500">{t("priority_instructions")}</p>

      <PrList
        handleSubmit={handleSubmit}
        priorityItems={priorityItems}
        setPriorityItems={setPriorityItems}
      />
    </form>
  );
};

export default PriorityForm;
