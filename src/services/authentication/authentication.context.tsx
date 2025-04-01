import Cookies from "js-cookie";
import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";
import { authAxios, Axios } from "../../utils/axios";
import toast from "react-hot-toast";

type AuthenticationContextType = {
  login: (username: string, password: string) => Promise<void>;
};

export const AuthenticationContext = createContext(
  {} as AuthenticationContextType
);

export const AuthenticationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = Cookies.get("UptsToken");
    if (token) {
      try {
        authAxios.defaults.headers.Authorization = `${token}`;
        authAxios.get("/profile/me").then((res) => {
          setUser(res.data);
          setIsAuthenticated(true);
        });
      } catch (error: any) {
        console.error(error);
        toast.error(`Failed to fetch user data: ${error.res.data.error}`);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      await Axios.post("/token/", {
        username,
        password,
      }).then((res) => {
        Cookies.set("UptsToken", res.data.token, { expires: 365 });
        authAxios.defaults.headers.Authorization = `${res.data.token}`;
        // authAxios.get("/profile/me").then((res) => {
        //   setUser(res.data);
        //   setIsAuthenticated(true);
        // });
      });
      toast.success("Login successful!");
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const onLogout = async () => {};

  return (
    <AuthenticationContext.Provider value={{ login }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
