// import { useEffect } from "react";
// import PriorityStatistics from "../components/priority.statistics";
// import ResultsTable from "../components/results.table";
// import "../styles/dashboard.styles.css";
// import { authAxios } from "../../../utils/axios";

const DashboardScreen = () => {
  // useEffect(() => {
  //   const fetchAttributes = async () => {
  //     try {
  //       await authAxios.get(`/test/vacancy/attributes/`).then((res) => {
  //         // console.log(res.data);
  //       });
  //     } catch (error) {}
  //   };
  //   fetchAttributes();
  // }, []);

  return <div></div>;
  // return (
  //   <div className="container-fluid" style={{ minHeight: "100vh" }}>
  //     <div className="row">
  //       <div className="col-12">
  //         <h1 className="text-center my-4">Natijalar Dashboard</h1>
  //       </div>
  //     </div>
  //     <div className="row mb-3">
  //       <div className="col-md-6">
  //         <div className="input-group">
  //           <input
  //             type="text"
  //             id="searchInput"
  //             className="form-control"
  //             placeholder="Qidirish..."
  //           />
  //           <button
  //             className="btn btn-outline-secondary"
  //             type="button"
  //             id="searchButton"
  //           >
  //             <i className="bi bi-search"></i> Qidirish
  //           </button>
  //         </div>
  //       </div>
  //       <div className="col-md-3">
  //         <select id="sortSelect" className="form-select">
  //           <option value="score">Natija bo'yicha</option>
  //           <option value="newest">Eng yangi</option>
  //           <option value="oldest">Eng eski</option>
  //         </select>
  //       </div>
  //       <div className="col-md-3">
  //         <button id="exportExcel" className="btn btn-success w-100">
  //           <i className="bi bi-file-excel"></i> Excel ga export
  //         </button>
  //       </div>
  //     </div>
  //     <PriorityStatistics />
  //     <ResultsTable />
  //   </div>
  // );
};

export default DashboardScreen;
