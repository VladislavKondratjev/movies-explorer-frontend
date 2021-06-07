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

  getUserData() {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
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
    });
  };

  getMovies(data) {
    return fetch(`${this._address}/`), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.removeItem("jwt")}`,
      }
    }
  }

  saveMovie(data) {
    return fetch(`${this._address}/movies`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        country: data.country,
        director:data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailer: data.trailer,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        thumbnail: data.thumbnail,
        movieId: data.movieId,
    })
    }).then((res) => this._apiAnswer(res));
  }

  deleteMovie(id) {
    return fetch(`${this._address}/movies/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        "Content-Type": "application/json",
      },
    }).then((res) => this._apiAnswer(res));
  }

  changeMovieStatus(id, state) {
    return state ? this.saveMovie(id) : this.deleteMovie(id);
  }
}

export const MainApi = new Api({
  address: "https://api.diploma.nomoredomains.monster",
});
