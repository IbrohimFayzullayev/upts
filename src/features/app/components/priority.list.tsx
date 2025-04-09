import { useState } from "react";
import { useTranslation } from "react-i18next";

type Item = {
  id: number;
  name: string;
};

type Props = {
  priorityItems: Item[];
  setPriorityItems: React.Dispatch<React.SetStateAction<Item[]>>;
  handleSubmit: () => void;
};

const PriorityList: React.FC<Props> = ({
  priorityItems,
  setPriorityItems,
  handleSubmit,
}) => {
  const { t } = useTranslation();
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

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

  const SelectItem = (id: number) => {
    // Agar allaqachon tanlangan bo‘lsa, hech narsa qilmaymiz
    if (selectedIds.includes(id)) return;

    const updatedItems = [...priorityItems];
    const itemIndex = updatedItems.findIndex((item) => item.id === id);
    if (itemIndex === -1) return;

    const [selectedItem] = updatedItems.splice(itemIndex, 1);

    // Tanlanganlar ro'yxatiga yangi ID qo‘shamiz
    const updatedSelectedIds = [...selectedIds, id];

    // Tanlanganlar ID'lari asosida qaysi indeksga joylashtirishni bilamiz:
    const insertIndex = updatedSelectedIds.length - 1;

    // Tanlanganlar soni yetarli bo‘lsa, oxirgi tanlanganning pastiga qo‘yamiz
    if (insertIndex >= updatedItems.length) {
      updatedItems.push(selectedItem);
    } else {
      updatedItems.splice(insertIndex, 0, selectedItem);
    }

    setSelectedIds(updatedSelectedIds);
    setPriorityItems(updatedItems);
  };

  return (
    <div className="space-y-4">
      {priorityItems.map((item, index) => (
        <div
          className="p-2 border bg-white border-gray-300 rounded-sm cursor-grab"
          key={item.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={() => handleDragOver(index)}
          onDragEnd={handleDragEnd}
        >
          <div
            onClick={() => SelectItem(item.id)}
            className="cursor-move flex bg-[#f8f9fa] border border-[#dee2e6] rounded-sm px-2 py-3.5 justify-between items-center hover:bg-[#e9ecef]"
          >
            <div className="text-gray-800">{item.name}</div>
            {selectedIds.includes(item.id) && (
              <div className="flex space-x-2">
                <button
                  className="cursor-pointer w-8 h-8 text-lg text-black bg-white border border-gray-300 rounded hover:border-blue-500 shadow-sm"
                  type="button"
                  onClick={() => moveItem(index, -1)}
                >
                  ↑
                </button>
                <button
                  className="cursor-pointer w-8 h-8 text-lg text-black bg-white border border-gray-300 rounded hover:border-blue-500 shadow-sm"
                  type="button"
                  onClick={() => moveItem(index, 1)}
                >
                  ↓
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        type="button"
        className="w-full cursor-pointer px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        <span>{t("send")}</span>
      </button>
    </div>
  );
};

export default PriorityList;
