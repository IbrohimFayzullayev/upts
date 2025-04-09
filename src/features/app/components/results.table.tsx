import React from "react";
import { formattedTime } from "../../../utils/funcs";
import { Link } from "react-router-dom";

type Props = {
  results: TestAnswerProps[];
};

const ResultsTable: React.FC<Props> = ({ results }) => {
  return (
    <div className="w-full mt-4 mb-4 rounded-lg shadow-md">
      <div className="overflow-x-auto rounded-md shadow">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-800 text-white text-left text-sm">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">To'liq Ism</th>
              <th className="px-4 py-2">Telefon</th>
              <th className="px-4 py-2">Yuborilgan Vaqt</th>
              <th className="px-4 py-2">Top 3 Ustuvorliklar</th>
              <th className="px-4 py-2">Natija</th>
              <th className="px-4 py-2">Amallar</th>
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
                    Batafsil
                  </Link>
                  <button
                    className="bg-red-600 cursor-pointer text-white text-xs px-3 py-1 rounded hover:bg-red-700 transition"
                    data-user-id="83"
                  >
                    O'chirish
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
