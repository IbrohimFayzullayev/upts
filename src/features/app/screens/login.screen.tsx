import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthenticationContext } from "../../../services/authentication/authentication.context";
import { useTranslation } from "react-i18next";

const LoginScreen: React.FC = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthenticationContext);
  const [error, setError] = useState<{ username?: string; password?: string }>(
    {}
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    let errors: { username?: string; password?: string } = {};

    if (!username.trim()) {
      errors.username = t("error_username");
    }
    if (!password.trim()) {
      errors.password = t("error_password");
    }
    setError(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      await login(username, password);
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="login-container p-4 bg-white rounded shadow"
        style={{ width: "400px" }}
      >
        <h3 className="text-center">{t("login")}</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              {t("username")}
            </label>
            <input
              type="text"
              className={`form-control ${error.username ? "is-invalid" : ""}`}
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {error.username && (
              <div className="invalid-feedback">{error.username}</div>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              {t("password")}
            </label>
            <input
              type="password"
              className={`form-control ${error.password ? "is-invalid" : ""}`}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error.password && (
              <div className="invalid-feedback">{error.password}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              t("login")
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
