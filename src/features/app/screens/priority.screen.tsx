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

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        await Axios.get<{ result: VacancyProps }>(
          `/test/vacancy/${id}/get`
        ).then((res) => setVacancy(res.data.result));
      } catch (error) {}
    };
    fetchVacancy();
  }, [id]);

  const handleRegister = (fullName: string, phone: string) => {
    setFullName(fullName);
    setPhone(phone);
    setIsRegistered(true);
  };

  return (
    <div className="priority-screen">
      <div className="pr-container">
        {isRegistered ? (
          isPriority ? (
            <PriorityForm vacancyId={id} setIsPriority={setIsPriority} />
          ) : (
            <QuestionForm vacancyId={id} />
          )
        ) : (
          <PriorityRegister handleRegister={handleRegister} />
        )}
      </div>
    </div>
  );
};

export default PriorityScreen;
