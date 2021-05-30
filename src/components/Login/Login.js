import React from 'react';
import "../Register/Register.css";
import logo from "../../images/header__logo.svg";
import { NavLink, Link } from "react-router-dom";

export default function Register(props) {
  function handleLogin() {
    props.onLogin();
  }

  return (
    <section className="sign">
      <NavLink exact to="/">
        <img className="header__logo" src={logo} alt="Movies Explorer logo" />
      </NavLink>
      <h1 className="sign__title">Рады видеть!</h1>
      <form className="sign__form" method="PATCH" action="#">
        <span className="sign__input-heading">E-mail</span>
        <input
          id="email"
          name="email"
          autoComplete="off"
          type="email"
          className="sign__input"
          placeholder="Email"
          minLength="9"
          maxLength="40"
        />

        <span className="sign__input-heading">Пароль</span>
        <input
          id="password"
          name="password"
          autoComplete="off"
          type="password"
          className="sign__input"
          placeholder="Пароль"
          minLength="8"
          maxLength="15"
        />
        <span className="sign__input-error">Что-то пошло не так...</span>

        <button type="button" className="sign__submit-button button" onClick={handleLogin}>
        {/* <Link to="/" className="sign__submit-button" onclick={handleLogin}> */}
          Войти
        {/* </Link> */}
        </button>
        <span className="sign__to-sign">
          Ещё не зарегистрированы?{" "}
          <Link to="/sign-up" className="sign__link-to-sign button">
            Регистрация
          </Link>
        </span>
      </form>
    </section>
  );
}
