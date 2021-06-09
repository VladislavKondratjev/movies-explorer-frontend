import React, { useEffect } from "react";
import "./MoviesCardList.css";
import MoviesCard from "../MoviesCard/MoviesCard.js";
import Preloader from "../Preloader/Preloader.js";

export default function MoviesCardList(props) {
  const { isMoviesLoading, loadingError, moviesData, saveMovie, delMovie, count, empty, savedMovies } = props;

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
        {/* {(location.pathName === "saved-movies") && currentSaveMovies.map((item) => (
          <MoviesCard key={item.movieId} title={item.nameRU} time={item.duration} imgPath={item.image} trailer={item.trailer} del={true} delMovie={delMovie} movieData={item} />
        )
        )} */}
        {moviesRender.map((movie) => {
          return (
            <MoviesCard
              key={movie.id} movieData={movie} title={movie.nameRU} duration={movie.duration} image={movie.image} trailerLink={movie.trailer}
              del={false} saveMovie={saveMovie} delMovie={delMovie} saved={isSaved(movie.movieId)}
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
