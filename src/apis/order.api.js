import { storage } from "../utils";

const API_URL = process.env.REACT_APP_API_URL;

export const getListOrders = async () => {
  const auth = storage.load("auth");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/orders`, {
    method: "GET",
    headers,
  });

  return res.json();
};

export const getOrderById = async (id) => {
  const auth = storage.load("auth");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/order-detail/${id}`, {
    method: "GET",
    headers,
  });

  return res.json();
};

export const updateStatus = async (id, status) => {
  const auth = storage.load("auth");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");

  const res = await fetch(`${API_URL}/order/update-status/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(status),
  });

  return res.json();
};

export const filteOrders = async (filter) => {
  const auth = storage.load("auth");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");

  const res = await fetch(
    `${API_URL}/orders/filter?` + new URLSearchParams(filter),
    {
      method: "GET",
      headers,
    }
  );

  return res.json();
};
