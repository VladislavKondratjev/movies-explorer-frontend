import React from "react";
import "./Navigation.css";
import icon from "../../images/navigation__icon.svg";
import { NavLink, Link } from "react-router-dom";

export default function Navigation(props) {
  const burgerMenuClassName = `${props.isBurgerMenuOpened
    ? "navigation__burger-line_close"
    : "navigation__burger-line"
    }`;

  function handleBurgerOpen() {
    props.onOpenBurgerClick();
  }
  function handleBurgerClose() {
    props.onCloseBurgerClick();
  }
  return (
    <nav className="navigation">
      <button
        className="navigation__burger button"
        type="button"
        onClick={handleBurgerOpen}
      >
        <div className={burgerMenuClassName}></div>
        <div className={burgerMenuClassName}></div>
        <div className={burgerMenuClassName}></div>
      </button>
      <div
        className={`navigation__content ${props.isOpen ? "navigation__content_opened" : ""
          }`}
      >
        <div className="navigation__links-burger">
          <div className="navigation__links">
            <NavLink
              exact
              to="/"
              className="navigation__link navigation__link_burger"
              onClick={handleBurgerClose}
            >
              Главная
            </NavLink>
            <NavLink
              exact
              to="/movies"
              className="navigation__link"
              onClick={handleBurgerClose}
            >
              Фильмы
            </NavLink>
            <NavLink
              exact
              to="/saved-movies"
              className="navigation__link"
              onClick={handleBurgerClose}
            >
              Сохранённые фильмы
            </NavLink>
          </div>
          <section className="navigation__profile">
            <Link to="/profile">
              <img
                className="navigation__profile_icon button"
                src={icon}
                alt="Иконка главной страницы"
                onClick={handleBurgerClose}
              />
            </Link>
          </section>
        </div>
      </div>
    </nav>
  );
}
