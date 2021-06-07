import React from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import Preloader from "../Preloader/Preloader.js";
import { MainApi } from "../../utils/MainApi";

export default function MoviesCardList(props) {
  //   const windowWidth = `{$(window).width()}`;
  // console.log(windowWidth)
  const [savedMovies, setSavedMovies] = React.useState(true);

  function handleSaveMovie(data) {
    MainApi.saveMovie(data)
      .then((newCard) => {
        setSavedMovies([newCard.data, ...savedMovies])
      })
      .catch((err) => console.log(err));
  }

  return (
    <section className="movies-card-list">
      {props.isMoviesLoading && <Preloader />}
      {props.isMoviesError && <p className="movies__loading">Ничего не найдено.</p>}
      <section className="movies-card-list-elements">
        {props.movies.map((movie) => {
            return (
              <MoviesCard
                key={movie.id}
                movie={movie}
                isLiked={props.isLiked}
                onCardLike={handleSaveMovie}
                isOwn={props.isOwn}
                onCardDelete={props.onCardDelete}
              />
            );
          })}
      </section>
      {props.filteredMovies.length > 0  &&
      <button
        type="button"
        className="movies-card-list__more-button button"
        onClick={props.handleAddMoreMovies}
      >
        Ещё
      </button>
      }
    </section>
  );
}
