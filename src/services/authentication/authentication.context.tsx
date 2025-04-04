import Cookies from "js-cookie";
import { createContext, useState, ReactNode, useEffect } from "react";
import { authAxios, Axios } from "../../utils/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

type AuthenticationContextType = {
  login: (username: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  user: IUser | null;
};

export const AuthenticationContext = createContext(
  {} as AuthenticationContextType
);

export const AuthenticationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);
  // const [error, setError] = useState(null);
  // const naviate = useNavigate();

  const fetchUser = async () => {
    try {
      await authAxios.get<{ result: IUser }>(`/profile/me`).then((res) => {
        setUser(res.data.result);
        setIsAuthenticated(true);
        setIsLoading(false);
      });
    } catch (error) {
      setUser(null);
      setIsLoading(false);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const token = Cookies.get("UptsToken");
    if (token) {
      authAxios.defaults.headers.Authorization = `token ${token}`;
      fetchUser();
    } else {
      setUser(null);
      setIsLoading(false);
      setIsAuthenticated(false);
      // toast.error("You are not logged in. Please log in to continue.");
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      await Axios.post("/token/", {
        username,
        password,
      }).then((res) => {
        Cookies.set("UptsToken", res.data.token, { expires: 365 });
        authAxios.defaults.headers.Authorization = `token ${res.data.token}`;
      });
      await fetchUser();
      navigate("/");
      // toast.success("Вы успешно вошли в систему!");
    } catch (error) {
      console.error(error);
      // toast.error("Неверный логин или пароль!");
    }
  };

  const onLogout = async () => {};

  return (
    <AuthenticationContext.Provider
      value={{ login, isAuthenticated, isLoading, user }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
