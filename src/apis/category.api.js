import { storage } from "../utils";

const API_URL = process.env.REACT_APP_API_URL

export const getListCategories = async () => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/categories`, {
    method: "GET",
    headers,
  });

  return res.json();
};

export const createCategory = async (data) => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/category/create`, {
    method: "POST",
    headers,
    body: JSON.stringify(data)
  });

  return res.json();
};

export const getCategoryById = async (id) => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/category/${id}`, {
    method: "GET",
    headers,
  });

  return res.json();
};

export const updateCategory = async (id, data) => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/category/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data)
  });

  return res.json();
};
