import React, { useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import Preloader from "../Preloader/Preloader.js";

export default function MoviesCardList(props) {
  const { isMoviesLoading, loadingError, moviesData, saveMovie, onMovieDelete, count, empty, savedMovies } = props;

  const [moviesRender, setMoviesRender] = React.useState([])

  useEffect(() => {
    const firstArray = moviesData.slice(0, count.repeat);
    setMoviesRender(firstArray);
  }, [count.repeat, moviesData]);


  function handleAddMore() {
    let currentCount = moviesRender.length + count.add;
    let mArr = moviesData.slice(0, currentCount);
    setMoviesRender(mArr);
  }

  function isSaved(id) {
    return savedMovies.some((item) => {
      return item.id === id;
    });
  }

  return (
    <section className="movies-card-list">
      {isMoviesLoading && <Preloader />}
      {loadingError && <p className="movies__loading">Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен.
        Подождите немного и попробуйте ещё раз.</p>}
      {empty && <p className="movies__loading">Ничего не найдено.</p>}
      <section className="movies-card-list-elements">
        {moviesRender.map((movie) => {
          return (
            <MoviesCard
              key={movie.id} movieData={movie} title={movie.nameRU} duration={movie.duration} image={movie.image} trailerLink={movie.trailer}
              saveMovie={saveMovie} onMovieDelete={onMovieDelete} saved={isSaved(movie.id)} isOwn={props.isOwn}
            />
          );
        })}
      </section>
      {(moviesData.length > moviesRender.length) &&
        <button
          type="button"
          className="movies-card-list__more-button button"
          onClick={handleAddMore}
        >
          Ещё
      </button>}
    </section>
  );
}
