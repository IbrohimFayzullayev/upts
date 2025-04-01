import React, { useState } from "react";

type Item = {
  id: number;
  text: string;
};

const PriorityList: React.FC = () => {
  const [items, setItems] = useState<Item[]>(defaultStatements);

  return (
    <div className="priority-list" id="priorityList">
      {items.map((item) => (
        <div className="priority-item-container">
          <div className="priority-item" draggable="true" data-index="4">
            <span className="statement-text">{item.text}</span>
          </div>
          <div className="arrow-buttons" style={{ display: "flex" }}>
            <button className="arrow-button arrow-up" type="button">
              ↑
            </button>
            <button className="arrow-button arrow-down" type="button">
              ↓
            </button>
          </div>
        </div>
      ))}
      <div className="submit-container">
        <button type="submit" id="submitButton" className="submit-button">
          <span>Отправить</span>
          <div id="loadingSpinner" className="loading-spinner"></div>
        </button>
      </div>
    </div>
  );
};

const defaultStatements = [
  { id: 1, text: "Rasmiy ishga olish" },
  { id: 2, text: "Yaxshi oylik" },
  { id: 3, text: "Rasmiy otpusk" },
  { id: 4, text: "Bepul obed" },
  { id: 5, text: "Qulay ish joyi va kompyuter" },
  { id: 6, text: "Dushanbadan Jumagacha 9.00-18.00 ish vaqti" },
  { id: 7, text: "Ish vaqtidan tashqari ish qilmaslik" },
  { id: 8, text: "Bayramlarga sovg'a" },
  { id: 9, text: "Korporativlar va bayram tashkillashtirilishi" },
  { id: 10, text: "Ofisning qulay joylashishi" },
  { id: 11, text: "Ishda mentor bolishi (tajribali ishchi)" },
  { id: 12, text: "Yaxshi rahbar" },
  { id: 13, text: "Lavozim oshish imkoni" },
  { id: 14, text: "Yaxshi jamoa" },
  { id: 15, text: "KPI ga biriktirilgan bonus" },
  { id: 16, text: "Uzoq muddat davomida ishlash uchun garantiya" },
  { id: 17, text: "Ishda qiziq topshiriqlar bajarish imkoni" },
  { id: 18, text: "Kompaniya imidji" },
  { id: 19, text: "Kompaniya hisobidan o'qish va o'rganish" },
  { id: 20, text: "Belgilanmagan ish vaqti(свободный график)" },
  { id: 21, text: "Ishni bajarishda va qaror qabul qilishda erkinlik" },
  { id: 22, text: "Katta barqaror kompaniyada ishlash" },
  { id: 23, text: "Ish haqini o'z vaqtida to'lanishi" },
];

export default PriorityList;
