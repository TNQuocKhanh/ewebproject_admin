import {storage} from '../utils'

const API_URL = process.env.REACT_APP_API_URL

//const auth = storage.load('auth')
//console.log('==auth', auth)

export const login = async (email, password) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const data = JSON.stringify({ email, password });

  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers,
    body: data,
  });
  return res;
};

export const logout = async () => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    headers
  });
  return res.json();
};

export const getListUsers = async () => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/users`, {
    method: "GET",
    headers,
  });

  return res.json();
};

export const createUser = async (data) => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/user/create`, {
    method: "POST",
    headers,
    body: JSON.stringify(data)
  });

  return res.json();
};

export const getUserById = async (id) => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/user/${id}`, {
    method: "GET",
    headers,
  });

  return res.json();
};

export const updateUser = async (id, data) => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/user/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data)
  });

  return res.json();
}

export const downloadUserList = async () => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/users/export/excel`, {
    method: "GET",
    headers,
  });

  return res.json();
}

export const getProfile = async () => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/user/profile`, {
    method: "GET",
    headers,
  });

  return res.json();
}

export const updateProfile  = async (data) => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/user/change-profile`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data)
  });

  return res.json();
}

export const updateUserPhoto = async (id, data) => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  console.log('===data', data)

  const headers = new Headers();
  const formdata = new FormData()
  formdata.append("image", data)
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/user/update-photo/${id}`, {
    method: "PUT",
    headers,
    body: formdata 
  });

  return res.json();
}

export const changeUserPassword = async (data) => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/user/change-password`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data)
  });

  return res.json();
}

export const updateRole = async (id, data) => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/user/update-role/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data)
  });

  return res.json();
}

export const blockUser = async (id) => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/user/block/${id}`, {
    method: "PUT",
    headers,
  });

  return res.json();
}

export const unblockUser = async (id) => {
  const auth = storage.load('auth')
  const token = auth.accessToken

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${API_URL}/user/unblock/${id}`, {
    method: "PUT",
    headers,
  });

  return res.json();
}
