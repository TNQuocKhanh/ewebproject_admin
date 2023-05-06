import { storage } from "../utils";

const API_URL = process.env.REACT_APP_API_URL;

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

export const getProductReportByTime =async (data) => {
  const auth = storage.load("auth");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/sales-report-by-time?day=60`, {
    method: "GET",
    headers,
  });

  return res.json();
}

export const getOrderReportByTime =async (data) => {
  const auth = storage.load("auth");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/orders-report-by-time?day=120`, {
    method: "GET",
    headers,
  });

  return res.json();
}

export const getOrderReportByType =async (data) => {
  const auth = storage.load("auth");
  const token = auth.accessToken;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/orders-report-by-type?type=WEEK`, {
    method: "GET",
    headers,
  });

  return res.json();
}
