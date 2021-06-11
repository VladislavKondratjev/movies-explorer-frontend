import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard.js";

export default function SavedMovies(props) {
  const { onDeleteMovie, currentSavedMovies, nothingSaved, isOwn, empty } = props;

  return (
    <section className="movies">
      {!nothingSaved && <p className="movies__loading">Ничего не сохранено.</p>}
      {empty && <p className="movies__loading">Ничего не найдено.</p>}
      <section className="movies-card-list">
        <section className="movies-card-list-elements">
          {currentSavedMovies.map((movie) => (
            <MoviesCard
              movieData={movie}
              key={movie._id}
              title={movie.nameRU}
              duration={movie.duration}
              image={movie.image}
              trailerLink={movie.trailer}
              isOwn={isOwn}
              onDeleteMovie={onDeleteMovie} />)
          )}
        </section>
      </section>
    </section>
  );
}
