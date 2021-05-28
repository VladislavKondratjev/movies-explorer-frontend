import React from "react";

import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard.js";

export default function MoviesCardList(props) {

  return (
    <section className="movies-card-list">
      <section className="movies-card-list-elements">
        <MoviesCard isLiked={props.isLiked} onCardLike={props.onCardLike} isOwn={props.isOwn} onCardDelete={props.onCardDelete}/>
        <MoviesCard isLiked={props.isLiked} onCardLike={props.onCardLike} isOwn={props.isOwn} onCardDelete={props.onCardDelete}/>
        <MoviesCard isLiked={props.isLiked} onCardLike={props.onCardLike} isOwn={props.isOwn} onCardDelete={props.onCardDelete}/>
        <MoviesCard isLiked={props.isLiked} onCardLike={props.onCardLike} isOwn={props.isOwn} onCardDelete={props.onCardDelete}/>
        <MoviesCard isLiked={props.isLiked} onCardLike={props.onCardLike} isOwn={props.isOwn} onCardDelete={props.onCardDelete}/>
        <MoviesCard isLiked={props.isLiked} onCardLike={props.onCardLike} isOwn={props.isOwn} onCardDelete={props.onCardDelete}/>
        <MoviesCard isLiked={props.isLiked} onCardLike={props.onCardLike} isOwn={props.isOwn} onCardDelete={props.onCardDelete}/>
        <MoviesCard isLiked={props.isLiked} onCardLike={props.onCardLike} isOwn={props.isOwn} onCardDelete={props.onCardDelete}/>
        <MoviesCard isLiked={props.isLiked} onCardLike={props.onCardLike} isOwn={props.isOwn} onCardDelete={props.onCardDelete}/>
        <MoviesCard isLiked={props.isLiked} onCardLike={props.onCardLike} isOwn={props.isOwn} onCardDelete={props.onCardDelete}/>
        <MoviesCard isLiked={props.isLiked} onCardLike={props.onCardLike} isOwn={props.isOwn} onCardDelete={props.onCardDelete}/>
      </section>
      <button className="movies-card-list__more-button button">Ещё</button>
    </section>
  );
}
