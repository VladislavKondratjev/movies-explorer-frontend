import React from "react";
import "../Register/Register.css";
import logo from "../../images/header__logo.svg";
import { NavLink, Link } from "react-router-dom";
import { useFormWithValidation } from '../../hooks/useForm';


export default function Login({ onLogin, loginStatus, loginMessage }) {
  const { values, handleChange, errors, setValues, isValid } = useFormWithValidation();
  const [disabled, setDisabled] = React.useState(true);

  React.useEffect(() => {
    setValues(values);
  }, [setValues, values])

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    onLogin(values)
  };

  React.useEffect(() => {
    const disabled = !isValid
    setDisabled(disabled);
  }, [isValid]);

  const submitButtonClassName = `${disabled ? "sign__submit-button_disabled" : "sign__submit-button button"}`

  return (
    <section className="sign">
      <NavLink exact to="/"
      >
        <img className="header__logo" src={logo} alt="Movies Explorer logo" />
      </NavLink>
      <h1 className="sign__title">Рады видеть!</h1>
      <form
        className="sign__form"
        method="POST"
        action="#"
        onSubmit={handleSubmit}
      >
        <label className="sign__input-heading">E-mail</label>
        <input
          id="email"
          name="email"
          autoComplete="off"
          type="email"
          className="sign__input"
          placeholder="Email"
          minLength="9"
          maxLength="40"
          onChange={handleChange}
          required
          value={values.email || ""}
        />
        <span className="error">{errors.email || ""}</span>

        <label className="sign__input-heading">Пароль</label>
        <input
          id="password"
          name="password"
          autoComplete="off"
          type="password"
          className="sign__input"
          placeholder="Пароль"
          minLength="6"
          maxLength="15"
          onChange={handleChange}
          required
          value={values.password || ""}
        />
        <span className="error">{errors.password || ""}</span>
        {loginStatus && <span className="error">{loginMessage}</span>}

        <button type="submit" className={submitButtonClassName} disabled={disabled}>Войти</button>
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
