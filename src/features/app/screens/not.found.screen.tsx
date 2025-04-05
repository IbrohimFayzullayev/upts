import { useTranslation } from "react-i18next";

const NotFoundScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-4xl font-semibold text-gray-800 mb-4">
        404 - {t("page_not_found")}
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        {t("page_not_found_message")}
      </p>
      {/* <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
        Перейти на главную
      </button> */}
    </div>
  );
};

export default NotFoundScreen;
