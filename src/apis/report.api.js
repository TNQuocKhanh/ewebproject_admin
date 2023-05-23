import { storage } from "../utils";

const API_URL = process.env.REACT_APP_API_URL;

export const countInDashboard = async () => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const res = await fetch(`${API_URL}/count-all`, {
    method: "GET",
    headers,
  });

  return res.json();
};

export const getPaymentReport = async () => {
  const auth = storage.load("auth");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/payments`, {
    method: "GET",
    headers,
  });

  return res.json();
};

export const getFeature = async () => {
  const auth = storage.load("auth");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/best-selling-product`, {
    method: "GET",
    headers,
  });

  return res.json();
};

export const getUnsold = async () => {
  const auth = storage.load("auth");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/products-in-stock`, {
    method: "GET",
    headers,
  });

  return res.json();
};

export const getProductReportByTime = async () => {
  const auth = storage.load("auth");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/sales-report-by-time?day=7`, {
    method: "GET",
    headers,
  });

  return res.json();
};

export const getOrderReportByTime = async (method) => {
  const auth = storage.load("auth");
  const token = auth?.accessToken;

  const data = {
    paymentMethod: method,
    day: 1000,
  };

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(
    `${API_URL}/orders-report-by-time?` + new URLSearchParams(data),
    {
      method: "GET",
      headers,
    }
  );

  return res.json();
};

export const getOrderReportByType = async (type) => {
  const auth = storage.load("auth");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/orders-report-by-type?type=${type}`, {
    method: "GET",
    headers,
  });

  return res.json();
};

export const getOrderReportByTypePlus = async (type) => {
  const auth = storage.load("auth");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(
    `${API_URL}/orders-report-by-type-plus?type=${type}`,
    {
      method: "GET",
      headers,
    }
  );

  return res.json();
};

export const getCategoryReport = async () => {
  const auth = storage.load("auth");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/category-report-by-time?day=60`, {
    method: "GET",
    headers,
  });

  return res.json();
};
