import { useContext, useEffect, useState } from "react";
import { authAxios } from "../../../utils/axios";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  const { user } = useContext(AuthenticationContext);
  const [vacancies, setVacancies] = useState<VacancyProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await authAxios
          .get<{ result: VacancyProps[] }>(`/test/vacancy/`)
          .then((res) => setVacancies(res.data.result));
      } catch (error) {}
    };
    fetchData();
  }, []);

  return (
    <div className="home-screen">
      <div className="container">
        <h2 className="pt-3 text-center">Компания: {user?.company_name}</h2>
        <h4 className="text-center mb-3">Вакансии</h4>
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <div></div>
          <button className="btn btn-success">Добавить вакансию</button>
        </div>
        <div className="vacancy-list">
          {vacancies.map((vacancy) => (
            <div className="mb-3 w-full" key={vacancy.id}>
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h5 className="card-title">Вакансия: {vacancy.name}</h5>
                      <p className="card-text">
                        Позиция: {vacancy.position.name}
                      </p>
                    </div>
                    <div className="ms-auto">
                      <Link
                        to={`/vacancy/${vacancy.vacancy_id}`}
                        className="btn btn-primary d-flex align-items-center gap-2"
                      >
                        <FaEye /> Просмотреть
                      </Link>
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
