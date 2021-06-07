class Api {
  constructor({ address }) {
    this._address = address;
  }

  _apiAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(`${this._address}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => this._apiAnswer(res));
  }
}

export const MoviesApi = new Api({
  address: "https://api.nomoreparties.co/beatfilm-movies",
});
