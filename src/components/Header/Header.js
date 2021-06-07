import "./Header.css";
import logo from "../../images/header__logo.svg";
import { NavLink, Link, useLocation } from "react-router-dom";
import Navigation from "../Navigation/Navigation";

export default function Header(props) {
  const location = useLocation();

  const headerClassName = `${
    location.pathname === "/sign-in" ||
    location.pathname === "/sign-up" ||
    location.pathname === "*"
      ? "header_hidden"
      : "header"
  }`;

  return (
    <header className={headerClassName}>
      <NavLink exact to="/">
        <img className="header__logo" src={logo} alt="Movies Explorer logo" />
      </NavLink>
      {props.loggedIn ? (
        <>
          <Navigation
            onOpenBurgerClick={props.onOpenBurgerClick}
            onCloseBurgerClick={props.onCloseBurgerClick}
            isBurgerMenuOpened={props.isBurgerMenuOpened}
            isOpen={props.isOpen}
          />
        </>
      ) : (
        <>
          <section className="header__unathorized">
            <Link to="/sign-up">
              <button className="button header__regiter-button">
                Регистрация
              </button>
            </Link>
            <Link to="/sign-in">
              <button className="button header__login-button">Войти</button>
            </Link>
          </section>
        </>
      )}
    </header>
  );
}
