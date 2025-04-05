import React, { FormEvent, useState } from "react";
import { authAxios } from "../../../../utils/axios";
import { useTranslation } from "react-i18next";
// import toast from "react-hot-toast";
import { IoClose } from "react-icons/io5";

type AddVacancyModalProps = {
  show: boolean;
  onHide: () => void;
  positions: PositionProps[];
  setVacancies: React.Dispatch<React.SetStateAction<VacancyProps[]>>;
};

const AddVacancyModal: React.FC<AddVacancyModalProps> = ({
  show,
  onHide,
  positions,
  setVacancies,
}) => {
  const { t } = useTranslation();
  const [nameRu, setNameRu] = useState<string>("");
  const [nameUz, setNameUz] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      await authAxios
        .post<{ result: VacancyProps[] }>("/test/vacancy/", {
          name_ru: nameRu,
          name_uz: nameUz,
          position: Number(position),
        })
        .then((res) => setVacancies(res.data.result));
      setNameRu("");
      setNameUz("");
      setPosition("");
      onHide();
      //   toast.success("Вакансия успешно добавлена");
    } catch (error) {
      //   toast.error("Ошибка при добавлении вакансии");
    }

    setLoading(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-center items-center bg-gray-700/50 ${
        show ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{t("add_vacancy")}</h3>
          <button className="text-gray-500" onClick={onHide} aria-label="Close">
            {/* &times; */}
            <IoClose className="w-6 h-6 cursor-pointer" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name_ru"
              className="block text-sm font-medium text-gray-700"
            >
              {t("name_ru")}
            </label>
            <input
              type="text"
              id="name_ru"
              name="name_ru"
              value={nameRu}
              onChange={(e) => setNameRu(e.target.value)}
              placeholder={t("enter_name_ru")}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="name_uz"
              className="block text-sm font-medium text-gray-700"
            >
              {t("name_uz")}
            </label>
            <input
              type="text"
              id="name_uz"
              name="name_uz"
              value={nameUz}
              onChange={(e) => setNameUz(e.target.value)}
              placeholder={t("enter_name_uz")}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="position"
              className="block text-sm font-medium text-gray-700"
            >
              {t("position")}
            </label>
            <select
              id="position"
              name="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">{t("select_position")}</option>
              {positions.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={onHide}
              className="mt-3 cursor-pointer px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "cursor-progress" : "cursor-pointer"
              } px-4 py-2 mt-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400`}
            >
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                t("add_vacancy")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVacancyModal;
