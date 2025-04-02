import React, { FC, useState } from "react";
type SituationRegisterProps = {
  handleRegister: (fullName: string, phone: string) => void;
};
const SituationRegister: FC<SituationRegisterProps> = ({ handleRegister }) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
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
      console.log("Form is valid. Proceeding with registration...");
      // Here you can handle the form submission, e.g., send data to an API
      handleRegister(fullName, phone);
    }
  };

  return (
    <div id="registrationForm" className="form-section situation-register">
      <form className="form-header" onSubmit={handleSubmit}>
        <h2>Регистрация</h2>
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
          <label htmlFor="phone">Номер телефона</label>
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
          <button type="submit" className="btn btn-primary submit-button">
            <span>Начать тест</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SituationRegister;
