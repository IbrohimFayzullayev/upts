import { useEffect, useState } from "react";
import PriorityForm from "../components/priority.form";
import PriorityRegister from "../components/priority.register";
import { useParams } from "react-router-dom";
import { Axios } from "../../../utils/axios";
import QuestionForm from "../components/question.form";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

const PriorityScreen = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [isRegistered, setIsRegistered] = useState(false);
  const [vacancy, setVacancy] = useState<VacancyProps | null>(null);
  const [priorityAnswer, setPriorityAnswer] = useState<PriorityAnswer[]>([]);
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

  const handleComplete = async ({
    questionAnswers,
  }: {
    questionAnswers: QuestionAnswer[];
  }) => {
    try {
      await Axios.post(`/test/result/`, {
        full_name: fullName,
        phone: phone,
        vacancy_id: id,
        motivated_orders: priorityAnswer,
        question_orders: questionAnswers,
      }).then(() => {
        setIsCompleted(true);
        toast.success(t("test_completed_successfully"));
      });
    } catch (error) {
      toast.error(t("test_completed_error"));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin border-4 border-t-transparent border-blue-500 rounded-full w-16 h-16"></div>
        <p className="ml-4 text-lg">{t("loading")}</p>
      </div>
    );
  }

  if (!vacancy) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg">{t("vacancy_not_found")}</p>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="flex justify-center items-center h-screen bg-green-50">
        <div className="text-center p-6 bg-white shadow-md rounded-md">
          <div className="text-4xl text-green-500">✔</div>
          <h1 className="text-2xl font-semibold text-green-700 mt-4">
            {t("test_completed")}!
          </h1>
          <p className="mt-2 text-lg text-green-600">
            {t("thanks_for_participation")}. {t("we_will_contact_you")}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        {isRegistered ? (
          isPriority ? (
            <PriorityForm
              vacancyId={id}
              setIsPriority={setIsPriority}
              setPriorityAnswer={setPriorityAnswer}
            />
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
