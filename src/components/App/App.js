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
  const [statusMessage, setStatusMessage] = useState("");
  const [savedMovies, setSavedMovies] = useState([]);
  const [isMoviesLoading, setIsMoviesLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(false);
  const [filteredArray, setFilteredArray] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [currentSavedMovies, setCurrentSavedMovies] = useState([]);
  const [nothingSaved, setNothingSaved] = useState(false);
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const history = useHistory();
  const displayedCashedArray = localStorage.getItem('filtered movies');
  const allMoviesArray = localStorage.getItem('movies');

  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (!res || res.statusCode === 400)
            throw new Error("Токен не передан или передан не в том формате");
          if (!res || res.statusCode === 401)
            throw new Error("Переданный токен некорректен");
          if (res) {
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [history]);

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

  function handleEditProfile() {
    setIsEdit(true)
    setDisabled(false)
  }

  function handleUpdateUser(data) {
    MainApi.updateUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .then(setTimeout(() => {
        setStatusMessage('Данные успешно сохранены!')
      }, 5000))
      .catch((err) => {
        setStatusMessage(`При обновлении профиля произошла ошибка. ${err}`);
      })
      .finally(() => {
        setIsEdit(false);
        setDisabled(true);
      })
  }

  const handleRegister = ({ name, email, password }) => {
    return auth
      .register(name, email, password)
      .then((res) => {
        if (!res || res.statusCode === 400) {
          throw new Error("Некорректно заполнено одно из полей ");
        }
        setLoggedIn(true);
        history.push("/movies");
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = ({ email, password }) => {
    return auth.login(email, password)
      .then((res) => {
        if (!res || res.statusCode === 400) {
          setLoginStatus(true)
          setLoginMessage("Не передано одно из полей");
        }
        if (!res || res.statusCode === 401) {
          setLoginStatus(true)
          setLoginMessage("Пользователь с таким email не найден");
        }
        if (res) {
          localStorage.setItem('jwt', res);
          setLoggedIn(true);
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleSearchResults(searchQuery) {
    if (searchQuery === true) {
      setLoadingError(true);
      setIsMoviesLoading(false);
    } else {
      setLoadingError(false);
      setIsMoviesLoading(false);
      const cashedMovies = JSON.parse(localStorage.getItem('movies'));
      let resArray = toSearch(cashedMovies, searchQuery);
      if (resArray.length === 0) {
        setEmpty(true);
      }
      setSearchResult(resArray)
    }
  }
  
  function toSearch(allMoviesArray, searchQuery) {
    const moviesFiltered = [];
    allMoviesArray.forEach(function (element) {
      const dataMovie = [element.nameEN && element.nameEN.toLowerCase(), element.nameRU && element.nameRU.toLowerCase()].join();
      if (dataMovie.includes(searchQuery)) {
        moviesFiltered.push(element);
      }
    });
    localStorage.setItem('filtered movies', JSON.stringify(moviesFiltered));
    return moviesFiltered;
  }

  function handleSearchMovieButton(searchQuery) {
    setLoadingError(false);
    setIsMoviesLoading(true)
    setEmpty(false);
    setTimeout(handleSearchResults, 1000, searchQuery);
    if (!allMoviesArray) {
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
          setTimeout(handleSearchResults, 1000, searchQuery);
        })
        .catch(() => {
          setTimeout(handleSearchResults, 1000, true);
        })
    } else {
      setTimeout(handleSearchResults, 1000, searchQuery);
    }
  }

  function handleSearchShortButton(checked) {
    if (checked) {
      let shortFilteredArray = [];
      if (searchResult.length > 0) {
        shortFilteredArray = searchShort(searchResult);
      }
      if (shortFilteredArray.length > 0) {
        setFilteredArray(searchResult);
        setSearchResult(shortFilteredArray);
      }
    } else {
      setSearchResult(filteredArray);
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

  function handleSearchSavedMovie(query) {
    const resultsArray = toSearch(savedMovies, query);
    setCurrentSavedMovies(resultsArray);
    if (resultsArray.length === 0) {
      return setEmpty(true);
    }
  }

  function handleSearchShortSavedButton(checked) {
    if (checked) {
      let shortFilteredArray = [];
      if (currentSavedMovies.length > 0) {
        shortFilteredArray = searchShort(currentSavedMovies);
      }
      setFilteredArray(currentSavedMovies);
      setCurrentSavedMovies(shortFilteredArray);
      if (currentSavedMovies.length === 0) {
        return setEmpty(true);
      }
    } else {
      setCurrentSavedMovies(filteredArray);
    }
  }

  function handleSaveMovie(movie) {
    MainApi.saveMovie(movie)
      .then(() => {
        return MainApi.getSavedMovies();
      })
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => {
        console.log(`Что-то пошло не так. ${err}`);
      });
  }

  function handleDeleteMovie(movie) {
    let id;
    savedMovies.forEach((item) => {
      if (item.movieId === movie) {
        id = item._id;
      }
    });
    MainApi.deleteMovie(id)
      .then(() => {
        return MainApi.getSavedMovies();
      })
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => {
        console.log(`Что-то пошло не так. ${err}`);
      });
  }

  function handleDeleteMovieFromSaved(_id) {
    MainApi.deleteMovie(_id)
      .then(() => {
        return MainApi.getSavedMovies();
      })
      .then((res) => {
        setSavedMovies(res);
      })
      .catch((err) => {
        console.log(`Что-то пошло не так. ${err}`);
      });
  }

  React.useEffect(() => {
    setCurrentSavedMovies(savedMovies);
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
          currentSavedMovies.length !== 0 && savedMovies.length !== 0
            ? setNothingSaved(true)
            : setSavedMovies(res) && setCurrentSavedMovies(res)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn, currentSavedMovies.length, savedMovies.length]);

  React.useEffect(() => {
    if (displayedCashedArray === null) {
      return
    } else if (displayedCashedArray.length > 0) {
      return setSearchResult(JSON.parse(displayedCashedArray))
    }
  }, [displayedCashedArray])
  
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
              moviesData={searchResult}
              savedMovies={savedMovies}
              isMoviesLoading={isMoviesLoading}
              loadingError={loadingError}
              onSaveMovie={handleSaveMovie}
              onDeleteMovie={handleDeleteMovie}
              nothingSaved={nothingSaved}
              filterShort={handleSearchShortButton}
              searchResult={searchResult}
            />
            <ProtectedRoute
              path="/saved-movies"
              component={Movies}
              loggedIn={loggedIn}
              isMoviesLoading={isMoviesLoading}
              switchTo="saved-movies"
              nothingSaved={nothingSaved}
              empty={empty}
              onSearch={handleSearchSavedMovie}
              savedMovies={savedMovies}
              onDeleteMovie={handleDeleteMovieFromSaved}
              filterShort={handleSearchShortSavedButton}
              currentSavedMovies={currentSavedMovies}
            />
            <ProtectedRoute
              path="/profile"
              component={Profile}
              loggedIn={loggedIn}
              onUpdateUser={handleUpdateUser}
              handleEditProfile={handleEditProfile}
              onLogout={handleLogout}
              message={statusMessage}
              isEdit={isEdit}
              disabled={disabled}
            />
            <Route exact path="/">
              <Main />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
            <Route path="/sign-in">
              <Login
                onLogin={handleLogin}
                loginStatus={loginStatus}
                loginMessage={loginMessage} />
            </Route>
            <Route>
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
            <Route path="*" component={NotFound} />
          </Switch>
          <Footer />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
