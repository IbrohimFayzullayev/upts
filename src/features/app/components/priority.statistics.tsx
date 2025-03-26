const PriorityStatistics = () => {
  return (
    <div className="row mb-4">
      <div className="col-12">
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Ustuvorliklar statistikasi</h5>
          </div>
          <div className="card-body" id="priorityStats">
            <h6>Top 10 eng ko'p tanlangan ustuvorliklar:</h6>
            <div className="table-responsive">
              <table className="table table-sm">
                <thead>
                  <tr>
                    <th>Ustuvorlik</th>
                    <th>Jami</th>
                    <th>Top 3 da</th>
                    <th>Top 5 da</th>
                  </tr>
                </thead>
                <tbody>
                  {PriorityStats.map((item, index) => (
                    <tr key={index}>
                      <td>{item.title}</td>
                      <td>{item.all}</td>
                      <td>{item.top3}</td>
                      <td>{item.top5}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PriorityStats = [
  {
    all: 10,
    top3: 1,
    top5: 2,
    title: "Katta barqaror kompaniyada ishlash",
  },
  {
    all: 10,
    top3: 2,
    top5: 3,
    title: "Ishni bajarishda va qaror qabul qilishda erkinlik",
  },
  {
    all: 10,
    top3: 2,
    top5: 2,
    title: "Kompaniya imidji",
  },
  {
    all: 10,
    top3: 0,
    top5: 1,
    title: "Uzoq muddat davomida ishlash uchun garantiya",
  },
  {
    all: 10,
    top3: 2,
    top5: 5,
    title: "Ishda mentor bolishi (tajribali ishchi)",
  },
  {
    all: 10,
    top3: 1,
    top5: 2,
    title: "Lavozim oshish imkoni",
  },
  {
    all: 10,
    top3: 4,
    top5: 6,
    title: "Yaxshi oylik",
  },
  {
    all: 10,
    top3: 4,
    top5: 6,
    title: "Yaxshi rahbar",
  },
  {
    all: 10,
    top3: 3,
    top5: 3,
    title: "Yaxshi jamoa",
  },
  {
    all: 10,
    top3: 1,
    top5: 1,
    title: "Ishda qiziq topshiriqlar bajarish imkoni",
  },
];

export default PriorityStatistics;
