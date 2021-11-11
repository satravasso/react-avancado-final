import axios from "axios";
import { getToken } from "../../login/services/auth";

const api = axios.create({
  baseURL: process.env.REACT_APP_MOCK_API,
});

api.interceptors.request.use((config: any) => {
  const token = getToken();
  config.headers.authorization = token;
  return config;
});

export async function createPost(data: any) {
  const response = await api.post("/blog", data);
  console.log("Crete Post", response);
  return response;
}

export async function getPosts() {
  const response = await api.get("/blog");
  console.log("Get Posts", response);
  return response;
}

export async function deletePost(id: string) {
  const response = await api.delete(`/blog/${id}`);
  console.log("Delete Post", response);
  return response;
}
