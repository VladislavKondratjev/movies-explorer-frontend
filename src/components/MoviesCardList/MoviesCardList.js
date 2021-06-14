import React, { useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import Preloader from "../Preloader/Preloader.js";

export default function MoviesCardList(props) {
  const { isMoviesLoading, loadingError, onSaveMovie, onDeleteMovie, count, empty, savedMovies, searchResult } = props;

  const [moviesRendered, setMoviesRendered] = React.useState([])

  const cashedArray = localStorage.getItem('filtered movies');

  useEffect(() => {
    if (cashedArray) {
      const displayedCashedArray = JSON.parse(cashedArray).slice(0, count.repeat);
      return setMoviesRendered(displayedCashedArray)
    }
    const displayedMovies = searchResult.slice(0, count.repeat);
    setMoviesRendered(displayedMovies);
  }, [cashedArray, count.repeat, searchResult]);

  function handleAddMore() {
    let currentCount = moviesRendered.length + count.add;
    if (cashedArray) {
      let displayedCashedArray = JSON.parse(cashedArray).slice(0, currentCount);
      return setMoviesRendered(displayedCashedArray)
    }
    let displayedMovies = searchResult.slice(0, currentCount);
    setMoviesRendered(displayedMovies);
  }

  function isSaved(id) {
    return props.savedMovies.some((item) => {
      return item.movieId === id;
    });
  }

  return (
    <section className="movies-card-list">
      {isMoviesLoading && <Preloader />}
      {loadingError && <p className="movies__loading">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
        Подождите немного и попробуйте ещё раз.</p>}
      {empty && <p className="movies__loading">Ничего не найдено.</p>}
      <section className="movies-card-list-elements">
        {moviesRendered.map((movie) => {
          return (
            <MoviesCard
              key={movie.id}
              movieData={movie}
              title={movie.nameRU}
              duration={movie.duration}
              image={movie.image}
              trailerLink={movie.trailerLink}
              onSaveMovie={onSaveMovie}
              onDeleteMovie={onDeleteMovie}
              isOwn={props.isOwn}
              isSaved={isSaved(movie.id)}
              savedMovies={savedMovies}
              searchResult={searchResult}
            />
          );
        })}
      </section>
      {(searchResult.length > moviesRendered.length) &&
        <button
          type="button"
          className="movies-card-list__more-button button"
          onClick={handleAddMore}
        >Ещё</button>
      }
    </section>
  );
}
