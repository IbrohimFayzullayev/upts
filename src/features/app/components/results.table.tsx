import React from "react";

const ResultsTable = () => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>To'liq Ism</th>
                <th>Telefon</th>
                <th>Yuborilgan Vaqt</th>
                <th>Top 3 Ustuvorliklar</th>
                <th>Natija</th>
                <th>Amallar</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>83</td>
                <td>Хусниддин Имамалиев Гафуржанович</td>
                <td>+998971310555</td>
                <td>2025-03-10 08:14</td>
                <td>
                  1. Katta barqaror kompaniyada ishlash
                  <br />
                  2. Ishni bajarishda va qaror qabul qilishda erkinlik
                  <br />
                  3. Kompaniya imidji
                </td>
                <td>
                  <span className="text-warning fw-bold">79%</span>
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm view-priorities"
                    data-user-id="83"
                  >
                    Batafsil
                  </button>
                  <button
                    className="btn btn-danger btn-sm delete-entry"
                    data-user-id="83"
                  >
                    O'chirish
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultsTable;
