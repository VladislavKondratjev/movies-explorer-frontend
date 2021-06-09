import "./App.css";
import React, { useState } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import Footer from "../Footer/Footer.js";
import Header from "../Header/Header.js";
import Login from "../Login/Login.js";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import NotFound from "../NotFound/NotFound.js";
import Profile from "../Profile/Profile.js";
import Register from "../Register/Register.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import * as auth from "../../utils/auth";
import { MainApi } from "../../utils/MainApi";
import { MoviesApi } from "../../utils/MoviesApi";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [errorMessage, setErrorMessage] = useState({ message: "" });
  const [savedMovies, setSavedMovies] = useState([]);
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [resMovies, setResMovies] = useState([]);
  const [filtredArray, setFiltredArray] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [currentSaveMovies, setCurrentSaveMovies] = useState([]);
  const [nothingSaved, setNothingSaved] = useState(false)
  const history = useHistory();

  function handleErrorMessage(message) {
    setErrorMessage({ message: message });
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.clear();
    history.push("/");
  }

  function handleBurgerOpen() {
    isBurgerMenuOpened === false
      ? setIsBurgerMenuOpened(true)
      : setIsBurgerMenuOpened(false);
    isBurgerMenuOpened === false ? setIsOpen(true) : setIsOpen(false);
  }

  function handleBurgerClose() {
    setIsBurgerMenuOpened(false);
    setIsOpen(false);
  }

  React.useEffect(() => {
    setCurrentSaveMovies(savedMovies);
  }, [savedMovies]);

  React.useEffect(() => {
    if (loggedIn) {
      MainApi.getUserData()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => console.log(err));
      MainApi.getSavedMovies()
        .then((res) => {
          currentSaveMovies.length === 0
            ? setNothingSaved(true)
            :
            setSavedMovies(res)
          setCurrentSaveMovies(res)
          setNothingSaved(false)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn, currentSaveMovies.length]);

  function handleUpdateUser(data) {
    MainApi.updateUserInfo(data)
      .then((res) => {
        if (res.statusCode === 409)
          throw new Error("Пользователь с таким email уже существует.");
        setCurrentUser(res);
      })
      .catch((err) => {
        handleErrorMessage(`При обновлении профиля произошла ошибка: ${err}`);
      });
  }

  const handleRegister = ({ name, email, password }) => {
    return auth
      .register(name, email, password)
      .then((res) => {
        if (!res || res.statusCode === 400)
          throw new Error("Некорректно заполнено одно из полей ");
        setLoggedIn(true);
        history.push("/movies");
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const tokenCheck = React.useCallback(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          if (!res || res.statusCode === 400)
            throw new Error("Токен не передан или передан не в том формате");
          if (!res || res.statusCode === 401)
            throw new Error("Переданный токен некорректен ");
          if (res) {
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch(() => history.push("/sign-in"));
    }
  }, [history]);

  const handleLogin = ({ email, password }) => {
    return auth
      .login(email, password)
      .then((res) => {
        if (!res || res.statusCode === 400)
          throw new Error("Не передано одно из полей ");
        if (!res || res.statusCode === 401)
          throw new Error("Пользователь с таким email не найден");
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    tokenCheck();
  }, [tokenCheck, loggedIn]);



  function handleSearchMovieButton(searchQuery) {
    setLoadingError(false);
    setIsMoviesLoading(true)
    setEmpty(false);
    const movArr = localStorage.getItem('movies');
    if (!movArr) {
      MoviesApi.getMovies()
        .then((res) => {
          const movies = res.map(item => {
            let newItem = { ...item };
            return newItem;
          });
          return movies;
        })
        .then((movies) => {
          localStorage.setItem('movies', JSON.stringify(movies));
          setTimeout(resMovieHandler, 1000, searchQuery);
        })
        .catch((err) => {
          setTimeout(resMovieHandler, 1000, true);
        })
    } else {
      setTimeout(resMovieHandler, 1000, searchQuery);
    }
  }

  function resMovieHandler(word) {
    if (word === true) {
      setLoadingError(true);
      setIsMoviesLoading(false);
    } else {
      setLoadingError(false);
      setIsMoviesLoading(false);
      const startMovArr = JSON.parse(localStorage.getItem('movies'));
      let resArray = searching(startMovArr, word);
      if (resArray.length === 0) {
        setEmpty(true);
      }
      setResMovies(resArray)
    }
  }

  function searching(allMovies, searchQuery) {
    const moviesFiltered = [];
    allMovies.forEach(function (element) {
      const dataMovie = [element.nameEN && element.nameEN.toLowerCase(), element.nameRU && element.nameRU.toLowerCase()].join();
      if (dataMovie.includes(searchQuery)) {
        moviesFiltered.push(element);
      }
    });
    return moviesFiltered;
  }

  function handleSearchShortButton(checked) {
    if (checked) {
      let shoortFiltredArray = [];
      if (resMovies.length > 0) {
        shoortFiltredArray = searchShort(resMovies);
      }
      if (shoortFiltredArray.length > 0) {
        setFiltredArray(resMovies);
        setResMovies(shoortFiltredArray);
      }
    } else {
      setResMovies(filtredArray);
    }
  }

  function searchShort(allMovies) {
    const moviesFiltered = [];
    allMovies.forEach(function (element) {
      if (element.duration) {
        if (element.duration <= 40) {
          moviesFiltered.push(element);
        }
      }
    });
    return moviesFiltered;
  }

  function handleSearchSavedMovie(word) {
    const startMovArr = savedMovies;
    const resArray = searching(startMovArr, word);
    if (resArray.length === 0) {
      setEmpty(true);
    }
    setCurrentSaveMovies(resArray);
  }

  function handleSearchShortSavedButton(valCheckBox) {
    if (valCheckBox) { // для тру
      let shoortFiltredArray = [];
      if (currentSaveMovies.length > 0) {
        shoortFiltredArray = searchShort(currentSaveMovies);
      }
      setFiltredArray(currentSaveMovies);
      setCurrentSaveMovies(shoortFiltredArray);
    } else {
      setCurrentSaveMovies(filtredArray);
    }
  }

  function handlerSaveMovie(movieData) {
    MainApi.saveMovie(movieData)
      .then((res) => {
        return MainApi.getSavedMovies();
      })
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => {
        console.log(`При сохранении фильма что-то пошло не так. ${err}`);
      });
  }

  function handlerToggleSaveMovie(movieData) {
    let id;
    savedMovies.forEach(function (item) {
      if (item.movieId === movieData) {
        id = item.id;
      }
    });
    MainApi.deleteMovie(id)
      .then((res) => {
        return MainApi.getSavedMovies();
      })
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => {
        console.log(`При удалении фильма что-то пошло не так. ${err}`);
      });
  }

  function handlerDeleteMovie(_id) {
    MainApi.deleteMovie(_id)
      .then((res) => {
        return MainApi.getSavedMovies();
      })
      .then((res) => {
        setSavedMovies(res);
      })
      .catch(() => {
        console.log('что то пошло не так');
      });
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser }}>
      <div className="page">
        <div className="page__container">
          <Header
            loggedIn={loggedIn}
            isOpen={isOpen}
            isBurgerMenuOpened={isBurgerMenuOpened}
            onOpenBurgerClick={handleBurgerOpen}
            onCloseBurgerClick={handleBurgerClose}
          />
          <Switch>
            <ProtectedRoute
              path="/movies"
              component={Movies}
              loggedIn={loggedIn}
              switchTo="movies"
              empty={empty}
              onSearch={handleSearchMovieButton}
              moviesData={resMovies}
              savedMovies={savedMovies}
              isMoviesLoading={isMoviesLoading}
              loadingError={loadingError}
              saveMovie={handlerSaveMovie}
              onMovieDelete={handlerToggleSaveMovie}
              nothingSaved={nothingSaved}
              filterShort={handleSearchShortButton}
            />
            <ProtectedRoute
              path="/saved-movies"
              component={Movies}
              loggedIn={loggedIn}
              isMoviesLoading={isMoviesLoading}
              switchTo="saved-movies"
              nothingSaved={nothingSaved}
              onSearch={handleSearchSavedMovie}
              savedMovies={savedMovies}
              onMovieDelete={handlerDeleteMovie}
              filterShort={handleSearchShortSavedButton}
              currentSaveMovies={currentSaveMovies}
            />
            <ProtectedRoute
              path="/profile"
              component={Profile}
              loggedIn={loggedIn}
              onUpdateUser={handleUpdateUser}
              onLogout={handleLogout}
              error={errorMessage}
            />
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>
            <Route path="*" component={NotFound} />
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
