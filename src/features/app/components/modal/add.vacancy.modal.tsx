import React, { FormEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { authAxios } from "../../../../utils/axios";
import { useTranslation } from "react-i18next";
// import toast from "react-hot-toast";

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
    // Handle form submission logic here
    console.log("Form submitted");
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
    <Modal
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={show}
      onHide={onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t("add_vacancy")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="form-group">
            <label htmlFor="name_ru">{t("name_ru")}</label>
            <input
              type="text"
              className="form-control"
              id="name_ru"
              name="name_ru"
              value={nameRu}
              onChange={(e) => setNameRu(e.target.value)}
              placeholder={t("enter_name_ru")}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name_uz">{t("name_uz")}</label>
            <input
              type="text"
              className="form-control"
              id="name_uz"
              value={nameUz}
              onChange={(e) => setNameUz(e.target.value)}
              name="name_uz"
              placeholder={t("enter_name_uz")}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="position">{t("position")}</label>
            <select
              className="form-control"
              id="position"
              name="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            >
              <option value="">{t("select_position")}</option>
              {positions.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.name}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <Button
              variant="secondary"
              type="button"
              className="mt-3"
              onClick={onHide}
            >
              {t("cancel")}
            </Button>
            <Button type="submit" className="mt-3" disabled={loading}>
              {loading ? (
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
              ) : (
                t("add_vacancy")
              )}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default AddVacancyModal;
