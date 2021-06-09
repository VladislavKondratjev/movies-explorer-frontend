import React from "react";
import "./MoviesCard.css";
import movie_icon from "../../images/866dc9b6d6daa856c2b2375feea1cc3c.png";

export default function MoviesCard(props) {
  const cardLikeButtonClassName = `${
    props.isLiked ? "movies-card__like_active" : "movies-card__like_disabled"
  }`;
  // const cardDeleteButtonClassName = (
  //   `${props.isOwn ? 'movies-card__delete' : `${cardLikeButtonClassName}`}`
  // );
  function handleCardLike() {
    if (props.saved) {
      props.delMovie(props.movieData.movieId);
    } else {
      props.saveMovie(props.movieData);
    }
  }

  function handleDelClick() {
    props.delMovie(props.movieData._id);
  }

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + "ч " + minutes + "м";
  }
  const duration = getTimeFromMins(props.duration);
  return (
    <section className="movies-card">
      <a href={props.trailerLink} target="__blank">
        <img
          className="movies-card__preview"
          src={props.image === null ? movie_icon : 'https://api.nomoreparties.co'+props.image.url}
          alt={props.nameRU}
        />
      </a>
      <div className="movies-card__info">
        <h3 className="movies-card__title">{props.title}</h3>
        {props.isOwn ? (
          <button
            className="movies-card__delete button"
            onClick={handleDelClick}
          ></button>
        ) : (
          <button
            className={`${cardLikeButtonClassName} button`}
            onClick={handleCardLike}
          ></button>
        )}
      </div>
      <span className="movies-card__duration">{duration}</span>
    </section>
  );
}
// props.isOwn ? ${cardDeleteButtonClassName} :
// props.isOwn ? handleCardDelete :
