import { storage } from "../utils";

const API_URL = process.env.REACT_APP_API_URL

export const getListProducts = async () => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/products`, {
    method: "GET",
    headers,
  });

  return res.json();
};

export const getProductById = async (id) => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/product/${id}`, {
    method: "GET",
    headers,
  });

  return res.json();
};

export const createProduct = async (data) => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/product/create`, {
    method: "POST",
    headers,
    body: JSON.stringify(data)
  });

  return res.json();
};

export const updateProduct = async (id, data) => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/product/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data)
  });

  return res.json();
}

export const updateImageProduct = async (id, data) => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  const formdata = new FormData()
  formdata.append("mainImage", data)
  formdata.append("extraImage", data)
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/product/update-image/${id}`, {
    method: "PUT",
    headers,
    body: formdata 
  });

  return res.json();
}

export const getListExtraProducts = async () => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/products/extra`, {
    method: "GET",
    headers,
  });

  return res.json();
};
