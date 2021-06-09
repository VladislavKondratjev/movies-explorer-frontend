import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard.js";

export default function SavedMovies(props) {
  const { onMovieDelete, currentSaveMovies, nothingSaved, isOwn } = props;

  return (
    <section className="movies">
      {!nothingSaved && <p className="movies__loading">Ничего не сохранено.</p>}
      <section className="movies-card-list">
        <section className="movies-card-list-elements">
          {currentSaveMovies.map((movie) => (
            <MoviesCard
              movieData={movie}
              key={movie._id}
              title={movie.nameRU}
              duration={movie.duration}
              image={movie.image}
              trailerLink={movie.trailer}
              isOwn={isOwn}
              onMovieDelete={onMovieDelete} />)
          )}
        </section>
      </section>
    </section>
  );
}
