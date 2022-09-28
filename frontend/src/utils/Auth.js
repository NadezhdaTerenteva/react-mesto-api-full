export const BASE_URL = "http://localhost:4000";

const checkResponse = (response) => {
  return response.ok
    ? response.json()
    : Promise.reject(
        new Error(`Ошибка ${response.status}: ${response.statusText}`)
      );
};

export const register = ({ email, password }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then((res) => checkResponse(res));
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    credentials: 'include',
    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then((res) => checkResponse(res));
};

export const logout = () => {
  return fetch(`${BASE_URL}/signout`, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    credentials: 'include',
  }).then((res) => checkResponse(res));
}

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      //Authorization: `Bearer ${token}`,
    },
    credentials: 'include',
  }).then((res) => checkResponse(res));
};
