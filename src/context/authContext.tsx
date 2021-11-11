import axios from "axios";
import React from "react";
import { logoutStorage } from "../module/login/services/auth";

const AuthContextProv = React.createContext({
  token: "",
  user: { id: 0, name: "" },
  isAuthenticated: false,
  login: (login: string, password: string) => {},
  logout: () => {},
});

function AuthProvider(props: any) {
  const [token, setToken] = React.useState<any>("");
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState<any>();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      setToken(token);
      setUser(JSON.parse(localStorage.getItem("user") || ""));
    }
  }, []);

  React.useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
    }
  }, [token, user]);

  async function login(email: string, password: string) {
    await axios
      .post(`${process.env.REACT_APP_AUTH_API}auth/login`, {
        email,
        password,
      })
      .then((res: any) => {
        setToken(res.data.token);
        setUser({ email });
        return true;
      })
      .catch((err) => {
        throw Error(err);
      });
  }

  function logout() {
    setToken(null);
    setUser({ id: 0, name: "" });
    logoutStorage();
  }

  return (
    <AuthContextProv.Provider
      value={{
        token,
        user: user,
        isAuthenticated,
        login: login,
        logout: logout,
      }}
    >
      {props.children}
    </AuthContextProv.Provider>
  );
}

export { AuthProvider, AuthContextProv };
