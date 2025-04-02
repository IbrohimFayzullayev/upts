import React, { useState } from "react";
import { Axios } from "../../../utils/axios";

type Props = {
  handleRegister: (fullName: string, phone: string) => void;
  vacancy: VacancyProps | null;
};
const PriorityRegister: React.FC<Props> = ({ handleRegister, vacancy }) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [lang, setLang] = useState("ru");
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string }>(
    {}
  );

  const validateForm = () => {
    const newErrors: { fullName?: string; phone?: string } = {};
    if (!fullName.trim()) newErrors.fullName = "Пожалуйста, введите ваше ФИО";
    if (!phone.trim()) newErrors.phone = "Пожалуйста, введите номер телефона";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { fullName, phone });
    if (validateForm()) {
      Axios.defaults.headers.common["Accept-Language"] = lang;
      console.log("Form is valid. Proceeding with registration...");
      handleRegister(fullName, phone);
    }
  };

  return (
    <div id="registrationForm" className="form-section">
      <form className="form-header" onSubmit={handleSubmit}>
        {/* <h2>Информация о вас</h2> */}
        <h3>Компания: {vacancy?.company}</h3>
        <h3>Вакансия: {vacancy?.name}</h3>
        <p>Заполните форму, чтобы зарегистрироваться на тестовое задание</p>
        <div className="form-group">
          <div className="form-group"></div>
          <label htmlFor="language">
            Выберите язык для теста: {lang === "ru" ? "Русский" : "O'zbekcha"}
          </label>
          <div
            className="btn-group"
            role="group"
            id="language"
            style={{ width: "100%" }}
          >
            <button
              type="button"
              className={`btn btn-${lang === "ru" ? "primary" : "secondary"}`}
              onClick={() => setLang("ru")}
            >
              Русский
            </button>
            <button
              onClick={() => setLang("uz")}
              type="button"
              className={`btn btn-${lang === "uz" ? "primary" : "secondary"}`}
            >
              O'zbekcha
            </button>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="fullName">ФИО</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="form-control"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          {errors.fullName && (
            <div className="invalid-feedback">{errors.fullName}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Телефон</label>
          <input
            type="tel"
            id="phone"
            className="form-control"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {errors.phone && (
            <div className="invalid-feedback">{errors.phone}</div>
          )}
        </div>
        <div className="submit-container">
          <button type="submit" className="submit-button">
            <span>Начать</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PriorityRegister;
