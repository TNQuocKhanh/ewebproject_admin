import { storage } from "../utils";

const API_URL = process.env.REACT_APP_API_URL;

export const getListVouchers = async () => {
  const auth = storage.load("auth");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/vouchers`, {
    method: "GET",
    headers,
  });

  return res.json();
};

export const createVoucher = async (data) => {
  const auth = storage.load("auth");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/voucher/create`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  return res.json();
};

export const getVoucherById = async (id) => {
  const auth = storage.load("auth");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/voucher/${id}`, {
    method: "GET",
    headers,
  });

  return res.json();
};

export const updateVoucher = async (id, data) => {
  const auth = storage.load("auth");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/voucher/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  });

  return res.json();
};
