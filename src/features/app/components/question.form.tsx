import React, { FC, useEffect, useState } from "react";
import { Axios } from "../../../utils/axios";

interface Question {
  id: number;
  text: string;
  situation: string;
  options: {
    title: string;
    description: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    situation: "Avtobusga kech qolish",
    text: "Siz uyda chiqib, ishga ulgurish uchun avtobus bekatiga yo'l oldingiz. Biroq, yetib kelganingizda, avtobus ketib qoldi. Siz ishga kech qolayapsiz. Bu vaziyatning sababi nima bo'lishi mumkin?",
    options: [
      {
        title: "Uydan kech chiqqanim sababli",
        description:
          "Tayyorgarlik uchun ko'proq vaqt ketgani yoki ijtimoiy tarmoqlarga chalg'iganingiz sababli",
      },
      {
        title: "Uxlab qolganim sababli",
        description:
          "Uxlashga kech yotganligingiz yoki budilnik ishlamay qolgani uchun",
      },
      {
        title: "Uyga qaytishga to'g'ri kelgani sababli",
        description: "Kerakli narsa uyda qolib ketganligi uchun",
      },
      {
        title: "Vaqtni xato rejalashtirganim sababli",
        description: "Uydan bekatgacha vaqtni xato hisoblaganim uchun",
      },
      {
        title: "Yo'lda to'xtab qolganim sababli",
        description:
          "Do'konga yoki kofe olish uchun to'xtab, o'ylaganimdan ko'p vaqt ketgani uchun",
      },
      {
        title: "Avtobus odatdagi vaqtdan oldin kelgani sababli",
        description: "Avtobus grafigi bo'yicha yurmagani uchun",
      },
      {
        title: "Avtobus bekatda to'xtamagani sababli",
        description: "Qandaydir xato yoki noaniqlik tufayli",
      },
      {
        title: "Soatdagi xatolik sababli",
        description: "Soat yoki telefondagi vaqt xato ko'rsatilganligi uchun",
      },
    ],
  },
];

type Props = {
  vacancyId: string | undefined;
};
const QuestionForm: FC<Props> = ({ vacancyId }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [initialQuestion, setInitialQuestion] = useState<QuestionProps | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Axios.get<{ result: QuestionProps }>(
          `/test/question/initial-question/?vacancy_id=${vacancyId}`
        ).then((res) => {
          setInitialQuestion(res.data.result);
          console.log(res.data.result);
        });
      } catch (error) {}
    };
    fetchData();
  }, []);

  const handleNext = () => {
    if (selectedOption !== null) {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null); // Reset selection for next question
      } else {
        alert("Test completed!");
      }
    }
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
        Vaziyat: {initialQuestion?.text}
      </div>
      <div className="situation-text mb-4" id="situationText">
        {initialQuestion?.text}
      </div>
      <div className="options-container" id="optionsContainer">
        {initialQuestion?.choices.map((option, index) => (
          <div
            key={index}
            className={`option ${
              selectedOption === option.id ? "selected" : ""
            }`}
            onClick={() => setSelectedOption(option.id)}
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
