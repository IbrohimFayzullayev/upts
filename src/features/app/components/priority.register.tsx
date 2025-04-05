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
    <div
      id="registrationForm"
      className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg"
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <h3 className="text-xl font-semibold">
          {t("company")}: {vacancy?.company}
        </h3>
        <h3 className="text-gray-800 mb-1">
          {t("vacancy")}: {vacancy?.name}
        </h3>
        <p className="text-sm text-gray-700">
          {t("fill_form_for_register_to_test")}
        </p>

        <div className="flex flex-col space-y-2">
          <label htmlFor="language" className="font-medium">
            {t("select_language_for_test")}:{" "}
            {lang === "ru" ? "Русский" : "O'zbekcha"}
          </label>
          <div className="btn-group flex w-full space-x-2">
            <button
              type="button"
              className={`px-4 cursor-pointer py-2 rounded-lg ${
                lang === "ru" ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => changeLanguage("ru")}
            >
              Русский
            </button>
            <button
              type="button"
              className={`px-4 cursor-pointer py-2 rounded-lg ${
                lang === "uz" ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => changeLanguage("uz")}
            >
              O'zbekcha
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="fullName" className="font-medium">
            {t("fio")}
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            placeholder={t("fio_placeholder")}
            autoComplete="name"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
               ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          {errors.fullName && (
            <div className="text-red-500 text-sm">{errors.fullName}</div>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="font-medium">
            {t("phone")}
          </label>
          <input
            type="tel"
            id="phone"
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               ${errors.phone ? "border-red-500" : "border-gray-300"}`}
            name="phone"
            placeholder={t("phone_placeholder")}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          {errors.phone && (
            <div className="text-red-500 text-sm">{errors.phone}</div>
          )}
        </div>

        <button
          type="submit"
          className="cursor-pointer w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          <span>{t("start")}</span>
        </button>
      </form>
    </div>
  );
};

export default PriorityRegister;
