import "./App.css";
import React from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import Footer from "../Footer/Footer.js";
import Header from "../Header/Header.js";
import Login from "../Login/Login.js";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import NotFound from "../NotFound/NotFound.js";
import Profile from "../Profile/Profile.js";
import Register from "../Register/Register.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import * as auth from "../../utils/auth";
import { MainApi } from "../../utils/MainApi";
import { MoviesApi } from "../../utils/MoviesApi";

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState({ message: "" });
  const [movies, setMovies] = React.useState([]);
  const [isMoviesLoading, setIsMoviesLoading] = React.useState(false);

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
    if (loggedIn) {
      MainApi.getUserData()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

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

  function handleGetMovies() {
    setIsMoviesLoading(true);
    MoviesApi.getMovies()
      .then((res) => {
        setMovies(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsMoviesLoading(false));
  };

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
              movies={movies}
              isMoviesLoading={isMoviesLoading}
              onGetMovies={handleGetMovies}
            />
            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              loggedIn={loggedIn}
              movies={movies}
              isMoviesLoading={isMoviesLoading}
              onGetMovies={handleGetMovies}
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
