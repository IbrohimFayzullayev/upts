import { useState } from "react";

type Item = {
  id: number;
  name: string;
};

type Props = {
  priorityItems: Item[];
  setPriorityItems: React.Dispatch<React.SetStateAction<Item[]>>;
  setIsPriority: React.Dispatch<React.SetStateAction<boolean>>;
};
const PriorityList: React.FC<Props> = ({
  priorityItems,
  setPriorityItems,
  setIsPriority,
}) => {
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
    // alert("Submitting: " + JSON.stringify(priorityItems));
    setIsPriority(false);
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

export default PriorityList;
