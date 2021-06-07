import React from "react";
import "./Profile.css";
import "../App/App.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { useFormWithValidation } from "../../hooks/useForm";
import ErrorSpan from "../ErrorSpan/ErrorSpan.js";

export default function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isEdit, setIsEdit] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const { values, handleChange, errors, setValues } = useFormWithValidation();

  function handleEditProfile() {
    setIsEdit(true);
    setDisabled(false);
  }

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
    setIsEdit(false);
    setDisabled(true);
  }

  function handleLogout() {
    props.onLogout();
  }

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
            disabled={disabled}
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
            disabled={disabled}
          />
        </div>
        <span className="error">{errors.email || ""}</span>
      </form>

      {isEdit ? (
        <>
          <ErrorSpan message={props.message} />
          <button
            type="submit"
            className={`profile__save-edit button`}
            onClick={handleSubmit}
            // disabled={!isValid}
          >
            Сохранить
          </button>
        </>
      ) : (
        <>
          <button
            type="button"
            className="profile__edit-button button"
            onClick={handleEditProfile}
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
    </section>
  );
}
