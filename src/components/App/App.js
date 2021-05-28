import React from "react";
import "./App.css";
import Header from "../Header/Header.js";
import Main from "../Main/Main.js";
import Movies from "../Movies/Movies.js";
import SavedMovies from "../SavedMovies/SavedMovies.js";
import Profile from "../Profile/Profile.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import Footer from "../Footer/Footer.js";
import NotFound from "../NotFound/NotFound.js";
import { Route, Switch, useHistory } from "react-router-dom";

export default function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isSign, setIsSign] = React.useState(false);
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  const history = useHistory();

  function handleEditProfile() {
    setIsEdit(true);
  }

  function handleSaveChanges() {
    setIsEdit(false);
  }

  function handleLogin() {
    setLoggedIn(true);
    setIsSign(false);
    history.push("/");
  }

  function handleLogout() {
    setLoggedIn(false);
    history.push("/");
  }

  function handleSign() {
    if (isSign === false) {
      setIsSign(true);
    } else {
      setIsSign(false);
    }
  }

  function handleBurgerOpen() {
    if (isBurgerMenuOpened === false) {
      setIsBurgerMenuOpened(true);
      setIsOpen(true);
    } else {
      setIsBurgerMenuOpened(false);
      setIsOpen(false);
    }
  }
  function handleBurgerClose() {
    setIsBurgerMenuOpened(false);
    setIsOpen(false);
  }

  return (
    <div className="page">
      <div className="page__container">
        <Switch>
          <Route exact path="/">
            <Header
              loggedIn={loggedIn}
              onSign={handleSign}
              isSign={isSign}
              isOpen={isOpen}
              isBurgerMenuOpened={isBurgerMenuOpened}
              onOpenBurgerClick={handleBurgerOpen}
              onCloseBurgerClick={handleBurgerClose}
            />
            <Main />
            <Footer />
          </Route>
          <Route path="/movies">
            <Header
              loggedIn={loggedIn}
              onSign={handleSign}
              isSign={isSign}
              isOpen={isOpen}
              isBurgerMenuOpened={isBurgerMenuOpened}
              onOpenBurgerClick={handleBurgerOpen}
              onCloseBurgerClick={handleBurgerClose}
            />{" "}
            <Movies />
            <Footer />
          </Route>
          <Route path="/saved-movies">
            <Header
              loggedIn={loggedIn}
              onSign={handleSign}
              isSign={isSign}
              isOpen={isOpen}
              isBurgerMenuOpened={isBurgerMenuOpened}
              onOpenBurgerClick={handleBurgerOpen}
              onCloseBurgerClick={handleBurgerClose}
            />{" "}
            <SavedMovies />
            <Footer />
          </Route>
          <Route path="/profile">
            <Header
              loggedIn={loggedIn}
              onSign={handleSign}
              isSign={isSign}
              isOpen={isOpen}
              isBurgerMenuOpened={isBurgerMenuOpened}
              onOpenBurgerClick={handleBurgerOpen}
              onCloseBurgerClick={handleBurgerClose}
            />{" "}
            <Profile
              isEdit={isEdit}
              onEditClick={handleEditProfile}
              onSaveChanges={handleSaveChanges}
              onLogout={handleLogout}
            />
          </Route>
          <Route path="/sign-up">
            <Register />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </div>
  );
}
