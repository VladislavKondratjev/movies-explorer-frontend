export const BASE_URL = 'https://api.diploma.nomoredomains.monster';

const responseCheck = (response) => response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`);

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name, email, password })
  })
    .then(responseCheck)
};
export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  })
  .then(responseCheck)
  .then((data) => {
    localStorage.setItem('jwt', data.token)
    return data.token;
  })
};
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(responseCheck)
}
