import { storage } from "../utils";

const API_URL = process.env.REACT_APP_API_URL

export const getListCustomers = async (filter) => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/customers/filter?` + new URLSearchParams(filter), {
    method: "GET",
    headers,
  });

  return res.json();
}

export const getCustomerById = async (id) => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/customer/${id}`, {
    method: "GET",
    headers,
  });

  return res.json();
}

export const updateCustomer = async (id, data) => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/customer/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data)
  });

  return res.json();
}

export const blockCustomer = async (id, data) => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");

  const res = await fetch(`${API_URL}/customer/block/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data)
  });

  return res.json();
}
