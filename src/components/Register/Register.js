import "./Register.css";
import logo from "../../images/header__logo.svg";
import { NavLink, Link } from "react-router-dom";

export default function Register() {
  return (
    <section className="sign">
      <NavLink exact to="/">
        <img className="header__logo" src={logo} alt="Movies Explorer logo" />
      </NavLink>
      <h1 className="sign__title">Добро пожаловать!</h1>
      <form className="sign__form" method="PATCH" action="#">
        <span className="sign__input-heading">Имя</span>
        <input
          id="name"
          name="name"
          autoComplete="off"
          type="name"
          className="sign__input"
          placeholder="Имя"
          minLength="9"
          maxLength="40"
          required
        />
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
          required
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
          required
        />
        <span className="sign__input-error">Что-то пошло не так...</span>

        <button type="submit" className="sign__submit-button button">
          Зарегистрироваться
        </button>
        <span className="sign__to-sign">
          Уже зарегистрированы?{" "}
          <Link to="/sign-in" className="sign__link-to-sign button">
            Войти
          </Link>
        </span>
      </form>
    </section>
  );
}
