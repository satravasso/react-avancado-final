import React from "react";
import { isNonNullChain } from "typescript";
import { authenticate } from "../module/posts/services/api";

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
    if (token !== "") {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
    }
  }, [token, user]);

  async function login(login: string, password: string) {
    // const response: any = await authenticate(login, password);

    setToken("dsf");
    setUser({ id: 1, name: "Sabrina" });
    // if (response.status === 200 && response.data.auth === true) {
    //   setToken(response.data.token);
    //   setUser({ id: 1, name: "Sabrina" });
    //   return true;
    // }
    return true;
  }

  function logout() {
    setToken(null);
    setUser({ id: 0, name: "" });
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
