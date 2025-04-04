import React, { useState } from "react";
import { Axios } from "../../../utils/axios";
import { useTranslation } from "react-i18next";

type Props = {
  handleRegister: (fullName: string, phone: string) => void;
  vacancy: VacancyProps | null;
};
const PriorityRegister: React.FC<Props> = ({ handleRegister, vacancy }) => {
  const { t, i18n } = useTranslation();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [lang, setLang] = useState(localStorage.getItem("language") || "uz");
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string }>(
    {}
  );

  const validateForm = () => {
    const newErrors: { fullName?: string; phone?: string } = {};
    if (!fullName.trim()) newErrors.fullName = t("please_enter_your_fullname");
    if (!phone.trim()) newErrors.phone = t("please_enter_your_phone");
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      Axios.defaults.headers.common["Accept-Language"] = lang;
      handleRegister(fullName, phone);
    }
  };

  const changeLanguage = (lang: string) => {
    setLang(lang);
    i18n.changeLanguage(lang);
    Axios.defaults.headers.common["Accept-Language"] = lang;
    localStorage.setItem("language", lang);
  };

  return (
    <div id="registrationForm" className="form-section">
      <form className="form-header" onSubmit={handleSubmit}>
        {/* <h2>Информация о вас</h2> */}
        <h3>
          {t("company")}: {vacancy?.company}
        </h3>
        <h3>
          {t("vacancy")}: {vacancy?.name}
        </h3>
        <p>{t("fill_form_for_register_to_test")}</p>
        <div className="form-group">
          <div className="form-group"></div>
          <label htmlFor="language">
            {t("select_language_for_test")}:{" "}
            {lang === "ru" ? "Русский" : "O'zbekcha"}
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
        <div className="form-group">
          <label htmlFor="fullName">{t("fio")}</label>
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
          <label htmlFor="phone">{t("phone")}</label>
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
            <span>{t("start")}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PriorityRegister;
