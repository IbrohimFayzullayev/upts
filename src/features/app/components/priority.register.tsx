import React, { useState } from "react";

const PriorityRegister: React.FC = () => {
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

  const startAssessment = () => {
    if (validateForm()) {
      console.log("Starting assessment with:", { fullName, phone });
      // Further logic here
    }
  };

  return (
    <div id="registrationForm" className="form-section">
      <div className="form-header">
        <h2>Информация о вас</h2>
        <div className="form-group">
          <label htmlFor="fullName">ФИО</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
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
          <button
            type="button"
            className="submit-button"
            onClick={startAssessment}
          >
            <span>Начать</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriorityRegister;
