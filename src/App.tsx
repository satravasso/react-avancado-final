import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import { useContext } from "react";
import CreateUpdatePostPage from "./module/posts/pages/CreateUpdatePost";
import Login from "./module/login/pages/Login";
import { AuthContextProv } from "./context/authContext";
import AppHeader from "./module/posts/components/Header";
import ListMoviePage from "./module/posts/pages/ListPosts";
import { CreateUser } from "./module/login/pages/CreateUser";

function App() {
  const context = useContext(AuthContextProv);
  return (
    <BrowserRouter>
      {context.isAuthenticated ? <AppHeader /> : null}
      <Switch>
        <PrivateRoute exact path="/">
          <ListMoviePage />
        </PrivateRoute>
        <PrivateRoute path="/create">
          <CreateUpdatePostPage />
        </PrivateRoute>
        <PrivateRoute path="/create/:idPost">
          <CreateUpdatePostPage />
        </PrivateRoute>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <CreateUser />
        </Route>
        <Route>404</Route>
      </Switch>
    </BrowserRouter>
  );
}
// @ts-ignore
function PrivateRoute({ children, ...rest }) {
  const context = useContext(AuthContextProv);
  return (
    <Route {...rest}>
      {context.isAuthenticated ? children : <Redirect to="/login" />}
    </Route>
  );
}

export default App;
