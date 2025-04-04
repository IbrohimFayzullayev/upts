import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { authAxios } from "../../../utils/axios";
import { useTranslation } from "react-i18next";
import CopyUrlButton from "../components/atoms/copy.url.button";

const VacancyScreen = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [data, setData] = useState<VacancyProps | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        await authAxios
          .get<{ result: VacancyProps }>(`/test/vacancy/${id}/get`)
          .then((res) => setData(res.data.result));
      } catch (error) {}
      setLoading(false);
    };
    fetchVacancy();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin border-4 border-t-transparent border-blue-500 rounded-full w-16 h-16"></div>
        <p className="ml-4 text-lg">{t("loading")}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg">{t("vacancy_not_found")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-3xl font-bold mb-4">{t("vacancy_details")}</h1>
          <button
            onClick={() => navigate(-1)}
            className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            title={t("to_back")}
          >
            {t("to_back")}
          </button>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">
            {t("vacancy_id")}: {id}
          </h2>
          <p className="text-gray-700 mb-2">
            {t("company")}: {data?.company}
          </p>
          <p className="text-gray-700 mb-2">
            {t("position")}: {data?.position.name}
          </p>
          <p className="text-gray-700 mb-2">
            {t("vacancy_name")}: {data.name}
          </p>
          <p className="text-gray-700 mb-2 flex gap-3 align-center">
            <Link
              to={`/priority/${data.vacancy_id}`}
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              {t("vacancy_test_link")}:
            </Link>
            <CopyUrlButton
              url={`${window.location.origin}/priority/${data?.vacancy_id}`}
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default VacancyScreen;
