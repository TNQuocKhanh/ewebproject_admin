import { storage } from "../utils";

const API_URL = process.env.REACT_APP_API_URL;

export const getListProducts = async (filter) => {
  const auth = storage.load("auth");
  const token = auth.accessToken;

  const _filter = {
    ...filter,
    size: 1000
  }

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/products/filter?` + new URLSearchParams(_filter), {
    method: "GET",
    headers,
  });

  return res.json();
};

export const getProductById = async (id) => {
  const auth = storage.load("auth");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/product/${id}`, {
    method: "GET",
    headers,
  });

  return res.json();
};

export const createProduct = async (data) => {
  const auth = storage.load("auth");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/product/create`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  return res.json();
};

export const updateProduct = async (id, data) => {
  const auth = storage.load("auth");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/product/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });

  return res.json();
};

export const updateExtraImageProduct = async (id, data) => {
  const auth = storage.load("auth");
  const token = auth.accessToken;
  
  const headers = new Headers();
  const formdata = new FormData();

  formdata.append("mainImage", data[0]);

  for (let i = 0; i < data.length; i++) {
    formdata.append("extraImage", data[i]);
  }

  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/product/update-image/${id}`, {
    method: "PUT",
    headers,
    body: formdata,
  });

  return res.json();
};

export const getListExtraProducts = async () => {
  const auth = storage.load("auth");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/products/extra`, {
    method: "GET",
    headers,
  });

  return res.json();
};
