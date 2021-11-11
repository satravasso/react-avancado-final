function isAuthenticated() {
  return localStorage.getItem("token") !== null;
}

function getToken() {
  return localStorage.getItem("token");
}

function login(token: any) {
  localStorage.setItem("token", token);
}

function logoutStorage() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export { isAuthenticated, getToken, login, logoutStorage };
