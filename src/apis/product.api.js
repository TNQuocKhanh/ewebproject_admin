import { storage } from "../utils";

const API_URL = process.env.REACT_APP_API_URL

export const getListProducts = async () => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/products`, {
    method: "GET",
    headers,
  });

  return res.json();
};
