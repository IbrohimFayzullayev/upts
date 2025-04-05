import { useContext, useEffect, useState } from "react";
import { authAxios } from "../../../utils/axios";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import AddVacancyModal from "../components/modal/add.vacancy.modal";
import { useTranslation } from "react-i18next";
import CopyUrlButton from "../components/atoms/copy.url.button";

const HomeScreen = () => {
  const { user } = useContext(AuthenticationContext);
  const { t, i18n } = useTranslation();
  const [modalShow, setModalShow] = useState(false);
  const [vacancies, setVacancies] = useState<VacancyProps[]>([]);
  const [attributes, setAttributes] = useState<PositionProps[]>([]);
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
    const fetchData = async () => {
      try {
        const vacancyRes = await authAxios.get<{ result: VacancyProps[] }>(
          `/test/vacancy/`
        );
        setVacancies(vacancyRes.data.result);
      } catch (error) {}
      try {
        const attrRes = await authAxios.get<{ result: PositionProps[] }>(
          `/test/vacancy/attributes/`
        );
        setAttributes(attrRes.data.result);
      } catch (error) {}
    };
    fetchData();
  }, [lang]);

  return (
    <div className="px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold text-center md:text-left">
            {t("company")}: {user?.company_name}
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => changeLanguage("ru")}
              className={`px-4 py-2 rounded cursor-pointer ${
                lang === "ru"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              Русский
            </button>
            <button
              onClick={() => changeLanguage("uz")}
              className={`px-4 py-2 rounded cursor-pointer ${
                lang === "uz"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              O'zbekcha
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h4 className="text-xl font-medium">{t("vacancies")}</h4>
          <button
            onClick={() => setModalShow(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded cursor-pointer"
          >
            {t("add_vacancy")}
          </button>
        </div>

        <AddVacancyModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          positions={attributes}
          setVacancies={setVacancies}
        />

        <div className="space-y-4">
          {vacancies.map((vacancy) => (
            <div key={vacancy.id} className="bg-white shadow rounded p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="text-lg font-semibold">
                    {t("vacancy")}: {vacancy.name}
                  </h5>
                  <p className="text-gray-600">
                    {t("position")}: {vacancy.position.name}
                  </p>
                  <div className="flex gap-3 align-center mt-2">
                    <Link
                      to={`/priority/${vacancy.vacancy_id}`}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                    >
                      {t("test_link")}
                    </Link>
                    <CopyUrlButton
                      url={`${window.location.origin}/priority/${vacancy.vacancy_id}`}
                    />
                  </div>
                </div>
                <Link
                  to={`/vacancy/${vacancy.vacancy_id}`}
                  className="cursor-pointer flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  <FaEye />
                  {t("view")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
