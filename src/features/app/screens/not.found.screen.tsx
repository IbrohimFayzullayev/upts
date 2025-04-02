// import { useNavigate } from "react-router-dom";

const NotFoundScreen: React.FC = () => {
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     document.title = "404 - Страница не найдена";
  //   }, []);

  //   const handleGoHome = () => {
  //     navigate("/");
  //   };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 - Страница не найдена</h1>
      <p style={styles.message}>
        Страница, которую вы ищете, не существует или была перемещена.
      </p>
      {/* <button style={styles.button} onClick={handleGoHome}>
        Перейти на главную
      </button> */}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center" as const,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1rem",
    color: "#343a40",
  },
  message: {
    fontSize: "1rem",
    marginBottom: "2rem",
    color: "#6c757d",
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "0.25rem",
    cursor: "pointer",
  },
};

export default NotFoundScreen;
