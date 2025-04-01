import { useState } from "react";

type Item = {
  id: number;
  name: string;
};

const defaultStatements: Item[] = [
  { id: 1, name: "Rasmiy ishga olish" },
  { id: 2, name: "Yaxshi oylik" },
  { id: 3, name: "Rasmiy otpusk" },
  { id: 4, name: "Bepul obed" },
  { id: 5, name: "Qulay ish joyi va kompyuter" },
  { id: 6, name: "Dushanbadan Jumagacha 9.00-18.00 ish vaqti" },
  { id: 7, name: "Ish vaqtidan tashqari ish qilmaslik" },
  { id: 8, name: "Bayramlarga sovg'a" },
  { id: 9, name: "Korporativlar va bayram tashkillashtirilishi" },
  { id: 10, name: "Ofisning qulay joylashishi" },
  { id: 11, name: "Ishda mentor bolishi (tajribali ishchi)" },
  { id: 12, name: "Yaxshi rahbar" },
  { id: 13, name: "Lavozim oshish imkoni" },
  { id: 14, name: "Yaxshi jamoa" },
  { id: 15, name: "KPI ga biriktirilgan bonus" },
  { id: 16, name: "Uzoq muddat davomida ishlash uchun garantiya" },
  { id: 17, name: "Ishda qiziq topshiriqlar bajarish imkoni" },
  { id: 18, name: "Kompaniya imidji" },
  { id: 19, name: "Kompaniya hisobidan o'qish va o'rganish" },
  { id: 20, name: "Belgilanmagan ish vaqti(свободный график)" },
  { id: 21, name: "Ishni bajarishda va qaror qabul qilishda erkinlik" },
  { id: 22, name: "Katta barqaror kompaniyada ishlash" },
  { id: 23, name: "Ish haqini o'z vaqtida to'lanishi" },
];

const PrList: React.FC = () => {
  const [priorityItems, setPriorityItems] = useState<Item[]>(defaultStatements);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggingIndex(index);
  };

  const handleDragOver = (index: number) => {
    if (draggingIndex === null || draggingIndex === index) return;
    const updatedItems = [...priorityItems];
    const draggedItem = updatedItems.splice(draggingIndex, 1)[0];
    updatedItems.splice(index, 0, draggedItem);
    setDraggingIndex(index);
    setPriorityItems(updatedItems);
  };

  const handleDragEnd = () => {
    setDraggingIndex(null);
  };

  const moveItem = (index: number, direction: number) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= priorityItems.length) return;
    const updatedItems = [...priorityItems];
    [updatedItems[index], updatedItems[newIndex]] = [
      updatedItems[newIndex],
      updatedItems[index],
    ];
    setPriorityItems(updatedItems);
  };

  const handleSubmit = () => {
    alert("Submitting: " + JSON.stringify(priorityItems));
    // Ma'lumotlarni serverga jo'natish joyi
  };

  return (
    <div className="priority-list" id="priorityList">
      {priorityItems.map((item, index) => (
        <div
          className="priority-item-container"
          key={item.id} // `index` o'rniga `id` ishlatildi
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={() => handleDragOver(index)}
          onDragEnd={handleDragEnd}
          style={{
            cursor: "grab",
            padding: "10px",
            border: "1px solid #ccc",
            marginBottom: "5px",
          }}
        >
          <div className="priority-item">{item.name}</div>
          <div className="arrow-buttons" style={{ display: "flex" }}>
            <button
              className="arrow-button arrow-up"
              type="button"
              onClick={() => moveItem(index, -1)}
            >
              ↑
            </button>
            <button
              className="arrow-button arrow-down"
              type="button"
              onClick={() => moveItem(index, 1)}
            >
              ↓
            </button>
          </div>
        </div>
      ))}

      <div className="submit-container">
        <button
          onClick={handleSubmit}
          type="submit"
          id="submitButton"
          className="submit-button"
        >
          <span>Отправить</span>
          <div id="loadingSpinner" className="loading-spinner"></div>
        </button>
      </div>
    </div>
  );
};

export default PrList;
