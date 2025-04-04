import { FC, useEffect, useState } from "react";
import { Axios } from "../../../utils/axios";
import Swal from "sweetalert2";
import "../styles/situation.styles.css";
import { useTranslation } from "react-i18next";

type Props = {
  vacancyId: string | undefined;
  handleComplete: () => void;
};
const QuestionForm: FC<Props> = ({ vacancyId, handleComplete }) => {
  const [selectedOption, setSelectedOption] =
    useState<QuestionChoiceProps | null>(null);
  const { t } = useTranslation();
  const [question, setQuestion] = useState<QuestionProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Axios.get<{ result: QuestionProps }>(
          `/test/question/initial-question/?vacancy_id=${vacancyId}`
        ).then((res) => setQuestion(res.data.result));
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handleNext = async () => {
    if (selectedOption === null) {
      Swal.fire({
        icon: "error",
        title: "Xato",
        text: t("please_select_answer"),
      });
      return;
    }
    if (selectedOption.next_question === null) {
      // Swal.fire({
      //   icon: "success",
      //   title: "Muvaffaqiyatli",
      //   text: "Test tugadi!",
      // });
      handleComplete();
      return;
    }

    await Axios.get<{ result: QuestionProps }>(
      `/test/question/${selectedOption.next_question}/?vacancy_id=${vacancyId}`
    ).then((res) => setQuestion(res.data.result));
  };
  return (
    <div className="task-container">
      <h2 className="mb-4">{t("situation_test")}</h2>
      {/* <div className="progress-indicator" id="progressIndicator">
        <div className="level-dot active"></div>
        <div className="level-dot "></div>
        <div className="level-dot "></div>
        <div className="level-dot "></div>
        <div className="level-dot "></div>
        <div className="level-dot "></div>
      </div> */}
      {/* <div className="level-label" id="levelLabel">
        Boshlang'ich vaziyat (Уровень 1 из 6)
      </div> */}
      <div className="situation-title h4 mb-3" id="situationTitle">
        {t("condition")}: {question?.text}
      </div>
      {/* <div className="situation-text mb-4" id="situationText">
        {question?.text}
      </div> */}
      <div className="options-container" id="optionsContainer">
        {question?.choices.map((option, index) => (
          <div
            key={index}
            className={`option ${
              selectedOption?.id === option.id ? "selected" : ""
            }`}
            onClick={() => setSelectedOption(option)}
          >
            <div className="option-title">{option.text}</div>
            {/* <div className="option-description">{option.description}</div> */}
          </div>
        ))}
      </div>
      <div className="submit-container">
        <button className="submit-btn" onClick={handleNext}>
          {t("continue")}
        </button>
      </div>
    </div>
  );
};

export default QuestionForm;
