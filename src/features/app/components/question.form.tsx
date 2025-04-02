import { FC, useEffect, useState } from "react";
import { Axios } from "../../../utils/axios";
import Swal from "sweetalert2";

type Props = {
  vacancyId: string | undefined;
  handleComplete: () => void;
};
const QuestionForm: FC<Props> = ({ vacancyId, handleComplete }) => {
  const [selectedOption, setSelectedOption] =
    useState<QuestionChoiceProps | null>(null);
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
        text: "Iltimos, javobni tanlang!",
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
    ).then((res) => {
      console.log(res.data);
      setQuestion(res.data.result);
    });

    // if (selectedOption !== null) {
    //   if (currentQuestion < questions.length - 1) {
    //     setCurrentQuestion(currentQuestion + 1);
    //     setSelectedOption(null); // Reset selection for next question
    //   } else {
    //     alert("Test completed!");
    //   }
    // }
  };
  return (
    <div className="task-container">
      <h2 className="mb-4">Ситуационный тест</h2>
      <div className="progress-indicator" id="progressIndicator">
        <div className="level-dot active"></div>
        <div className="level-dot "></div>
        <div className="level-dot "></div>
        <div className="level-dot "></div>
        <div className="level-dot "></div>
        <div className="level-dot "></div>
      </div>
      <div className="level-label" id="levelLabel">
        Boshlang'ich vaziyat (Уровень 1 из 6)
      </div>
      <div className="situation-title h4 mb-3" id="situationTitle">
        Vaziyat: {question?.text}
      </div>
      <div className="situation-text mb-4" id="situationText">
        {question?.text}
      </div>
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
          Продолжить
        </button>
      </div>
    </div>
  );
};

export default QuestionForm;
