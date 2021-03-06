import React from "react";
import "./MoviesCard.css";
import movie_icon from "../../images/866dc9b6d6daa856c2b2375feea1cc3c.png";

export default function MoviesCard(props) {
  function handleMovieLike() {
    if (cardLikeButtonClassName === 'movies-card__like_active') {
      props.onDeleteMovie(props.movieData.id);
    } else {
      props.onSaveMovie(props.movieData);
    }
  }
  const cardLikeButtonClassName = `${props.isSaved ? "movies-card__like_active" : "movies-card__like_disabled"}`;

  function handleMovieDelete() {
    props.onDeleteMovie(props.movieData._id);
  }

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + "ч " + minutes + "м";
  }
  const duration = getTimeFromMins(props.duration);

  const url = props.image?.url ? `${'https://api.nomoreparties.co'}${props.image?.url}` : props.image || movie_icon;

  return (
    <section className="movies-card">
      <a href={props.trailerLink} target="__blank">
        <img
          className="movies-card__preview"
          src={url}
          alt={props.nameRU}
        />
      </a>
      <div className="movies-card__info">
        <h3 className="movies-card__title">{props.title}</h3>
        {props.isOwn ?
          <button
            className="movies-card__delete button"
            onClick={handleMovieDelete}
          />
          :
          <button
            className={`${cardLikeButtonClassName} button`}
            onClick={handleMovieLike}
          />
        }
      </div>
      <span className="movies-card__duration">{duration}</span>
    </section>
  );
}
