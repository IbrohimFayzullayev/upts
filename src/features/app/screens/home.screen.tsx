import { useContext, useEffect, useState } from "react";
import { authAxios } from "../../../utils/axios";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import AddVacancyModal from "../components/modal/add.vacancy.modal";
import { useTranslation } from "react-i18next";

const HomeScreen = () => {
  const { user } = useContext(AuthenticationContext);
  const { t, i18n } = useTranslation();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [vacancies, setVacancies] = useState<VacancyProps[]>([]);
  const [attributes, setAttributes] = useState<PositionProps[]>([]);
  const [lang, setLang] = useState<string>(
    localStorage.getItem("language") || "uz"
  );

  const changeLanguage = (lang: string) => {
    setLang(lang); // Update state with selected language
    i18n.changeLanguage(lang);
    authAxios.defaults.headers.common["Accept-Language"] = lang;
    localStorage.setItem("language", lang); // Save language preference
  };

  useEffect(() => {
    authAxios.defaults.headers.common["Accept-Language"] = lang;
    const fetchData = async () => {
      try {
        await authAxios
          .get<{ result: VacancyProps[] }>(`/test/vacancy/`)
          .then((res) => setVacancies(res.data.result));
      } catch (error) {}
      try {
        await authAxios
          .get<{ result: PositionProps[] }>(`/test/vacancy/attributes/`)
          .then((res) => setAttributes(res.data.result));
      } catch (error) {}
    };
    fetchData();
  }, [lang]);

  return (
    <div className="home-screen">
      <div className="container">
        <div className="d-flex mb-5 justify-content-between align-items-center">
          <h2 className="pt-3 text-center">
            {t("company")}: {user?.company_name}
          </h2>
          <div className="btn-group" role="group" id="language">
            <button
              type="button"
              className={`btn btn-${lang === "ru" ? "primary" : "secondary"}`}
              onClick={() => changeLanguage("ru")}
            >
              Русский
            </button>
            <button
              onClick={() => changeLanguage("uz")}
              type="button"
              className={`btn btn-${lang === "uz" ? "primary" : "secondary"}`}
            >
              O'zbekcha
            </button>
          </div>
        </div>
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <h4 className="mb-0">{t("vacancies")}</h4>
          <button
            onClick={() => setModalShow(true)}
            className="btn btn-success"
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
        <div className="vacancy-list">
          {vacancies.map((vacancy) => (
            <div className="mb-3 w-full" key={vacancy.id}>
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="card-title">
                        {t("vacancy")}: {vacancy.name}
                      </h5>
                      <p className="card-text">
                        {t("position")}: {vacancy.position.name}
                      </p>
                    </div>
                    <div className="ms-auto">
                      <button className="btn btn-primary d-flex align-items-center gap-2">
                        <FaEye /> {t("view")}
                      </button>
                      {/* <Link
                        to={`/vacancy/${vacancy.vacancy_id}`}
                        className="btn btn-primary d-flex align-items-center gap-2"
                      >
                        <FaEye /> {t("view")}
                      </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
