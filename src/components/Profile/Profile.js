import React from "react";
import "./Profile.css";

export default function Profile(props) {

  function handleEditProfile() {
    props.onEditClick();
  }

  function handleSaveChanges() {
    props.onSaveChanges();
  }

  function handleLogout() {
    props.onLogout();
  }

  return (
    <section className="profile">
      <h1 className="profile__title">Привет, Виталий!</h1>
      <form className="profile__form">
        <div className="profile__input-block">
          <h3 className="profile__input-description">Имя</h3>
          <input className="profile__input" placeholder="Имя"></input>
        </div>
        <div className="profile__input-block">
          <h3 className="profile__input-description">E-mail</h3>
          <input className="profile__input" placeholder="E-mail"></input>
        </div>

        {props.isEdit ? (
          <>
            <button
              type="button"
              className="profile__save-edit button"
              onClick={handleSaveChanges}
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
            <button type="button" className="profile__logout-button button" onClick={handleLogout}>
              Выйти из аккаунта
            </button>
          </>
        )}
      </form>
    </section>
  );
}
