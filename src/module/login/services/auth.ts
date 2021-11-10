function isAuthenticated() {
  return localStorage.getItem("token") !== null;
}

function getToken() {
  return localStorage.getItem("token");
}

function login(token: any) {
  localStorage.setItem("token", token);
}

export { isAuthenticated, getToken, login };
