import React from "react";
import "./MoviesCard.css";
import movie from "../../images/movie.png";

export default function MoviesCard(props) {
  const cardLikeButtonClassName = (
    `${props.isLiked ? 'movies-card__like_active' : 'movies-card__like_disabled'}`
  );
  // const cardDeleteButtonClassName = (
  //   `${props.isOwn ? 'movies-card__delete' : `${cardLikeButtonClassName}`}`
  // );
  function handleCardLike() {
    props.onCardLike()
  }
  function handleCardDelete() {
    props.onCardDelete()
  }
  return (
    <section className="movies-card">
      <img className="movies-card__preview" src={movie} alt="Фильмец" />
      <div className="movies-card__info">
        <h3 className="movies-card__title">33 слова о дизайне</h3>
        {props.isOwn
        ?
        <button className="movies-card__delete button" onClick={handleCardDelete}></button>
        :
        <button className={`${cardLikeButtonClassName} button`} onClick={handleCardLike}></button>
        }
      </div>
      <span className="movies-card__duration">1ч42м</span>
    </section>
  );
}
// props.isOwn ? ${cardDeleteButtonClassName} :
// props.isOwn ? handleCardDelete : 