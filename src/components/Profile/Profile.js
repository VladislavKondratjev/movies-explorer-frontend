import React, { useState } from "react";
import "./Profile.css";
import "../App/App.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { useFormWithValidation } from "../../hooks/useForm";

export default function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, setValues, isValid } = useFormWithValidation();
  const [status, setStatus] = useState(false);
  const [disabled, setDisabled] = React.useState(true);

  React.useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.currentUser.name,
        email: currentUser.currentUser.email,
      });
    }
  }, [currentUser, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(values);
  }

  React.useEffect(() => {
    setStatus(true);
    setTimeout(hideStatus, 2000);
  }, [props.message]);

  function hideStatus() {
    setStatus(false);
  }

  function handleLogout() {
    props.onLogout();
  }

  React.useEffect(() => {
    const disabled = !isValid
    setDisabled(disabled);
  }, [isValid]);

  const submitButtonClassName = `${disabled ? "profile__save-edit_disabled" : "profile__save-edit button"}`


  return (
    <section className="profile">
      <h1 className="profile__title">
        Привет, {currentUser.currentUser.name}!
      </h1>
      <form className="profile__form" method="PATCH" onSubmit={handleSubmit}>
        <div className="profile__input-block">
          <h3 className="profile__input-description">Имя</h3>
          <input
            className="profile__input"
            placeholder="Имя"
            id="name"
            name="name"
            autoComplete="off"
            type="text"
            minLength="2"
            maxLength="40"
            required
            onChange={handleChange}
            value={values.name || ""}
            disabled={props.disabled}
          />
        </div>
        <span className="error">{errors.name || ""}</span>
        <div className="profile__input-block">
          <h3 className="profile__input-description">E-mail</h3>
          <input
            className="profile__input"
            placeholder="E-mail"
            id="email"
            name="email"
            autoComplete="off"
            type="email"
            minLength="9"
            maxLength="40"
            required
            onChange={handleChange}
            value={values.email || ""}
            disabled={props.disabled}
          />
        </div>
        <span className="error">{errors.email || ""}</span>
        {props.isEdit ? (
          <>
            {status && <span className="error">{props.message}</span>}
            <button
              type="submit"
              name="submit"
              className={submitButtonClassName}
              onSubmit={handleSubmit}
            >
              Сохранить
          </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="profile__edit-button button"
              onClick={props.handleEditProfile}
            >
              Редактировать
          </button>
            <button
              type="button"
              className="profile__logout-button button"
              onClick={handleLogout}
            >
              Выйти из аккаунта
          </button>
          </>
        )}
      </form>
    </section>
  );
}
