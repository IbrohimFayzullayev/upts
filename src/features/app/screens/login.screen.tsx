import React, { useContext, useState } from "react";
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
    <div className="flex justify-center items-center min-h-screen bg-light">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h3 className="text-center text-2xl font-semibold mb-4">
          {t("login")}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              {t("username")}
            </label>
            <input
              type="text"
              placeholder={t("username")}
              autoComplete="username"
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                error.username ? "border-red-500" : ""
              }`}
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError((prev) => ({ ...prev, username: undefined }));
              }}
            />
            {error.username && (
              <div className="text-sm text-red-500 mt-1">{error.username}</div>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              {t("password")}
            </label>
            <input
              type="password"
              placeholder={t("password")}
              autoComplete="current-password"
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                error.password ? "border-red-500" : ""
              }`}
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError((prev) => ({ ...prev, password: undefined }));
              }}
            />
            {error.password && (
              <div className="text-sm text-red-500 mt-1">{error.password}</div>
            )}
          </div>
          <button
            type="submit"
            className="cursor-pointer w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? (
              <span
                className="inline-block w-5 h-5 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"
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
