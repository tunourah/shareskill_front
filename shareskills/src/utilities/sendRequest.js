// src/utilities/sendRequest.js
export default async function sendRequest(url, method = 'GET', payload) {
  const token = localStorage.getItem('token');
  const headers = {};

  let body;
  if (payload instanceof FormData) {
    // Let fetch set Content-Type: multipart/form-data; boundary=…
    body = payload;
  } else if (payload != null) {
    // JSON payloads
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(payload);
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`http://127.0.0.1:8000${url}`, {
    method,
    headers,
    body,
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw errorBody;
  }
  return res.json();
}
