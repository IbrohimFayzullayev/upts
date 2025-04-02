import { useEffect, useState } from "react";
import PriorityForm from "../components/priority.form";
import PriorityRegister from "../components/priority.register";
import "../styles/priority.styles.css";
import { useParams } from "react-router-dom";
import { Axios } from "../../../utils/axios";
import QuestionForm from "../components/question.form";

const PriorityScreen = () => {
  const { id } = useParams();
  const [isRegistered, setIsRegistered] = useState(false);
  const [vacancy, setVacancy] = useState<VacancyProps | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [isPriority, setIsPriority] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        await Axios.get<{ result: VacancyProps }>(
          `/test/vacancy/${id}/get`
        ).then((res) => setVacancy(res.data.result));
      } catch (error) {}
      setLoading(false);
    };
    fetchVacancy();
  }, [id]);

  const handleRegister = (fullName: string, phone: string) => {
    setFullName(fullName);
    setPhone(phone);
    setIsRegistered(true);
  };

  const handleComplete = () => {
    setIsCompleted(true);
  };

  if (loading) {
    return (
      <div className="isloading-screen">
        <div className="isloading-spinner"></div>
        <p>Загрузка...</p>
      </div>
    );
  }
  if (!vacancy) {
    return (
      <div className="error-screen">
        <p>Вакансия не найдена</p>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="success-screen">
        <div className="success-container">
          <div className="success-icon">✔</div>
          <h1 className="success-title">Тест завершен!</h1>
          <p className="success-message">
            Спасибо за участие. Мы свяжемся с вами в ближайшее время.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="priority-screen">
      <div className="pr-container">
        {isRegistered ? (
          isPriority ? (
            <PriorityForm vacancyId={id} setIsPriority={setIsPriority} />
          ) : (
            <QuestionForm vacancyId={id} handleComplete={handleComplete} />
          )
        ) : (
          <PriorityRegister handleRegister={handleRegister} vacancy={vacancy} />
        )}
      </div>
    </div>
  );
};

export default PriorityScreen;
