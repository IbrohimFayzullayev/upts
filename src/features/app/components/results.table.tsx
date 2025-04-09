import React from "react";
import { formattedTime } from "../../../utils/funcs";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

type Props = {
  results: TestAnswerProps[];
};

const ResultsTable: React.FC<Props> = ({ results }) => {
  const { t } = useTranslation();
  return (
    <div className="w-full mt-4 mb-4 rounded-lg shadow-md">
      <div className="overflow-x-auto rounded-md shadow">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-800 text-white text-left text-sm">
            <tr>
              <th className="px-4 py-2">{t("id")}</th>
              <th className="px-4 py-2">{t("full_name")}</th>
              <th className="px-4 py-2">{t("phone")}</th>
              <th className="px-4 py-2">{t("sended_time")}</th>
              <th className="px-4 py-2">{t("top_3_priorities")}</th>
              <th className="px-4 py-2">{t("result")}</th>
              <th className="px-4 py-2">{t("actions")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {results.map((result) => (
              <tr>
                <td className="px-4 py-2">{result.id}</td>
                <td className="px-4 py-2">{result.full_name}</td>
                <td className="px-4 py-2">{result.phone}</td>
                <td className="px-4 py-2">
                  {formattedTime(result.created_at)}
                </td>
                <td className="px-4 py-2">
                  {result.motivated_orders.slice(0, 3).map((item, index) => (
                    <div key={index}>
                      {index + 1}. {item.motivation.name}
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2">
                  <span className="text-yellow-500 font-semibold">
                    {Math.round(Math.random() * 100)}%
                  </span>
                </td>
                <td className="px-4 py-2 space-x-2 space-y-2">
                  <Link
                    to={`/result/${result.id}`}
                    className="bg-blue-600 cursor-pointer text-white text-xs px-3 py-1 rounded hover:bg-blue-700 transition"
                    data-user-id="83"
                  >
                    {t("detail")}
                  </Link>
                  <button
                    className="bg-red-600 cursor-pointer text-white mt-2 text-xs px-3 py-1 rounded hover:bg-red-700 transition"
                    data-user-id="83"
                  >
                    {t("delete")}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResultsTable;
