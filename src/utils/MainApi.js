class Api {
  constructor({ address, headers }) {
    this._address = address;
    this._headers = headers;
  }

  _apiAnswer(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserData() {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._apiAnswer(res));
  }

  updateUserInfo(data) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      }),
    }).then((res) => this._apiAnswer(res));
  }

  logout = () => {
    return fetch(`${this._address}/logout`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.removeItem("jwt")}`,
      },
    }).then((res) => this._apiAnswer(res));
  };

  getSavedMovies() {
    return fetch(`${this._address}/movies`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._apiAnswer(res));
  }

  saveMovie(movie) {
    return fetch(`${this._address}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: 'https://api.nomoreparties.co'+movie.image.url,
        trailer: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: 'https://api.nomoreparties.co'+movie.image.url,
        movieId: movie.id,
      })
    }).then((res) => this._apiAnswer(res));
  }

  deleteMovie(_id) {
    return fetch(`${this._address}/movies/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._apiAnswer(res));
  }

  changeMovieStatus(id, _id, state) {
    return state ? this.saveMovie(id) : this.deleteMovie(_id);
  }
}

export const MainApi = new Api({
  address: "https://api.diploma.nomoredomains.monster",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  }
});
