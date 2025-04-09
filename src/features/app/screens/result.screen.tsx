import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authAxios } from "../../../utils/axios";
import { useTranslation } from "react-i18next";

const ResultScreen = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<TestAnswerProps | null>(null);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [lang, setLang] = useState<string>(
    localStorage.getItem("language") || "uz"
  );

  useEffect(() => {
    authAxios.defaults.headers.common["Accept-Language"] = lang;
    const fetchData = async () => {
      try {
        await authAxios
          .get(`/test/result/${id}`)
          .then((res) => setResult(res.data.result));
      } catch (error) {}
      setLoading(false);
    };
    fetchData();
  }, [id, lang]);

  const changeLanguage = (lang: string) => {
    setLang(lang);
    i18n.changeLanguage(lang);
    authAxios.defaults.headers.common["Accept-Language"] = lang;
    localStorage.setItem("language", lang);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin border-4 border-t-transparent border-blue-500 rounded-full w-16 h-16"></div>
        <p className="ml-4 text-lg">{t("loading")}</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg">{t("result_not_found")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between mb-5">
          {/* <div></div> */}
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            {t("test_result")}
          </h1>
          <div className="flex gap-4 items-center">
            <div className="flex gap-1">
              <button
                onClick={() => changeLanguage("ru")}
                className={`px-4 py-2 rounded cursor-pointer ${
                  lang === "ru"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Ру
              </button>
              <button
                onClick={() => changeLanguage("uz")}
                className={`px-4 py-2 rounded cursor-pointer ${
                  lang === "uz"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Uz
              </button>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
              title={t("to_back")}
            >
              {t("to_back")}
            </button>
          </div>
        </div>

        {/* Applicant Info */}
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4 border-b pb-2">
            {t("applicant_info")}
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-medium text-gray-900">
                {t("full_name")}:
              </span>{" "}
              {result.full_name}
            </p>
            <p>
              <span className="font-medium text-gray-900">{t("phone")}:</span>{" "}
              {result.phone}
            </p>
            <p>
              <span className="font-medium text-gray-900">
                {t("created_at")}:
              </span>{" "}
              {new Date(result.created_at).toLocaleString()}
            </p>
          </div>
        </section>

        {/* Vacancy Info */}
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4 border-b pb-2">
            {t("vacancy_info")}
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-medium text-gray-900">{t("company")}:</span>{" "}
              {result.vacancy.company}
            </p>
            <p>
              <span className="font-medium text-gray-900">
                {t("position")}:
              </span>{" "}
              {result.vacancy.position.name}
            </p>
            <p>
              <span className="font-medium text-gray-900">
                {t("vacancy_name")}:
              </span>{" "}
              {result.vacancy.name}
            </p>
            <p>
              <span className="font-medium text-gray-900">
                {t("vacancy_id")}:
              </span>{" "}
              {result.vacancy.vacancy_id}
            </p>
            <p>
              <span className="font-medium text-gray-900">
                {t("is_active")}:
              </span>{" "}
              <span
                className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${
                  result.vacancy.is_active
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {result.vacancy.is_active ? t("yes") : t("no")}
              </span>
            </p>
          </div>
        </section>

        {/* Motivated Orders */}
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4 border-b pb-2">
            {t("motivated_orders")}
          </h2>
          <ul className="list-decimal pl-5 space-y-2 text-gray-700">
            {result.motivated_orders.map((order, index) => (
              <li key={index}>
                {/* <span className="font-medium text-gray-900">
                  {t("motivation")}:
                </span>{" "} */}
                {order.motivation.name}
              </li>
            ))}
          </ul>
        </section>

        {/* Question Orders */}
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
          <h2 className="text-2xl font-semibold text-indigo-600 mb-4 border-b pb-2">
            {t("question_orders")}
          </h2>
          <div className="space-y-6 text-gray-700">
            {result.question_orders.map((order, index) => (
              <div key={index} className="border-l-4 border-indigo-300 pl-4">
                <p>
                  <span className="font-medium text-gray-900">
                    {t("question_number")}:
                  </span>{" "}
                  {order.number}
                </p>
                <p>
                  <span className="font-medium text-gray-900">
                    {t("question_text")}:
                  </span>{" "}
                  {order.question.text}
                </p>
                <p>
                  <span className="font-medium text-gray-900">
                    {t("answer")}:
                  </span>{" "}
                  {order.answer.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResultScreen;
