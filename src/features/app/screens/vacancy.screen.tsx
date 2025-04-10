import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { authAxios } from "../../../utils/axios";
import { useTranslation } from "react-i18next";
import CopyUrlButton from "../components/atoms/copy.url.button";
import ResultsTable from "../components/results.table";

type DataProps = {
  count: number;
  total_pages: number;
  current: number;
  results: TestAnswerProps[];
};

const VacancyScreen = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const [vacancy, setVacancy] = useState<VacancyProps | null>(null);
  const [data, setData] = useState<DataProps | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [lang, setLang] = useState<string>(
    localStorage.getItem("language") || "uz"
  );

  const changeLanguage = (lang: string) => {
    setLang(lang);
    i18n.changeLanguage(lang);
    authAxios.defaults.headers.common["Accept-Language"] = lang;
    localStorage.setItem("language", lang);
  };

  useEffect(() => {
    authAxios.defaults.headers.common["Accept-Language"] = lang;
    const fetchVacancy = async () => {
      try {
        await authAxios
          .get<{ result: VacancyProps }>(`/test/vacancy/${id}/get`)
          .then((res) => setVacancy(res.data.result));
      } catch (error) {}
      try {
        await authAxios
          .get<DataProps>(`/test/result/?vacancy_id=${id}`)
          .then((res) => setData(res.data));
      } catch (error) {}
      setLoading(false);
    };
    fetchVacancy();
  }, [id, lang]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto p-6">
        <div className="flex items-center justify-between mb-3">
          {/* <div></div> */}
          <h1 className="text-3xl font-bold mb-4">{t("vacancy_details")}</h1>
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
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl text-gray-800 mb-2">
            <b>{t("vacancy_name")}</b>: {vacancy.name}
          </h2>
          <p className="text-gray-800 mb-2">
            <b>{t("company")}</b>: {vacancy?.company}
          </p>
          <p className="text-gray-800 mb-2">
            <b>{t("position")}</b>: {vacancy?.position.name}
          </p>
          <p className="text-gray-800 mb-2 flex gap-3 align-center">
            <Link
              to={`/priority/${vacancy.vacancy_id}`}
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              {t("vacancy_test_link")}:
            </Link>
            <CopyUrlButton
              url={`${window.location.origin}/priority/${vacancy?.vacancy_id}`}
            />
          </p>
        </div>

        <ResultsTable results={data?.results || []} />
      </div>
    </div>
  );
};

export default VacancyScreen;
