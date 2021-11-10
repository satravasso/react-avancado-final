import axios from "axios";
import { getToken } from "../../login/services/auth";

const api = axios.create({
  baseURL: "https://q50wzro7b2.execute-api.us-east-1.amazonaws.com",
});

api.interceptors.request.use((config: any) => {
  const token = getToken();
  config.headers.authorization = `Bearer ${token}`;
  return config;
});

export async function createPost(data: any) {
  const response = await api.post("/post", data);
  console.log("Crete Post", response);
  return response;
}

export async function getPosts() {
  const response = await api.get("/posts");
  console.log("Get Posts", response);
  return response;
}

export async function deletePost(id: string) {
  const response = await api.delete(`/post/${id}`);
  console.log("Delete Post", response);
  return response;
}

export async function authenticate(login: string, password: string) {
  const response = await api.post("/authenticate", {
    login: login,
    password: password,
  });
  console.log("Login");
  return response;
}
