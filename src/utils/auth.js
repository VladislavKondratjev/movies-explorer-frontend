class Auth {
  constructor(options) {
    this.baseUrl = options.baseUrl;
  }

  responseCheck = (response) =>
    response.ok ? response.json() : Promise.reject(`Ошибка ${response.status}`);

  register = (name, email, password) => {
    return fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then(this.responseCheck);
  };

  login = (email, password) => {
    return fetch(`${this.baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this.responseCheck);
  };

  checkToken = (jwt) => {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this.responseCheck);
  }
}

  const auth = new Auth({
    baseUrl: 'https://api.diploma.nomoredomains.monster',
  });

  export default auth;
