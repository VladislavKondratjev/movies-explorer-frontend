import React from 'react';
import "./Register.css";
import "../App/App.css"
import logo from "../../images/header__logo.svg";
import { NavLink, Link, useHistory } from "react-router-dom";
import { useFormWithValidation } from '../../hooks/useForm';

export default function Register({ onRegister }) {
  const { values, handleChange, errors, setValues, isValid } = useFormWithValidation();
  const history = useHistory();
  const [disabled, setDisabled] = React.useState(true);

  React.useEffect(() => {
    setValues(values);
  }, [setValues, values])

  React.useEffect(() => {
    const disabled = !isValid
    setDisabled(disabled);
  }, [isValid]);

  const submitButtonClassName = `${disabled ? "sign__submit-button_disabled" : "sign__submit-button button"}`

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.password || !values.email || !values.name) {
      return;
    }
    onRegister(values)
      .then(() => history.push('/movies'))
      .catch(err => console.log(err))
  }

  return (
    <section className="sign">
      <NavLink exact to="/" >
        <img className="header__logo" src={logo} alt="Movies Explorer logo" />
      </NavLink>
      <h1 className="sign__title">Добро пожаловать!</h1>
      <form className="sign__form" method="PATCH" action="#" onSubmit={handleSubmit}>
        <label className="sign__input-heading">Имя</label>
        <input
          id="name"
          name="name"
          autoComplete="off"
          type="name"
          className="sign__input"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
          onChange={handleChange}
          value={values.name || ""}
        />
        <span className="error">{errors.name || ""}</span>
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
          required
          onChange={handleChange}
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
          minLength="8"
          maxLength="15"
          required
          onChange={handleChange}
          value={values.password || ""}
        />
        <span className="error">{errors.password || ""}</span>
        <button type="submit" className={submitButtonClassName}>
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
