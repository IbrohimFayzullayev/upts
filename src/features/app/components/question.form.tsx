import { FC, useEffect, useState } from "react";
import { Axios } from "../../../utils/axios";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

type Props = {
  vacancyId: string | undefined;
  handleComplete: ({
    questionAnswers,
  }: {
    questionAnswers: QuestionAnswer[];
  }) => void;
};

const QuestionForm: FC<Props> = ({ vacancyId, handleComplete }) => {
  const [selectedOption, setSelectedOption] =
    useState<QuestionChoiceProps | null>(null);
  const { t } = useTranslation();
  const [question, setQuestion] = useState<QuestionProps | null>(null);
  const [questionAnswer, setQuestionAnswer] = useState<QuestionAnswer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get<{ result: QuestionProps }>(
          `/test/question/initial-question/?vacancy_id=${vacancyId}`
        );
        setQuestion(res.data.result);
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
    if (!question) return;
    setQuestionAnswer((prev) => [
      ...prev,
      {
        question: question.id,
        answer: selectedOption.id,
        number: prev.length + 1,
      },
    ]);
    if (selectedOption.next_question === null) {
      handleComplete({
        questionAnswers: [
          ...questionAnswer,
          {
            question: question.id,
            answer: selectedOption.id,
            number: questionAnswer.length + 1,
          },
        ],
      });

      return;
    }

    const res = await Axios.get<{ result: QuestionProps }>(
      `/test/question/${selectedOption.next_question}/?vacancy_id=${vacancyId}`
    );
    setQuestion(res.data.result);
  };

  return (
    <div className="bg-white rounded-lg p-8 mt-8 shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{t("situation_test")}</h2>

      <div className="text-[1.2rem] mb-3 text-[#2c3e50] font-medium">
        {t("condition")}: {question?.text}
      </div>

      <div className="grid grid-cols-2 gap-5 mb-8">
        {question?.choices.map((option, index) => (
          <div
            key={index}
            className={`relative flex flex-col h-full p-5 rounded-lg border-2 transition-all duration-300 ease-in-out cursor-pointer ${
              selectedOption?.id === option.id
                ? "bg-cyan-100 border-cyan-300"
                : "bg-gray-100 border-gray-300 hover:bg-gray-200 hover:-translate-y-0.5"
            }`}
            onClick={() => setSelectedOption(option)}
          >
            {selectedOption?.id === option.id && (
              <span className="absolute top-2 right-3 text-blue-600 text-xl font-bold">
                ✓
              </span>
            )}
            <div className="text-[#2c3e50] font-bold text-[1.1rem] mb-2">
              {option.text}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={handleNext}
          className="cursor-pointer px-10 py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors duration-200"
        >
          {t("continue")}
        </button>
      </div>
    </div>
  );
};

export default QuestionForm;
