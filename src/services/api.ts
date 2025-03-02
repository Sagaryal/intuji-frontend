import axios from "axios";
import { API_BASE_URL } from "./constants";

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: { "Content-Type": "application/json" },
});

export const post = async <T, R>(slug: string, payload: T): Promise<R> => {
  const response = await api.post(slug, payload);
  return response.data;
};

export const get = async <R>(slug: string): Promise<R> => {
  const response = await api.get<R>(slug);
  return response.data;
};

export const put = async <T, R>(
  slug: string,
  id: string,
  payload: T
): Promise<R> => {
  const response = await api.put<R>(`${slug}/${id}`, payload);
  return response.data;
};

export const remove = async <R>(slug: string, id: string): Promise<R> => {
  const response = await api.delete<R>(`${slug}/${id}`);
  return response.data;
};
